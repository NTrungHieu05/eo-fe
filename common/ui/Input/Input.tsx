import * as React from 'react';
import { StyledInput, StyledInputPassword } from './Input.style';
import { InputProps } from 'antd/lib/input/Input';
import { PasswordProps } from 'antd/lib/input/Password';

const Input: React.FC<InputProps> = (props) => {
  return <StyledInput {...props} />;
};

export const InputPassword: React.FC<PasswordProps> = (props) => {
  return <StyledInputPassword {...props} />;
};

export default Input;
