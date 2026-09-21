import * as React from "react";
import { NativeButtonProps } from "antd/lib/button/button";
import { StyledButton } from "./Button.style";
export interface IButtonProps extends NativeButtonProps {
  color?: string;
  className?: string;
  width?: string;
  height?: string;
  shadow?: boolean;
  backgroundhover?: string;
}
const Button: React.FC<IButtonProps> = (props) => {
  return (
    <StyledButton {...props} className={`${props.className ? props.className : ""} ${props.color ? "ant-btn-" + props.color : ""}`}>
      {props.children}
    </StyledButton>
  );
};

export default Button;
