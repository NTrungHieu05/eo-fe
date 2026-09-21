import Icon from '@ant-design/icons/lib/components/Icon';
import { IconCheckCircle, IconChoiceCircle, IconCloseCircle, IconSelectedCircle } from '@ui/Svgs';

type QuizPlayItemProps = {
  choice: {
    text: string;
    isChecked: boolean;
    isAnswer: boolean;
    isHint: boolean;
  };
  onChoice: (choice) => void;
  isSelected?: boolean;
};
export default function QuizPlayStartingItem({
  choice,
  onChoice,
  isSelected = false,
}: QuizPlayItemProps) {
  return (
    <div
      className={`quiz-choice-item show-result ${choice.isChecked ? 'picking' : ''}`}
      onClick={() => !isSelected && onChoice(choice)}
      key={choice.text}
    >
      <div className="quiz-choice-item-icon show-result">
        {!isSelected ? (
          <Icon component={IconChoiceCircle} />
        ) : (
          <>
            {choice.isChecked && <Icon component={IconSelectedCircle} />}
            {!choice.isChecked && <Icon component={IconChoiceCircle} />}
          </>
        )}
      </div>
      <div className="quiz-choice-item-content not-selected">{choice.text}</div>
    </div>
  );
}
