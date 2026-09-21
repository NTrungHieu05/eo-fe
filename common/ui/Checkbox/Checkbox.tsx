import * as React from 'react';
import { CheckboxProps } from 'antd/lib/checkbox/Checkbox';
import { StyledCheckbox } from './Checkbox.style';

const Checkbox: React.FC<CheckboxProps> = (props) => {
  return (
    <StyledCheckbox {...props} />
  );
};
export default Checkbox;
