import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import QuizPlayZone from './QuizPlayZone';
import { resolveMediaUrl } from '@utils';

export default function QuestionCard({ question, onUpdateQuestion, isStarting = false, readOnly = false, reveal = false }) {
  const onChoice = (choice) => {
    onUpdateQuestion?.((current) => ({
      ...(current || question),
      userAnswer: [choice],
    }));
  };
  const onChoiceQuestionGroup = (choice, index) => {
    onUpdateQuestion?.((current) => {
      const card = current || question;
      return {
        ...card,
        childCards: (card?.childCards || []).map((childCard, childIndex) =>
          childIndex === index ? { ...childCard, userAnswer: [choice] } : childCard
        ),
      };
    });
  };
  return (
    <div className="game-object-view-container">
      <div className="normal-root-container">
        <div
          className="game-object-view game-object-quiz"
          id="game-object-view-614be68d65d71f3a51f671ad"
        >
          {question?.isQuestionGroup ? (
            <>
              <div className="question-group-question-box">
                {question?.question?.sound && (
                  <div className="game-object-question-sound">
                    <ReactAudioPlayer src={resolveMediaUrl(question?.question?.sound)} autoPlay={false} controls />
                  </div>
                )}
                {question?.question?.image?.length > 0 && (
                  <div className="game-object-question-image">
                    <div className="game-image-widget-container" style={{ width: 300 }}>
                      <img
                        src={resolveMediaUrl(question?.question?.image)}
                        alt={question?.question?.image}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                )}
                {question?.question?.text && (
                  <div className="game-object-question-text">
                    <div className="game-text-widget-container">
                      <div
                        className="question-content"
                        dangerouslySetInnerHTML={{ __html: question?.question?.text }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="question-group-quiz-box">
                {question.childCards?.map((childCard, index) => (
                  <QuizPlayZone
                    key={childCard?.questionNo || index}
                    parentQuestion={question}
                    childCard={childCard}
                    index={childCard?.questionNo}
                    answer={childCard?.answer}
                    userAnswer={childCard?.userAnswer}
                    onChoice={(choice) => onChoiceQuestionGroup(choice, index)}
                    isStarting={isStarting}
                    readOnly={readOnly}
                    reveal={reveal}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="question-index-container">
                <div className="question-index-wrap">
                  <div className="game-object-question quiz-game-object-question">
                    {question?.question?.sound && (
                      <div className="game-object-question-sound">
                        <ReactAudioPlayer
                          src={resolveMediaUrl(question?.question?.sound)}
                          autoPlay={false}
                          controls
                        />
                      </div>
                    )}
                    {question?.question?.image?.length > 0 && (
                      <div className="game-object-question-image">
                        <div className="game-image-widget-container" style={{ width: 300 }}>
                          <img
                            src={resolveMediaUrl(question?.question?.image)}
                            alt={question?.question?.image}
                            style={{ width: '100%' }}
                          />
                        </div>
                      </div>
                    )}

                    {question?.question?.text && (
                      <div className="game-object-question-text">
                        <div className="game-text-widget-container">
                          <div
                            className="question-content"
                            dangerouslySetInnerHTML={{ __html: question?.question?.text }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <QuizPlayZone
                index={question?.questionNo}
                answer={question?.answer}
                userAnswer={question?.userAnswer}
                onChoice={onChoice}
                isStarting={isStarting}
                readOnly={readOnly}
                reveal={reveal}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
