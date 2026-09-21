import '@emotion/react';

import styled, { CreateStyled } from '@emotion/styled';
import { colors } from './colors';
import { device } from './device';
import { mixin } from './mixin';

declare module '@emotion/react' {
  export interface Theme {
    colors: typeof colors,
    device: typeof device,
    mixin: typeof mixin,
  }
}

export const theme = {
  colors,
  device,
  mixin
};

export default styled as CreateStyled;