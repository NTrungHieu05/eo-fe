import { styled, theme } from "@styles/theme";
import { Checkbox } from "antd";

export const StyledCheckboxGroup = styled(Checkbox.Group)`
  .ant-checkbox-inner {
    border-color: ${theme.colors.lightGrey5};
  }
  .ant-checkbox-checked {
    &:after {
      border-color: ${theme.colors.secondary};
    }
    .ant-checkbox-inner {
      background-color: ${theme.colors.secondary};
      border-color: ${theme.colors.secondary};
    }
  }
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${theme.colors.secondary};
  }
  .ant-checkbox-inner {
    width: 1.5625rem;
    height: 1.5625rem;
    &:after {
      width: 0.594375rem;
      height: 0.91875rem;
    }
  }
  .ant-checkbox + span {
    padding-left: 1.5rem;
    ${theme.mixin.userSelect()};
  }
`;
