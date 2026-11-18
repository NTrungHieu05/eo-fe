import { getMyAttempt } from '@api';
import { ROUTES } from '@constants';
import { mapQuestions } from '@containers/ExamMiniTest';
import ExamResult from '@containers/ExamMiniTest/ExamMiniTestResult';
import { ExamMainWrap } from '@containers/ExamMiniTest/MiniTest.style';
import { useLoading } from '@hooks';
import { applySavedAnswers, formatName, Message } from '@utils';
import { Spin } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HistoryWrapper } from './History.style';

/** Xem lại một lần làm đã lưu: dùng lại màn kết quả của thi thử, chỉ đọc. */
const HistoryReview = () => {
  const router = useRouter();
  const attemptId = router.query.attemptId as string;
  const [{ isLoading }, { start, stop }] = useLoading();
  const [attempt, setAttempt] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!attemptId) {
      return;
    }
    const load = async () => {
      start();
      try {
        const resp: any = await getMyAttempt(attemptId);
        if (resp.data?.error) {
          setFailed(true);
          Message.error(resp.data.error?.message ?? 'Không mở được bài này');
          return;
        }
        const data = resp.data?.responseData;
        setAttempt(data);
        setQuestions(applySavedAnswers(mapQuestions(data?.questions || []), data?.answers || []));
      } catch (err) {
        setFailed(true);
        Message.error('Không mở được bài này');
      } finally {
        stop();
      }
    };
    load();
  }, [attemptId]);

  if (failed || (!isLoading && attempt && questions.length === 0)) {
    return (
      <HistoryWrapper className="container">
        <h1 className="history-title">Xem lại bài làm</h1>
        <div className="history-empty">
          {failed ? 'Không tìm thấy bài làm này.' : 'Đề của bài làm này đã bị xoá nên không còn câu hỏi để xem lại.'}{' '}
          <Link href={ROUTES.HISTORY}>Về lịch sử làm bài</Link>
        </div>
      </HistoryWrapper>
    );
  }

  if (!attempt) {
    return (
      <HistoryWrapper className="container">
        <Spin spinning />
      </HistoryWrapper>
    );
  }

  const answerInfos = {
    total: attempt.total,
    newAnswerCount: attempt.unanswered,
    correctAnswerCount: attempt.correct,
    // Câu bỏ trống tính là sai (kể cả bài nộp trước khi đổi cách tính).
    incorrectAnswerCount: Math.max(0, (attempt.total ?? 0) - (attempt.correct ?? 0)),
    listeningCorrect: attempt.listeningCorrect,
    readingCorrect: attempt.readingCorrect,
    listeningTotal: attempt.listeningTotal,
    readingTotal: attempt.readingTotal,
    officialScale: attempt.officialScale,
    toeicScore: attempt.officialScale ? attempt.totalScore : attempt.correct,
  };
  const submittedAt = attempt.submittedAt ? moment(attempt.submittedAt).format('HH:mm DD/MM/YYYY') : '';
  const onClickTryAgain = () => {
    if (attempt.practiceTest) {
      router.push(ROUTES.MINI_TEST);
    } else if (attempt.topicId) {
      router.push(`/study/${attempt.topicId}/${attempt.examId}`);
    } else {
      router.push(ROUTES.HOME);
    }
  };

  return (
    <ExamMainWrap className="main-exam">
      <ExamResult
        listQuestion={questions}
        onSetExamStatus={() => undefined}
        onClickTryAgain={onClickTryAgain}
        answerInfos={answerInfos}
        examName={`${formatName(attempt.examName)} · ${submittedAt}`}
      />
    </ExamMainWrap>
  );
};

export default HistoryReview;
