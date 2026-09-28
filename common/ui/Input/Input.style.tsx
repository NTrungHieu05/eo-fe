import { styled, theme } from '@styles/theme';
import { Input } from 'antd';

export const StyledInput = styled(Input)`
  background: #f5f8f8;
  border: 1px solid #d7e4e4 !important;
  border-radius: 14px;
  height: 52px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #12343d;
  &:focus,
  &.ant-input-focused,
  &:hover {
    border-color: #0e7c7b !important;
    box-shadow: 0 0 0 3px rgba(14, 124, 123, 0.12);
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    background-color: ${theme.colors.lightGrey8} !important;
  }
  &.card-holder-input {
    background: #f4f4f4;
    border-radius: 5px;
    line-height: 22px !important;
    padding: 8px;
    height: unset;
    border: none;
    color: #282828;
    font-size: 14px;
    &:focus,
    &.ant-input-focused {
      border-color: unset;
      box-shadow: unset;
    }
    &:hover {
      border-color: unset;
    }
  }
`;

export const StyledInputPassword = styled(Input.Password)`
  background: #f5f8f8;
  border: 1px solid #d7e4e4;
  border-radius: 14px;
  height: 52px;
  &.ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper,
  &.ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper:hover {
    background: #f5f8f8;
  }
  .ant-input {
    background: #f5f8f8;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #12343d;
  }

  &:focus,
  &.ant-input-focused {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(14, 124, 123, 0.12);
  }
  &:hover {
    border-color: ${theme.colors.primary};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    background-color: ${theme.colors.lightGrey8} !important;
  }
  &.card-holder-input {
    background: #f4f4f4;
    border-radius: 5px;
    line-height: 22px !important;
    padding: 8px;
    height: unset;
    border: none;
    color: #282828;
    font-size: 14px;
    &:focus,
    &.ant-input-focused {
      border-color: unset;
      box-shadow: unset;
    }
    &:hover {
      border-color: unset;
    }
  }
`;
