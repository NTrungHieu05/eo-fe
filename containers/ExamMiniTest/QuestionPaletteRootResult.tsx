import { answersMatch, getCardId } from '@utils';

type QuestionPaletteRootResultProps = {
  listQuestion?: any[];
  children?: React.ReactNode;
  answerInfos: {
    total: number;
    newAnswerCount: number;
    correctAnswerCount: number;
    incorrectAnswerCount: number;
  };
};

const resultClass = (item) => {
  if (!item?.userAnswer?.length) return '';
  return answersMatch(item.userAnswer, item?.answer?.texts) ? 'p-item-correct' : 'p-item-incorrect';
};

const QuestionPaletteRootResult: React.FC<QuestionPaletteRootResultProps> = ({
  listQuestion,
  answerInfos,
}: QuestionPaletteRootResultProps) => {
  const { total, correctAnswerCount, incorrectAnswerCount } = answerInfos;

  const goToQuestion = (id) => {
    const question = document.getElementById(`review-${id}`);
    if (!question) return;
    window.scrollTo({
      top: question.offsetTop,
      behavior: 'smooth',
    });
  };

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
              {listQuestion?.map((question) =>
                question?.isQuestionGroup
                  ? question.childCards?.map((childCard) => (
                      <button
                        key={getCardId(childCard) || childCard?.questionNo}
                        className={`question-item question-palette-item-custom ${resultClass(
                          childCard
                        )}`}
                        tabIndex={0}
                        type="button"
                        onClick={() => goToQuestion(getCardId(question))}
                      >
                        {childCard?.questionNo}
                      </button>
                    ))
                  : (
                      <button
                        key={getCardId(question)}
                        className={`question-item question-palette-item-custom ${resultClass(
                          question
                        )}`}
                        tabIndex={0}
                        type="button"
                        onClick={() => goToQuestion(getCardId(question))}
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
                  {correctAnswerCount}/{total} Correct
                </span>
              </div>
              <div className="questions-stat-item">
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

export default QuestionPaletteRootResult;
