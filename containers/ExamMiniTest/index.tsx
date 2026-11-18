import { getListQuestionMiniTest, getPracticeTestById, postSubmitExam } from '@api';
import { useLoading } from '@hooks';
import { Message, answersMatch, applyAnswerKey, applySavedAnswers, buildSubmitAnswers, isGroupedQuestion, reactLocalStorage, sortAnswer, toeicListeningScore, toeicReadingScore, toeicTotalScore } from '@utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useToeicContext } from '@contexts/toeicContext';
import ExamResult from './ExamMiniTestResult';
import ExamStart from './ExamMiniTestStart';
import ExamView from './ExamMiniTestView';
import { ExamMainWrap } from './MiniTest.style';

type ExamStatusType = 'initial' | 'starting' | 'reviewing';

// Bài thi dở được lưu theo user. Khoá có tiền tố toeic- nên bị xoá khi đăng xuất.
const PROGRESS_KEY = 'toeic-exam-progress';
const DEFAULT_DURATION_MINUTES = 120;
// Thời gian làm bài lấy theo đề (admin đặt khi tạo đề); đề cũ chưa đặt thì 120 phút.
const examDurationMs = (exam) => {
  const minutes = Number(exam?.durationMinutes);
  return (Number.isFinite(minutes) && minutes > 0 ? minutes : DEFAULT_DURATION_MINUTES) * 60 * 1000;
};
const readProgress = () => reactLocalStorage.getObject(PROGRESS_KEY) || {};
const clearProgress = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(PROGRESS_KEY);
  }
};

const isCorrectAnswer = (question) =>
  answersMatch(question?.userAnswer, question?.answer?.texts);

export const mapQuestions = (questions: any[] = []) => {
  let questionNo = 0;
  return questions.map((question) => {
    const isQuestionGroup = isGroupedQuestion(question);
    const partNumber = question?.partNumber;
    if (isQuestionGroup) {
      const _childQuestions = (question?.childQuestions || []).map((childQuestion) => {
        questionNo = questionNo + 1;
        return {
          ...childQuestion,
          partNumber,
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
        partNumber,
      };
    }
    questionNo = questionNo + 1;
    return {
      ...question,
      answer: {
        ...question?.answer,
        allAnswer: [...(question?.answer?.choices ?? []), ...(question?.answer?.texts ?? [])].sort(sortAnswer),
      },
      questionNo: questionNo,
      partNumber,
    };
  });
};

const isListeningQuestion = (question) => {
  const part = Number(question?.partNumber);
  if (part >= 1 && part <= 7) {
    return part <= 4;
  }
  return (question.questionNo || 0) <= 100;
};

const ExamMiniTest = () => {
  const [{ isLoading }, { start, stop }] = useLoading();

  const [examStatus, setExamStatus] = useState<ExamStatusType>('initial');
  const [examList, setExamList] = useState<any[]>([]);
  const [selectedExam, setSelectedExam] = useState<any>();
  const [listQuestion, setListQuestion] = useState([]);
  const [examId, setExamId] = useState('');
  const [listFailed, setListFailed] = useState(false);
  const [detailStatus, setDetailStatus] = useState<'idle' | 'ready' | 'failed'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scaledResult, setScaledResult] = useState<any>(null);
  const [deadline, setDeadline] = useState<number>(0);
  const { userInfos } = useToeicContext();
  const restoredRef = useRef(false);
  const detailRequest = useRef(0);
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
    const correctAnswerCount = flatListQuestion.filter(isCorrectAnswer)?.length;
    const incorrectAnswerCount = flatListQuestion?.length - newAnswerCount - correctAnswerCount;
    const listeningQuestions = flatListQuestion.filter(isListeningQuestion);
    const readingQuestions = flatListQuestion.filter((question) => !isListeningQuestion(question));
    const listeningCorrect = listeningQuestions.filter(isCorrectAnswer).length;
    const readingCorrect = readingQuestions.filter(isCorrectAnswer).length;
    const officialScale = listeningQuestions.length === 100 && readingQuestions.length === 100;
    const listeningScore = officialScale ? toeicListeningScore(listeningCorrect) : listeningCorrect;
    const readingScore = officialScale ? toeicReadingScore(readingCorrect) : readingCorrect;
    const toeicScore = officialScale
      ? toeicTotalScore(listeningCorrect, readingCorrect)
      : correctAnswerCount;
    return {
      total: newAnswerCount + correctAnswerCount + incorrectAnswerCount,
      newAnswerCount,
      correctAnswerCount,
      incorrectAnswerCount,
      listeningCorrect,
      readingCorrect,
      listeningTotal: listeningQuestions.length,
      readingTotal: readingQuestions.length,
      officialScale,
      listeningScore,
      readingScore,
      toeicScore,
    };
  }, [listQuestion]);

  const fetchExamList = async () => {
    start();
    try {
      const resp: any = await getListQuestionMiniTest();
      const error = resp.data.error;
      const respData = resp.data?.responseData;
      if (error) {
        Message.error(error?.message ?? 'Có lỗi, thử lại');
        setListFailed(true);
      } else {
        setListFailed(false);
        setExamList(respData?.exams || []);
      }
    } catch (err) {
      console.log('onSubmit-error :>> ', err.toString());
      setListFailed(true);
      Message.error('Không tải được danh sách đề');
    } finally {
      stop();
    }
  };

  const fetchExamDetail = async (id: string, savedAnswers?: any[]) => {
    if (!id) {
      return null;
    }
    const requestId = ++detailRequest.current;
    start();
    try {
      const resp: any = await getPracticeTestById(id);
      if (requestId !== detailRequest.current) {
        return null;
      }
      const error = resp.data.error;
      const respData = resp.data?.responseData;
      if (error) {
        Message.error(error?.message ?? 'Có lỗi, thử lại');
        setDetailStatus('failed');
        setListQuestion([]);
        return null;
      } else {
        const mapped = mapQuestions(respData?.questions || []);
        const questions = savedAnswers ? applySavedAnswers(mapped, savedAnswers) : mapped;
        setExamId(respData?.id || '');
        setSelectedExam(respData);
        setListQuestion(questions);
        setDetailStatus('ready');
        return questions;
      }
    } catch (err) {
      console.log('onSubmit-error :>> ', err.toString());
      if (requestId === detailRequest.current) {
        setDetailStatus('failed');
        Message.error('Không tải được đề');
      }
      return null;
    } finally {
      if (requestId === detailRequest.current) {
        stop();
      }
    }
  };

  useEffect(() => {
    fetchExamList();
  }, []);

  // Trả về undefined khi nộp lỗi, null hoặc điểm quy đổi khi nộp được.
  const onSubmitExam = async (questions = listQuestion, id = examId) => {
    if (!id) {
      return undefined;
    }
    try {
      const resp: any = await postSubmitExam({ examId: id, answers: buildSubmitAnswers(questions) });
      const error = resp.data.error;
      if (error) {
        Message.error(error?.message ?? 'Có lỗi, thử lại');
        return undefined;
      }
      const result = resp.data?.responseData;
      clearProgress();
      setListQuestion((current) => applyAnswerKey(current, result?.results));
      if (result?.officialScale && typeof result.totalScore === 'number') {
        return {
          toeicScore: result.totalScore,
          listeningScore: result.listeningScore,
          readingScore: result.readingScore,
        };
      }
      return null;
    } catch (err) {
      console.log('onSubmit-error :>> ', err.toString());
      Message.error('Không nộp được bài, thử lại');
      return undefined;
    }
  };

  const onSetExamStatus = async (status: ExamStatusType, questions?: any[], id?: string) => {
    if (status === 'reviewing') {
      if (submittingRef.current) {
        return;
      }
      submittingRef.current = true;
      setIsSubmitting(true);
      const saved = await onSubmitExam(questions ?? listQuestion, id ?? examId);
      if (saved === undefined) {
        submittingRef.current = false;
        setIsSubmitting(false);
        return;
      }
      setScaledResult(saved);
    } else {
      submittingRef.current = false;
      setIsSubmitting(false);
      if (status === 'starting') {
        setDeadline(Date.now() + examDurationMs(selectedExam));
      }
    }
    setExamStatus(status);
  };

  // Lưu bài đang làm sau mỗi lần chọn đáp án để tải lại trang không mất bài.
  useEffect(() => {
    if (examStatus !== 'starting' || !examId || !deadline || isSubmitting) {
      return;
    }
    reactLocalStorage.setObject(PROGRESS_KEY, {
      userId: userInfos?.userId,
      examId,
      deadline,
      answers: buildSubmitAnswers(listQuestion),
    });
  }, [examStatus, examId, deadline, listQuestion, isSubmitting]);

  // Cảnh báo trước khi đóng tab hoặc tải lại khi đang làm bài.
  useEffect(() => {
    if (examStatus !== 'starting') {
      return;
    }
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [examStatus]);

  // Mở lại trang (tải lại / đóng rồi mở) khi bài thi chưa nộp: nộp luôn các câu đã chọn,
  // không cho làm tiếp.
  useEffect(() => {
    if (restoredRef.current || !userInfos?.userId) {
      return;
    }
    restoredRef.current = true;
    const saved = readProgress();
    if (!saved?.examId || saved.userId !== userInfos.userId) {
      return;
    }
    fetchExamDetail(saved.examId, saved.answers).then((questions) => {
      if (!questions) {
        clearProgress();
        return;
      }
      Message.info('Trang đã được tải lại nên bài thi được nộp tự động với các câu bạn đã chọn.');
      onSetExamStatus('reviewing', questions, saved.examId);
    });
  }, [userInfos?.userId]);

  const onUpdateListQuestion = (questions) => {
    if (submittingRef.current) {
      return;
    }
    setListQuestion(questions);
  };

  const onClickTryAgain = async () => {
    const loaded = await fetchExamDetail(examId);
    if (loaded) {
      submittingRef.current = false;
      setIsSubmitting(false);
      setScaledResult(null);
      setDeadline(Date.now() + examDurationMs(selectedExam));
      setExamStatus('starting');
    }
  };

  return (
    <ExamMainWrap className="main-exam">
      {examStatus === 'reviewing' && (
        <ExamResult
          listQuestion={listQuestion}
          onSetExamStatus={onSetExamStatus}
          answerInfos={scaledResult ? { ...answerInfos, ...scaledResult } : answerInfos}
          onClickTryAgain={onClickTryAgain}
          examName={selectedExam?.name}
        />
      )}
      {examStatus === 'initial' && (
        <ExamView
          examList={examList}
          selectedExam={selectedExam}
          listQuestion={listQuestion}
          onSelectExam={(exam) => {
            setSelectedExam(exam);
            setListQuestion([]);
            setDetailStatus('idle');
            setScaledResult(null);
            setExamId(exam?.id || '');
            fetchExamDetail(exam.id);
          }}
          onSetExamStatus={onSetExamStatus}
          answerInfos={answerInfos}
          isLoading={isLoading}
          listFailed={listFailed}
          detailStatus={detailStatus}
        />
      )}
      {examStatus === 'starting' && (
        <ExamStart
          listQuestion={listQuestion}
          onUpdateListQuestion={onUpdateListQuestion}
          onSetExamStatus={onSetExamStatus}
          answerInfos={answerInfos}
          examStatus={examStatus}
          examName={selectedExam?.name}
          readOnly={isSubmitting}
          deadline={deadline}
          onExit={async () => {
            clearProgress();
            submittingRef.current = false;
            setIsSubmitting(false);
            setScaledResult(null);
            if (examId) {
              await fetchExamDetail(examId);
            }
            setExamStatus('initial');
          }}
        />
      )}
    </ExamMainWrap>
  );
};

export default ExamMiniTest;
