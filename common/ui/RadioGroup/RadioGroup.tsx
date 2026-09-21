import * as React from 'react';
import { RadioGroupProps } from 'antd/lib/radio/interface';
import { StyledRadioGroup } from './RadioGroup.style';

const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  return (
    <StyledRadioGroup {...props} />
  );
};

export default RadioGroup;
