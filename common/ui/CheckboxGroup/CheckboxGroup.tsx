import * as React from 'react';
import { CheckboxGroupProps } from 'antd/lib/checkbox/Group';
import { StyledCheckboxGroup } from './CheckboxGroup.style';

const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
  return (
    <StyledCheckboxGroup {...props} />
  );
};

export default CheckboxGroup;
