import { getListQuestionMiniTest, getPracticeTestById, postCollectExam, postToeicScore } from '@api';
import { useLoading } from '@hooks';
import Config from '@root/config';
import { Message, answersMatch, isGroupedQuestion, reactLocalStorage, sortAnswer, toeicListeningScore, toeicReadingScore, toeicTotalScore } from '@utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import ExamResult from './ExamMiniTestResult';
import ExamStart from './ExamMiniTestStart';
import ExamView from './ExamMiniTestView';
import { ExamMainWrap } from './MiniTest.style';

type ExamStatusType = 'initial' | 'starting' | 'reviewing';

const isCorrectAnswer = (question) =>
  answersMatch(question?.userAnswer, question?.answer?.texts);

const mapQuestions = (questions: any[] = []) => {
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

  const fetchExamDetail = async (id: string) => {
    if (!id) {
      return;
    }
    const requestId = ++detailRequest.current;
    start();
    try {
      const resp: any = await getPracticeTestById(id);
      if (requestId !== detailRequest.current) {
        return false;
      }
      const error = resp.data.error;
      const respData = resp.data?.responseData;
      if (error) {
        Message.error(error?.message ?? 'Có lỗi, thử lại');
        setDetailStatus('failed');
        setListQuestion([]);
        return false;
      } else {
        setExamId(respData?.id || '');
        setSelectedExam(respData);
        setListQuestion(mapQuestions(respData?.questions || []));
        setDetailStatus('ready');
        return true;
      }
    } catch (err) {
      console.log('onSubmit-error :>> ', err.toString());
      if (requestId === detailRequest.current) {
        setDetailStatus('failed');
        Message.error('Không tải được đề');
      }
      return false;
    } finally {
      if (requestId === detailRequest.current) {
        stop();
      }
    }
  };

  useEffect(() => {
    fetchExamList();
  }, []);

  const onCollectionExam = async () => {
    if (!examId) {
      return;
    }
    try {
      let progress = answerInfos.toeicScore;
      let saved = null;
      if (answerInfos.officialScale) {
        try {
          const scoreResp: any = await postToeicScore({
            listeningCorrect: answerInfos.listeningCorrect,
            readingCorrect: answerInfos.readingCorrect,
          });
          const scaled = scoreResp.data?.responseData;
          if (!scoreResp.data?.error && scaled && typeof scaled.totalScore === 'number') {
            progress = scaled.totalScore;
            saved = {
              toeicScore: scaled.totalScore,
              ...(typeof scaled.listeningScore === 'number' ? { listeningScore: scaled.listeningScore } : {}),
              ...(typeof scaled.readingScore === 'number' ? { readingScore: scaled.readingScore } : {}),
            };
          }
        } catch (scoreError) {
          console.log('score-error :>> ', scoreError?.toString?.() || scoreError);
        }
      }
      const resp: any = await postCollectExam({
        progress,
        status: 1,
        examId,
      });
      const error = resp.data.error;
      if (error) {
        Message.error(error?.message ?? 'Có lỗi, thử lại');
      }
      return saved;
    } catch (err) {
      console.log('onSubmit-error :>> ', err.toString());
      Message.error('Không lưu được kết quả');
      return null;
    }
  };

  const onSetExamStatus = async (status: ExamStatusType) => {
    if (status === 'reviewing') {
      if (submittingRef.current) {
        return;
      }
      submittingRef.current = true;
      setIsSubmitting(true);
      const saved = await onCollectionExam();
      setScaledResult(saved);
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
    reactLocalStorage.setObject(Config.EXAM_KEY, questions);
  };

  const onClickTryAgain = async () => {
    const loaded = await fetchExamDetail(examId);
    if (loaded) {
      submittingRef.current = false;
      setIsSubmitting(false);
      setScaledResult(null);
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
          onExit={async () => {
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
