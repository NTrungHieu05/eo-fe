import Icon from '@ant-design/icons/lib/components/Icon';
import { IconCheckCircle, IconChoiceCircle, IconCloseCircle } from '@ui/Svgs';
import React, { useEffect, useState } from 'react';
import Hint from './Hint';
import QuizPlayItem from './QuizPlayItem';
import QuizPlayStartingItem from './QuizPlayStartingItem';

type QuizPlayZoneProps = {
  parentQuestion?: any;
  childCard?: any;
  userAnswer: string[];
  answer: {
    allAnswer: any[];
    texts: string[];
    choices: string[];
    image?: string;
    sound?: string;
    hint: string;
  };
  onChoice?: (choice) => void;
  index: number;
  isStarting?: boolean;
};
export default function QuizPlayZone(props: QuizPlayZoneProps) {
  const [choices, setChoices] = useState([]);
  useEffect(() => {
    const listAnswer =
      props?.answer?.allAnswer?.length > 0
        ? props?.answer?.allAnswer
        : ['(A)', '(B)', '(C)', '(D)'];
    let data = listAnswer.map((answer) => {
      return {
        text: answer,
        isChecked: false,
        isAnswer: false,
      };
    });
    data = data.map((choice) => {
      let _choice = choice;
      if (props?.answer?.texts?.includes(choice.text)) {
        _choice = {
          ..._choice,
          isAnswer: true,
        };
      }
      if (props?.userAnswer?.includes(choice.text)) {
        _choice = {
          ..._choice,
          isChecked: true,
        };
      }

      return _choice;
    });
    setChoices(data);
  }, [props.userAnswer, props.answer]);

  const onChoice = (choice) => {
    if (props?.userAnswer?.length > 0) {
      return;
    }
    props.onChoice(choice.text);
  };

  return (
    <div className="game-object-quiz-playzone">
      <div className="question-index-wrap">
        <div className="game-object-view-question-group-index">
          <span>{props.index}.</span>
          {props.parentQuestion?.isQuestionGroup && (
            <span dangerouslySetInnerHTML={{ __html: props.childCard.question.text }}></span>
          )}
        </div>
      </div>
      <div className="game-object-quiz-choices">
        {choices.length > 0 &&
          choices.map((choice) =>
            props.isStarting ? (
              <QuizPlayStartingItem
                choice={choice}
                onChoice={onChoice}
                key={choice.text}
                isSelected={props?.userAnswer?.length > 0}
              />
            ) : (
              <>
                <QuizPlayItem
                  choice={choice}
                  onChoice={onChoice}
                  key={choice.text}
                  isSelected={props?.userAnswer?.length > 0}
                />
                {props?.userAnswer?.length > 0 && choice?.isAnswer && props?.answer?.hint && (
                  <Hint hint={props?.answer?.hint} />
                )}
              </>
            )
          )}
      </div>
    </div>
  );
}
