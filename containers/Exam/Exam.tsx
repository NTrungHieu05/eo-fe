import { getListCard, postCollectExam } from '@api';
import { useLoading } from '@hooks';
import { Message, answersMatch, isQuestionGroupCard, sortAnswer } from '@utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import ExamResult from './ExamResult';
import ExamStart from './ExamStart';
import ExamView from './ExamView';

type ExamStatusType = 'initial' | 'starting' | 'reviewing';
const firstOpenCardIndex = (cards) => {
  const index = (cards || []).findIndex((question) => {
    if (question?.isQuestionGroup) {
      return (question.childCards || []).some((child) => !child?.userAnswer?.[0]);
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
        if (!question.childCards?.length) {
          return acc;
        }
        const newCards = question.childCards.map((childCard, index) => {
          return {
            ...question,
            ...childCard,
            childCardIndex: index,
          };
        });
        return [...acc, ...newCards];
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

  const fetchListCard = async () => {
    const requestId = ++loadRequest.current;
    start();
    try {
      const resp: any = await getListCard(examCode);
      if (requestId !== loadRequest.current) {
        return null;
      }
      const error = resp.data.error;
      const respData = resp.data?.responseData;
      if (error) {
        Message.error(error?.message ?? 'Something error!');
        return null;
      } else {
        let questionNo = 0;
        const _listData = respData?.cards?.map((card) => {
          const isQuestionGroup = isQuestionGroupCard(card);
          if (isQuestionGroup) {
            const _childCards = (card?.childCards || []).map((childCard) => {
              questionNo = questionNo + 1;
              return {
                ...childCard,
                answer: {
                  ...childCard?.answer,
                  allAnswer: [
                    ...(childCard?.answer?.choices ?? []),
                    ...(childCard?.answer?.texts ?? []),
                  ].sort(sortAnswer),
                },
                questionNo: questionNo,
              };
            });
            return {
              ...card,
              childCards: _childCards,
              isQuestionGroup: true,
            };
          } else {
            questionNo = questionNo + 1;
            return {
              ...card,
              answer: {
                ...card?.answer,
                allAnswer: [...(card?.answer?.choices ?? []), ...(card?.answer?.texts ?? [])].sort(
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
        Message.error(error?.message ?? 'Something error!');
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
    fetchListCard().then((cards) => {
      if (!active) {
        return;
      }
      if (cards == null) {
        setLoadFailed(true);
        setListQuestion([]);
        return;
      }
      setListQuestion(cards);
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
    const cards = await fetchListCard();
    if (cards != null) {
      submittingRef.current = false;
      setIsSubmitting(false);
      setListQuestion(cards);
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
          startIndex={firstOpenCardIndex(listQuestion)}
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
