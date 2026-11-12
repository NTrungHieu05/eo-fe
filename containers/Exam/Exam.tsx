import { getListQuestion, postCollectExam } from '@api';
import { useLoading } from '@hooks';
import { Message, answersMatch, isGroupedQuestion, sortAnswer } from '@utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import ExamResult from './ExamResult';
import ExamStart from './ExamStart';
import ExamView from './ExamView';

type ExamStatusType = 'initial' | 'starting' | 'reviewing';
const firstOpenQuestionIndex = (questions) => {
  const index = (questions || []).findIndex((question) => {
    if (question?.isQuestionGroup) {
      return (question.childQuestions || []).some((child) => !child?.userAnswer?.[0]);
    }
    return !question?.userAnswer?.[0];
  });
  return index < 0 ? 0 : index;
};

const Exam = ({ examCode }) => {
  const [{ isLoading }, { start, stop }] = useLoading();

  const [examStatus, setExamStatus] = useState<ExamStatusType>('initial');
  const [listQuestion, setListQuestion] = useState([]);
  const [loadFailed, setLoadFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const loadRequest = useRef(0);
  const submittingRef = useRef(false);

  const answerInfos = useMemo(() => {
    const flatListQuestion = listQuestion.reduce((acc, question) => {
      if (question?.isQuestionGroup) {
        if (!question.childQuestions?.length) {
          return acc;
        }
        const newQuestions = question.childQuestions.map((childQuestion, index) => {
          return {
            ...question,
            ...childQuestion,
            childQuestionIndex: index,
          };
        });
        return [...acc, ...newQuestions];
      }
      return [...acc, question];
    }, []);

    const newAnswerCount = flatListQuestion.filter((question) => !question?.userAnswer?.[0]).length;
    const correctAnswerCount = flatListQuestion.filter((question) =>
      answersMatch(question?.userAnswer, question?.answer?.texts)
    )?.length;
    const incorrectAnswerCount = flatListQuestion?.length - newAnswerCount - correctAnswerCount;
    return {
      total: newAnswerCount + correctAnswerCount + incorrectAnswerCount,
      newAnswerCount,
      correctAnswerCount,
      incorrectAnswerCount,
    };
  }, [listQuestion]);

  const fetchListQuestion = async () => {
    const requestId = ++loadRequest.current;
    start();
    try {
      const resp: any = await getListQuestion(examCode);
      if (requestId !== loadRequest.current) {
        return null;
      }
      const error = resp.data.error;
      const respData = resp.data?.responseData;
      if (error) {
        Message.error(error?.message ?? 'Có lỗi, thử lại');
        return null;
      } else {
        let questionNo = 0;
        const _listData = respData?.questions?.map((question) => {
          const isQuestionGroup = isGroupedQuestion(question);
          if (isQuestionGroup) {
            const _childQuestions = (question?.childQuestions || []).map((childQuestion) => {
              questionNo = questionNo + 1;
              return {
                ...childQuestion,
                answer: {
                  ...childQuestion?.answer,
                  allAnswer: [
                    ...(childQuestion?.answer?.choices ?? []),
                    ...(childQuestion?.answer?.texts ?? []),
                  ].sort(sortAnswer),
                },
                questionNo: questionNo,
              };
            });
            return {
              ...question,
              childQuestions: _childQuestions,
              isQuestionGroup: true,
            };
          } else {
            questionNo = questionNo + 1;
            return {
              ...question,
              answer: {
                ...question?.answer,
                allAnswer: [...(question?.answer?.choices ?? []), ...(question?.answer?.texts ?? [])].sort(
                  sortAnswer
                ),
              },
              questionNo: questionNo,
            };
          }
        });

        return _listData || [];
      }
    } catch (err) {
      console.log('onSubmit-error :>> ', err.toString());
      if (requestId === loadRequest.current) {
        Message.error('Không tải được đề');
      }
      return null;
    } finally {
      if (requestId === loadRequest.current) {
        stop();
      }
    }
  };

  const onCollectionExam = async () => {
    if (!examCode) {
      return;
    }
    try {
      const { total, correctAnswerCount } = answerInfos;
      const progress = total ? Math.round((correctAnswerCount / total) * 100) : 0;
      const params = {
        progress,
        status: 1,
        examId: examCode,
      };
      const resp: any = await postCollectExam(params);
      const error = resp.data.error;
      if (error) {
        Message.error(error?.message ?? 'Có lỗi, thử lại');
      }
    } catch (err) {
      console.log('onSubmit-error :>> ', err.toString());
      Message.error('Không lưu được kết quả');
    }
  };

  useEffect(() => {
    let active = true;
    submittingRef.current = false;
    setIsSubmitting(false);
    setExamStatus('initial');
    setListQuestion([]);
    setLoadFailed(false);
    fetchListQuestion().then((questions) => {
      if (!active) {
        return;
      }
      if (questions == null) {
        setLoadFailed(true);
        setListQuestion([]);
        return;
      }
      setListQuestion(questions);
    });
    return () => {
      active = false;
    };
  }, [examCode]);

  const onSetExamStatus = async (status: ExamStatusType) => {
    if (status === 'reviewing') {
      if (submittingRef.current) {
        return;
      }
      submittingRef.current = true;
      setIsSubmitting(true);
      await onCollectionExam();
    } else {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
    setExamStatus(status);
  };

  const onUpdateListQuestion = (questions) => {
    if (submittingRef.current) {
      return;
    }
    setListQuestion(questions);
    // reactLocalStorage.setObject(Config.EXAM_KEY, questions);
  };

  const onClickTryAgain = async () => {
    const questions = await fetchListQuestion();
    if (questions != null) {
      submittingRef.current = false;
      setIsSubmitting(false);
      setListQuestion(questions);
      setLoadFailed(false);
      setExamStatus('starting');
    }
  };

  return (
    <div className="main-exam">
      {examStatus === 'reviewing' && (
        <ExamResult
          listQuestion={listQuestion}
          onUpdateListQuestion={onUpdateListQuestion}
          onSetExamStatus={onSetExamStatus}
          answerInfos={answerInfos}
          onClickTryAgain={onClickTryAgain}
        />
      )}
      {examStatus === 'initial' && (
        <ExamView
          listQuestion={listQuestion}
          onSetExamStatus={onSetExamStatus}
          answerInfos={answerInfos}
          isLoading={isLoading}
          loadFailed={loadFailed}
        />
      )}
      {examStatus === 'starting' && (
        <ExamStart
          listQuestion={listQuestion}
          startIndex={firstOpenQuestionIndex(listQuestion)}
          onUpdateListQuestion={onUpdateListQuestion}
          onSetExamStatus={onSetExamStatus}
          answerInfos={answerInfos}
          readOnly={isSubmitting}
        />
      )}
    </div>
  );
};

export default Exam;
