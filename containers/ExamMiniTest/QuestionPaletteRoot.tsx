import { ExamSection, PARTS, partGroups, sectionBounds } from './examSections';

type QuestionPaletteRootProps = {
  listQuestion?: any[];
  children?: React.ReactNode;
  onSelectQuestion?: (questionIndex: number) => void;
  activeSection?: ExamSection;
  currentQuestionIndex?: number;
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
  activeSection,
  currentQuestionIndex,
}: QuestionPaletteRootProps) => {
  const { total, newAnswerCount, correctAnswerCount, incorrectAnswerCount } = answerInfos;
  const groups = partGroups(listQuestion || [], activeSection);
  const bound = activeSection ? sectionBounds(listQuestion || [])[activeSection] : null;

  return (
    <div className="jss27 question-palette-root">
      <div className="current-topic-label question-palette-game-title">Thi thử</div>
      <div className="question-palette-main">
        <div className="question-palette-header">
          <div className="question-palette-title">
            {activeSection === 'reading' ? 'Reading' : activeSection === 'listening' ? 'Listening' : 'Câu hỏi'}
            {bound ? ` · câu ${bound.from}–${bound.to}` : ''}
          </div>
        </div>
        <div className="question-palette-body">
          <div className="questions-list questions-list-custom" id="question-list-scroll">
            {groups.map((group) => {
              const info = PARTS[group.part];
              return (
                <div className="exam-section-block" key={group.part}>
                  <div className="exam-part-label">
                    <strong>
                      {info ? `${info.title} · ${info.kind}` : `Part ${group.part}`}
                    </strong>
                    <span>
                      câu {group.from}–{group.to}
                    </span>
                  </div>
                  <div className="question-list-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
                    {group.items.map((item) => (
                      <button
                        key={item.key}
                        className={`question-item question-palette-item-custom ${
                          item.answered ? 'p-item-selected' : ''
                        } ${item.questionIndex === currentQuestionIndex ? 'p-item-current' : ''}`}
                        tabIndex={0}
                        type="button"
                        onClick={() => onSelectQuestion?.(item.questionIndex)}
                      >
                        {item.questionNo}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="question-stat-progress">
            <div className="jss28">
              <div className="questions-stat-item">
                <span className="questions-stat-item-text">
                  {correctAnswerCount + incorrectAnswerCount}/{total} Đã chọn
                </span>
              </div>
              <div className="questions-stat-item">
                <span className="questions-stat-item-text">
                  {newAnswerCount}/{total} Chưa làm
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
