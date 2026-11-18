import { getListQuestion, postSubmitExam } from '@api';
import { useLoading } from '@hooks';
import { Message, answersMatch, applyAnswerKey, buildSubmitAnswers, isGroupedQuestion, reactLocalStorage, sortAnswer } from '@utils';
import Config from '@root/config';
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

// Bài đang làm được lưu tạm vào localStorage. Nếu trang bị tải lại (hoặc đóng rồi mở lại)
// khi bài chưa nộp, lần mở sau sẽ tự nộp bài với các đáp án đã chọn, không cho làm tiếp.
const progressKey = (examCode) => `toeic-practice-progress:${examCode}`;
const currentUserId = () => {
  try {
    return reactLocalStorage.getObject(Config.USER_KEY)?.userId || '';
  } catch (e) {
    return '';
  }
};
const readProgress = (examCode) => {
  try {
    const saved = reactLocalStorage.getObject(progressKey(examCode));
    if (!saved?.listQuestion?.length || saved.userId !== currentUserId()) {
      return null;
    }
    return saved;
  } catch (e) {
    return null;
  }
};
const writeProgress = (examCode, listQuestion) => {
  try {
    reactLocalStorage.setObject(progressKey(examCode), { userId: currentUserId(), listQuestion });
  } catch (e) {
    // Bộ nhớ trình duyệt bị chặn: vẫn cho làm bài, chỉ không tự nộp khi tải lại.
  }
};
const clearProgress = (examCode) => {
  try {
    window.localStorage.removeItem(progressKey(examCode));
  } catch (e) {
    // bỏ qua
  }
};

const Exam = ({ examCode }) => {
  const [{ isLoading }, { start, stop }] = useLoading();

  const [examStatus, setExamStatus] = useState<ExamStatusType>('initial');
  const [listQuestion, setListQuestion] = useState([]);
  const [loadFailed, setLoadFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [durationMinutes, setDurationMinutes] = useState<number | null>(null);
  const [deadline, setDeadline] = useState<number>(0);
  const loadRequest = useRef(0);
  const submittingRef = useRef(false);
  // Giữ promise tự nộp theo đề, để React Strict Mode (chạy effect 2 lần) không nộp trùng.
  const autoSubmitRef = useRef<{ examCode: string; promise: Promise<any> } | null>(null);

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
        const minutes = Number(respData?.durationMinutes);
        setDurationMinutes(Number.isFinite(minutes) && minutes > 0 ? minutes : null);
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

  // Gửi bài lên server; trả về kết quả chấm, hoặc null nếu lỗi.
  const submitAnswers = async (questions) => {
    try {
      const resp: any = await postSubmitExam({
        examId: examCode,
        answers: buildSubmitAnswers(questions),
      });
      const error = resp.data.error;
      if (error) {
        Message.error(error?.message ?? 'Có lỗi, thử lại');
        return null;
      }
      return resp.data?.responseData?.results ?? [];
    } catch (err) {
      console.log('onSubmit-error :>> ', err.toString());
      Message.error('Không nộp được bài, thử lại');
      return null;
    }
  };

  const onSubmitExam = async () => {
    if (!examCode) {
      return false;
    }
    const results = await submitAnswers(listQuestion);
    if (results == null) {
      return false;
    }
    clearProgress(examCode);
    setListQuestion((current) => applyAnswerKey(current, results));
    return true;
  };

  const startAttempt = () => {
    setDeadline(durationMinutes ? Date.now() + durationMinutes * 60 * 1000 : 0);
  };

  // Cảnh báo trước khi tải lại / đóng tab: tiếp tục thì bài sẽ bị nộp tự động.
  useEffect(() => {
    if (examStatus !== 'starting') {
      return undefined;
    }
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [examStatus]);

  // Lưu tạm bài đang làm sau mỗi lần chọn đáp án.
  useEffect(() => {
    if (examStatus !== 'starting' || !examCode || !listQuestion.length) {
      return;
    }
    writeProgress(examCode, listQuestion);
  }, [examStatus, examCode, listQuestion]);

  useEffect(() => {
    let active = true;
    submittingRef.current = false;
    setIsSubmitting(false);
    setExamStatus('initial');
    setListQuestion([]);
    setLoadFailed(false);
    setDeadline(0);

    const saved = examCode ? readProgress(examCode) : null;
    if (saved) {
      // Trang bị tải lại giữa lúc làm bài: nộp luôn các đáp án đã chọn.
      if (autoSubmitRef.current?.examCode !== examCode) {
        autoSubmitRef.current = { examCode, promise: submitAnswers(saved.listQuestion) };
      }
      submittingRef.current = true;
      setIsSubmitting(true);
      start();
      autoSubmitRef.current.promise.then((results) => {
        if (!active) {
          return;
        }
        stop();
        autoSubmitRef.current = null;
        submittingRef.current = false;
        setIsSubmitting(false);
        if (results == null) {
          // Chưa nộp được (mất mạng...): giữ bản lưu để lần tải sau nộp lại.
          setLoadFailed(true);
          return;
        }
        clearProgress(examCode);
        setListQuestion(applyAnswerKey(saved.listQuestion, results));
        setExamStatus('reviewing');
        Message.info('Trang đã được tải lại nên bài làm được nộp tự động.');
      });
      return () => {
        active = false;
      };
    }

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
      const submitted = await onSubmitExam();
      if (!submitted) {
        submittingRef.current = false;
        setIsSubmitting(false);
        return;
      }
    } else {
      submittingRef.current = false;
      setIsSubmitting(false);
      if (status === 'starting') {
        startAttempt();
      } else {
        clearProgress(examCode);
      }
    }
    setExamStatus(status);
  };

  // Học viên bấm "Hủy" và xác nhận thoát: bỏ bài đang làm, không tự nộp nữa.
  const onLeaveExam = () => {
    clearProgress(examCode);
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
      startAttempt();
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
          durationMinutes={durationMinutes}
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
          deadline={deadline}
          onLeave={onLeaveExam}
        />
      )}
    </div>
  );
};

export default Exam;
