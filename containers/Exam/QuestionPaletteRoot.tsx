import { answersMatch, getQuestionId } from '@utils';
import { useEffect, useState } from 'react';
import React from 'react';

type QuestionPaletteRootProps = {
  listQuestion?: any[];
  children?: React.ReactNode;
  onSelectQuestion?: (questionIndex: number) => void;
  showResult?: boolean;
  answerInfos: {
    total: number;
    newAnswerCount: number;
    correctAnswerCount: number;
    incorrectAnswerCount: number;
  };
};
const QuestionPaletteRoot: React.FC<QuestionPaletteRootProps> = ({
  listQuestion,
  answerInfos,
  onSelectQuestion,
  showResult = true,
}: QuestionPaletteRootProps) => {
  const { total, newAnswerCount, correctAnswerCount, incorrectAnswerCount } = answerInfos;

  const goToQuestion = (id) => {
    if (!id) return;
    const question = document.getElementById(`review-${id}`);
    if (!question) return;
    window.scrollTo({
      top: question.offsetTop,
      behavior: 'smooth',
    });
  };

  const openQuestion = (questionIndex, reviewId) => {
    if (onSelectQuestion) {
      onSelectQuestion(questionIndex);
      return;
    }
    goToQuestion(reviewId);
  };

  return (
    <div className="jss27 question-palette-root">
      <div className="current-topic-label question-palette-game-title">Test 1</div>
      <div className="question-palette-main">
        <div className="question-palette-header">
          <div className="question-palette-title">Câu hỏi</div>
        </div>
        <div className="question-palette-body">
          <div className="questions-list questions-list-custom" id="question-list-scroll">
            <div className="question-list-row" style={{ gridTemplateColumns: 'repeat(8, 1fr)' }}>
              {listQuestion?.map((question, questionIndex) => (
                <React.Fragment key={question?._id || question?.id || questionIndex}>
                  {question?.isQuestionGroup ? (
                    question.childQuestions?.map((childQuestion) => (
                      <button
                        className={`question-item question-palette-item-custom ${
                          childQuestion?.userAnswer?.length > 0
                            ? !showResult
                              ? 'p-item-selected'
                              : answersMatch(childQuestion?.userAnswer, childQuestion?.answer?.texts)
                              ? 'p-item-correct'
                              : 'p-item-incorrect'
                            : ''
                        }`}
                        tabIndex={0}
                        type="button"
                        key={childQuestion?._id || childQuestion?.id || childQuestion?.questionNo}
                        id={`pallete-item-${childQuestion?._id || childQuestion?.questionNo}`}
                        onClick={() => openQuestion(questionIndex, getQuestionId(question))}
                      >
                        {childQuestion?.questionNo}
                      </button>
                    ))
                  ) : (
                    <>
                      <button
                        className={`question-item question-palette-item-custom ${
                          question?.userAnswer?.length > 0
                            ? !showResult
                              ? 'p-item-selected'
                              : answersMatch(question?.userAnswer, question?.answer?.texts)
                              ? 'p-item-correct'
                              : 'p-item-incorrect'
                            : ''
                        }`}
                        tabIndex={0}
                        type="button"
                        key={question?._id || question?.id}
                        id={`pallete-item-${question?._id || question?.id}`}
                        onClick={() => openQuestion(questionIndex, getQuestionId(question))}
                      >
                        {question?.questionNo}
                      </button>
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="question-stat-progress">
            <div className="jss28">
              <div className="questions-stat-item">
                <svg
                  width={10}
                  height={11}
                  viewBox="0 0 10 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect y="0.5" width={10} height={10} rx={3} fill="#4caf50" />
                </svg>
                <span className="questions-stat-item-text">
                  {showResult
                    ? `${correctAnswerCount}/${total} đúng`
                    : `${total - newAnswerCount}/${total} Đã chọn`}
                </span>
              </div>
              <div className="questions-stat-item">
                <svg
                  width={10}
                  height={11}
                  viewBox="0 0 10 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect y="0.5" width={10} height={10} rx={3} fill="#FF5252" />
                </svg>
                <span className="questions-stat-item-text">
                  {showResult
                    ? `${incorrectAnswerCount}/${total} sai`
                    : `${newAnswerCount}/${total} Chưa làm`}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="question-palette-footer question-palette-footer-custom" />
      </div>
    </div>
  );
};

export default QuestionPaletteRoot;
