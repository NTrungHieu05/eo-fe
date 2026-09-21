import * as React from 'react';
import { RadioProps } from 'antd/lib/radio/interface';
import { StyledRadio } from './Radio.style';

const Radio: React.FC<RadioProps> = (props) => {
  return (
    <StyledRadio {...props} />
  );
};
export default Radio;
