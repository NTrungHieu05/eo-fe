import { styled, theme } from '@styles/theme';
import { Input } from 'antd';

export const StyledInput = styled(Input)`
  background: #f5f6f8;
  border: 1px solid #dedede !important;
  border-radius: 4px;
  height: 56px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.4375px;
  color: #272727;
  &:focus,
  &.ant-input-focused,
  &:hover {
    box-shadow: 0 0 3px 1px #dedede;
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
  background: #f5f6f8;
  border: 1px solid #dedede;
  border-radius: 4px;
  height: 56px;
  &.ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper,
  &.ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper:hover {
    background: #f5f6f8;
  }
  .ant-input {
    background: #f5f6f8;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.4375px;
    color: #272727;
  }

  &:focus,
  &.ant-input-focused {
    border-color: ${theme.colors.primary};
    box-shadow: none;
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
