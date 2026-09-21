import { getListCardMiniTest } from '@api';
import { useLoading } from '@hooks';
import Config from '@root/config';
import { Message, reactLocalStorage, sortAnswer } from '@utils';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import ExamResult from './ExamMiniTestResult';
import ExamStart from './ExamMiniTestStart';
import ExamView from './ExamMiniTestView';
import Countdown from 'antd/lib/statistic/Countdown';
import { ClockCircleOutlined } from '@ant-design/icons';
import { ExamMainWrap } from './MiniTest.style';

type ExamStatusType = 'initial' | 'starting' | 'reviewing';

const ExamMiniTest = () => {
  const router = useRouter();
  const [{ isLoading }, { start, stop }] = useLoading();

  const [examStatus, setExamStatus] = useState<ExamStatusType>('initial');
  const [listQuestion, setListQuestion] = useState([]);

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
    const correctAnswerCount = flatListQuestion.filter(
      (question) =>
        question?.userAnswer?.[0] && question?.userAnswer?.[0] === question?.answer?.texts?.[0]
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
    start();
    try {
      const resp: any = await getListCardMiniTest();

      const error = resp.data.error;
      const respData = resp.data?.responseData;
      if (error) {
        stop();
        Message.error(error?.message ?? 'Something error!');
      } else {
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

  const onSetExamStatus = (status: ExamStatusType) => {
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
