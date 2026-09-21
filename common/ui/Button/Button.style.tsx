import { styled, theme } from '@styles/theme';
import { Button as AntButton } from 'antd';

export const StyledButton = styled((props) => <AntButton {...props} />)`
  height: 2.75rem;
  font-size: 1rem;
  line-height: 1;
  font-weight: 700;
  &.ant-btn-default:hover,
  &.ant-btn-default:focus {
    color: #fff;
    border-color: #2f9a4c;
    background: #2f9a4c;
  }
  @media ${theme.device.maxMd} {
    font-size: 0.875rem;
    padding: 0;
  }

  &.public-btn {
    border-radius: 20px;
  }
  &.btn-previous,
  &.btn-next {
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover,
    &:focus {
      color: #fff;
      border-color: #2f9a4c;
      background: #2f9a4c;
    }
  }

  .welcome-button {
    @media ${theme.device.maxMd} {
      position: absolute !important;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
  .text-red {
    color: ${theme.colors.primary};
  }

  ${(props) => props.shape && props.shape != 'circle' && theme.mixin.borderRadius('3px')};

  ${(props) =>
    props.shadow && theme.mixin.boxShadow('0 0.1875rem 0.375rem rgba(0,0,0,0.16) !important')}

  ${theme.mixin.transition('opacity 0.3s linear')};
  &:hover:not(.not-hover) {
    opacity: 0.6;
  }
  &.ant-btn-lg {
    min-width: 12.5rem;
  }
  &.ant-btn-sm {
    height: 1.8125rem;
  }

  ${(props) =>
    props.color &&
    `
      &.ant-btn-${props.color} {
        background: ${theme.colors?.[props.color]};
        border-color: ${theme.colors?.[props.color]};
        color: white;
        &:hover, &:focus {
          color: white;
          ${props.backgroundhover && `background-color: ${theme.colors[props.backgroundhover]};`}
        }
      }
    &.ant-btn-${props.color}[disabled] {
      &:hover, &:focus {
        background: ${theme.colors?.[props.color]} !important;
        border-color: ${theme.colors?.[props.color]} !important;
      }
    } 
  `}
  ${(props) => props.width && `width: ${props.width};`}
  &.ant-btn-icon-only {
    > span,
    > svg {
      position: absolute;
      top: 50%;
      left: 50%;
      ${theme.mixin.translate('-50%', '-50%')};
    }
  }
  ${(props) =>
    props.isShadow && theme.mixin.boxShadow('0 0.1875rem 0.375rem rgba(0,0,0,0.16) !important')}

  ${(props) => props.height && `height: ${props.height};`}
  &.btn-outline {
    padding: 0.625rem 1.25rem;
    ${theme.mixin.borderRadius('3px')};
    background: transparent;
    border-color: #fff;
  }
  &.btn-cancel {
    color: ${theme.colors.black} !important;
    border-color: ${theme.colors.black} !important;
    background: transparent !important;
    ${theme.mixin.borderRadius('3px')};
  }
  &.welcome-btn {
    border-radius: 20px;
  }
  &.btn-ok-channel {
    margin: 14px 8px 14px 16px;

    &:disabled {
      background: ${theme.colors.grey5} !important;
    }

    color: ${theme.colors.white};
    border: none;
    @media ${theme.device.maxMd} {
      margin: 0 0 0 16px;
    }
  }
  &.btn-cancel-channel,
  &.btn-ok-channel {
    width: 10.5rem;
    height: 3rem;
    @media ${theme.device.maxMd} {
      width: 100px;
    }
  }
  &.btn-submit-channel {
    height: 48px;
    padding: 12px 48px;
  }

  &[disabled],
  &[disabled]:hover &.is-uploading,
  &.is-uploading:hover {
    color: white;
    opacity: 0.5;
    cursor: not-allowed;
    ${theme.mixin.userSelect()};
    pointer-events: none;
  }
  &.ant-btn-secondary[disabled],
  &.ant-btn-secondary.is-uploading {
    background: ${theme.colors.secondary} !important;
    background: rgba(47, 154, 76, 0.5) !important;
    border-color: rgba(47, 154, 76, 0.5) !important;
    color: white;
    cursor: not-allowed;
    ${theme.mixin.userSelect()};
    pointer-events: none;
    &:hover,
    &:focus {
      background: rgba(47, 154, 76, 0.5) !important;
      border-color: rgba(47, 154, 76, 0.5) !important;
    }
  }
  &.btn-load-more {
    background-color: transparent !important;
    border: none;
    color: ${theme.colors.lightBlue} !important;
  }
  &.btn-recommend-channel {
    background-color: transparent;
    color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
    padding: 0;
    width: 15.188rem;
    height: 32px;
    font-size: 1.125rem;
    border-radius: 0.188rem;
    @media ${theme.device.maxSm} {
      width: 3rem;
    }
    &:hover,
    &:active,
    &:focus {
      color: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
    }

    span {
      margin: 0.1rem 0 0 0.5rem;
      @media ${theme.device.maxSm} {
        display: none;
      }
    }
  }
  &.btn-edit-talent-profile {
    width: 168px;
    height: 48px;
    border-radius: 20px;
    margin: 0 12px;
  }
  /* &.btn-cancel.btn-cancel-edit-profile {
    color: ${theme.colors.black} !important;
    border-color: ${theme.colors.black} !important;
    background: transparent;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
  } */
`;
