import Icon from '@ant-design/icons/lib/components/Icon';
import { IconCheckCircle, IconChoiceCircle, IconCloseCircle } from '@ui/Svgs';
import React, { useEffect, useState } from 'react';
import { isLetterHint, sameAnswerText } from '@utils';
import Hint from './Hint';
import QuizPlayItem from './QuizPlayItem';

type QuizPlayZoneProps = {
  parentQuestion?: any;
  childQuestion?: any;
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
  readOnly?: boolean;
  reveal?: boolean;
  hideIndex?: boolean;
};
export default function QuizPlayZone(props: QuizPlayZoneProps) {
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    const listAnswer = props?.answer?.allAnswer?.length > 0 ? props.answer.allAnswer : [];
    let data = listAnswer.map((answer) => {
      return {
        text: answer,
        isChecked: false,
        isAnswer: false,
      };
    });
    data = data.map((choice) => {
      let _choice = choice;
      if (props?.answer?.texts?.some((text) => sameAnswerText(text, choice.text))) {
        _choice = {
          ..._choice,
          isAnswer: true,
        };
      }
      if (props?.userAnswer?.some((text) => sameAnswerText(text, choice.text))) {
        _choice = {
          ..._choice,
          isChecked: true,
        };
      }

      return _choice;
    });
    setChoices(data);
  }, [props.userAnswer, props.answer]);

  const revealed = Boolean(props.reveal);

  const onChoice = (choice) => {
    if (props.readOnly || revealed) {
      return;
    }
    props.onChoice(choice.text);
  };

  return (
    <div className="game-object-quiz-playzone">
      {!props.hideIndex && (
        <div className="question-index-wrap">
          <div className="game-object-view-question-group-index">
            <span>{props.index}.</span>
            {props.parentQuestion?.isQuestionGroup && props.childQuestion?.question?.text && (
              <span dangerouslySetInnerHTML={{ __html: props.childQuestion.question.text }}></span>
            )}
          </div>
        </div>
      )}
      <div className="game-object-quiz-choices">
        {choices.length > 0 &&
          choices.map((choice, index) => (
            <div key={`${choice.text}-${index}`}>
              <QuizPlayItem
                choice={choice}
                onChoice={onChoice}
                isSelected={revealed}
              />
              {revealed &&
                choice?.isAnswer &&
                props?.answer?.hint &&
                !isLetterHint(props.answer.hint) && <Hint hint={props.answer.hint} />}
            </div>
          ))}
      </div>
    </div>
  );
}
