import Icon from '@ant-design/icons/lib/components/Icon';
import { IconCheckCircle, IconChoiceCircle, IconCloseCircle } from '@ui/Svgs';
import React, { useEffect, useState } from 'react';
import Hint from './Hint';

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
export default function QuizPlayItem({ choice, onChoice, isSelected = false }: QuizPlayItemProps) {
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
            {choice.isAnswer && <Icon component={IconCheckCircle} />}
            {!choice.isAnswer && choice.isChecked && <Icon component={IconCloseCircle} />}
            {!choice.isAnswer && !choice.isChecked && <Icon component={IconChoiceCircle} />}
          </>
        )}
      </div>
      <div className="quiz-choice-item-content not-selected">{choice.text}</div>
    </div>
  );
}
