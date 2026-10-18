import { getListCardMiniTest, postCollectExam, postToeicScore } from '@api';
import { useLoading } from '@hooks';
import Config from '@root/config';
import { Message, reactLocalStorage, sortAnswer, toeicListeningScore, toeicReadingScore, toeicTotalScore } from '@utils';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import ExamResult from './ExamMiniTestResult';
import ExamStart from './ExamMiniTestStart';
import ExamView from './ExamMiniTestView';
import { ExamMainWrap } from './MiniTest.style';

type ExamStatusType = 'initial' | 'starting' | 'reviewing';

const isCorrectAnswer = (question) =>
  question?.userAnswer?.[0] && question?.userAnswer?.[0] === question?.answer?.texts?.[0];

const ExamMiniTest = () => {
  const router = useRouter();
  const [{ isLoading }, { start, stop }] = useLoading();

  const [examStatus, setExamStatus] = useState<ExamStatusType>('initial');
  const [listQuestion, setListQuestion] = useState([]);
  const [examId, setExamId] = useState('');

  const answerInfos = useMemo(() => {
    const flatListQuestion = listQuestion.reduce((acc, question) => {
      if (question?.isQuestionGroup) {
        const newCards = question.childCards.map((childCard, index) => {
          return {
            ...question,
            ...childCard,
            childCardIndex: index,
          };
        });
        const newAcc = [...acc, ...newCards];
        return newAcc;
      } else {
        const newAcc = [...acc, question];
        return newAcc;
      }
    }, []);

    const newAnswerCount = flatListQuestion.filter((question) => !question?.userAnswer?.[0]).length;
    const correctAnswerCount = flatListQuestion.filter(isCorrectAnswer)?.length;
    const incorrectAnswerCount = flatListQuestion?.length - newAnswerCount - correctAnswerCount;
    const listeningCorrect = flatListQuestion.filter(
      (question) => (question.questionNo || 0) <= 100 && isCorrectAnswer(question)
    ).length;
    const readingCorrect = flatListQuestion.filter(
      (question) => (question.questionNo || 0) > 100 && isCorrectAnswer(question)
    ).length;
    const listeningScore = toeicListeningScore(listeningCorrect);
    const readingScore = toeicReadingScore(readingCorrect);
    const toeicScore = toeicTotalScore(listeningCorrect, readingCorrect);
    return {
      total: newAnswerCount + correctAnswerCount + incorrectAnswerCount,
      newAnswerCount,
      correctAnswerCount,
      incorrectAnswerCount,
      listeningCorrect,
      readingCorrect,
      listeningScore,
      readingScore,
      toeicScore,
    };
  }, [listQuestion]);

  const fetchListCard = async () => {
    start();
    try {
      const resp: any = await getListCardMiniTest();

      const error = resp.data.error;
      const respData = resp.data?.responseData;
      if (error) {
        stop();
        Message.error(error?.message ?? 'Something error!');
      } else {
        setExamId(respData?.id || '');
        let questionNo = 0;
        const _listData = respData?.cards?.map((card) => {
          const isQuestionGroup = card?.answer?.choices?.join('')?.length === 0;
          if (isQuestionGroup) {
            const _childCards = card?.childCards.map((childCard) => {
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

        setListQuestion(_listData);
      }
    } catch (err) {
      console.log('onSubmit-error :>> ', err.toString());
    } finally {
      stop();
    }
  };

  useEffect(() => {
    fetchListCard();
  }, [router]);

  const onCollectionExam = async () => {
    if (!examId) {
      return;
    }
    try {
      let progress = answerInfos.toeicScore;
      try {
        const scoreResp: any = await postToeicScore({
          listeningCorrect: answerInfos.listeningCorrect,
          readingCorrect: answerInfos.readingCorrect,
        });
        const scaled = scoreResp.data?.responseData;
        if (scaled && typeof scaled.totalScore === 'number') {
          progress = scaled.totalScore;
        }
      } catch (scoreError) {
        console.log('score-error :>> ', scoreError?.toString?.() || scoreError);
      }
      const resp: any = await postCollectExam({
        progress,
        status: 1,
        examId,
      });
      const error = resp.data.error;
      if (error) {
        Message.error(error?.message ?? 'Something error!');
      }
    } catch (err) {
      console.log('onSubmit-error :>> ', err.toString());
    }
  };

  const onSetExamStatus = async (status: ExamStatusType) => {
    if (status === 'reviewing') {
      await onCollectionExam();
    }
    setExamStatus(status);
  };

  const onUpdateListQuestion = (questions) => {
    setListQuestion(questions);
    reactLocalStorage.setObject(Config.EXAM_KEY, questions);
  };

  const onClickTryAgain = async () => {
    await fetchListCard();
    onSetExamStatus('starting');
  };

  return (
    <ExamMainWrap className="main-exam">
      {examStatus === 'reviewing' && (
        <ExamResult
          listQuestion={listQuestion}
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
        />
      )}
      {examStatus === 'starting' && (
        <ExamStart
          listQuestion={listQuestion}
          onUpdateListQuestion={onUpdateListQuestion}
          onSetExamStatus={onSetExamStatus}
          answerInfos={answerInfos}
          examStatus={examStatus}
        />
      )}
    </ExamMainWrap>
  );
};

export default ExamMiniTest;
