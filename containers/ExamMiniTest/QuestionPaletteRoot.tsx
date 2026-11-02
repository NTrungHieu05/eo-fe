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

const isAnswered = (question) =>
  question?.isQuestionGroup
    ? question.childCards?.some((child) => child?.userAnswer?.length > 0)
    : question?.userAnswer?.length > 0;

const QuestionPaletteRoot: React.FC<QuestionPaletteRootProps> = ({
  listQuestion,
  answerInfos,
  onSelectCard,
}: QuestionPaletteRootProps) => {
  const { total, newAnswerCount, correctAnswerCount, incorrectAnswerCount } = answerInfos;

  return (
    <div className="jss27 question-palette-root">
      <div className="current-topic-label question-palette-game-title">Thi thử</div>
      <div className="question-palette-main">
        <div className="question-palette-header">
          <div className="question-palette-title">Question Palette</div>
        </div>
        <div className="question-palette-body">
          <div className="questions-list questions-list-custom" id="question-list-scroll">
            <div className="question-list-row" style={{ gridTemplateColumns: 'repeat(8, 1fr)' }}>
              {listQuestion?.map((question, cardIndex) =>
                question?.isQuestionGroup
                  ? question.childCards?.map((childCard) => (
                      <button
                        key={childCard?._id || childCard?.id || childCard?.questionNo}
                        className={`question-item question-palette-item-custom ${
                          childCard?.userAnswer?.length > 0 ? 'p-item-selected' : ''
                        }`}
                        tabIndex={0}
                        type="button"
                        onClick={() => onSelectCard?.(cardIndex)}
                      >
                        {childCard?.questionNo}
                      </button>
                    ))
                  : (
                      <button
                        key={question?._id || question?.id}
                        className={`question-item question-palette-item-custom ${
                          isAnswered(question) ? 'p-item-selected' : ''
                        }`}
                        tabIndex={0}
                        type="button"
                        onClick={() => onSelectCard?.(cardIndex)}
                      >
                        {question?.questionNo}
                      </button>
                    )
              )}
            </div>
          </div>
          <div className="question-stat-progress">
            <div className="jss28">
              <div className="questions-stat-item">
                <span className="questions-stat-item-text">
                  {correctAnswerCount + incorrectAnswerCount}/{total} Selected
                </span>
              </div>
              <div className="questions-stat-item">
                <span className="questions-stat-item-text">
                  {newAnswerCount}/{total} New
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
