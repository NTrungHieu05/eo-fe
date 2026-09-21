import { styled, theme } from '@styles/theme';
import { Radio } from 'antd';

export const StyledRadioGroup = styled(Radio.Group)`
  .ant-radio-wrapper {
    font-size: 1rem;
  }
  .ant-radio-inner {
    background-color: transparent;
  }
  .ant-radio-checked .ant-radio-inner {
    border-color: ${theme.colors.success};
    &:after {
      background-color: ${theme.colors.success};
    }
  }
  span.ant-radio + * {
    padding-left: 24px;
  }
  .ant-radio-wrapper:hover .ant-radio,
  .ant-radio:hover .ant-radio-inner,
  .ant-radio-input:focus + .ant-radio-inner {
    border-color: ${theme.colors.success};
  }
`;
