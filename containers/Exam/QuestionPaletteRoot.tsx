import { answersMatch, getCardId } from '@utils';
import { useEffect, useState } from 'react';
import React from 'react';

type QuestionPaletteRootProps = {
  listQuestion?: any[];
  children?: React.ReactNode;
  onSelectCard?: (cardIndex: number) => void;
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
  onSelectCard,
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

  const openQuestion = (cardIndex, reviewId) => {
    if (onSelectCard) {
      onSelectCard(cardIndex);
      return;
    }
    goToQuestion(reviewId);
  };

  return (
    <div className="jss27 question-palette-root">
      <div className="current-topic-label question-palette-game-title">Test 1</div>
      <div className="question-palette-main">
        <div className="question-palette-header">
          <div className="question-palette-title">Question Palette</div>
        </div>
        <div className="question-palette-body">
          <div className="questions-list questions-list-custom" id="question-list-scroll">
            <div className="question-list-row" style={{ gridTemplateColumns: 'repeat(8, 1fr)' }}>
              {listQuestion?.map((question, cardIndex) => (
                <React.Fragment key={question?._id || question?.id || cardIndex}>
                  {question?.isQuestionGroup ? (
                    question.childCards?.map((childCard) => (
                      <button
                        className={`question-item question-palette-item-custom ${
                          childCard?.userAnswer?.length > 0
                            ? answersMatch(childCard?.userAnswer, childCard?.answer?.texts)
                              ? 'p-item-correct'
                              : 'p-item-incorrect'
                            : ''
                        }`}
                        tabIndex={0}
                        type="button"
                        key={childCard?._id || childCard?.id || childCard?.questionNo}
                        id={`pallete-item-${childCard?._id || childCard?.questionNo}`}
                        onClick={() => openQuestion(cardIndex, getCardId(question))}
                      >
                        {childCard?.questionNo}
                      </button>
                    ))
                  ) : (
                    <>
                      <button
                        className={`question-item question-palette-item-custom ${
                          question?.userAnswer?.length > 0
                            ? answersMatch(question?.userAnswer, question?.answer?.texts)
                              ? 'p-item-correct'
                              : 'p-item-incorrect'
                            : ''
                        }`}
                        tabIndex={0}
                        type="button"
                        key={question?._id || question?.id}
                        id={`pallete-item-${question?._id || question?.id}`}
                        onClick={() => openQuestion(cardIndex, getCardId(question))}
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
                  {correctAnswerCount}/{total} Correct
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
                  {incorrectAnswerCount}/{total} Incorrect
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
