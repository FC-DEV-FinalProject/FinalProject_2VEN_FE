import '@emotion/react';

import {
  ColorsTypes,
  TypographyTypes,
  LayoutTypes,
  BreakpointsTypes,
  ButtonsTypes,
  InputTypes,
} from './theme';
declare module '@emotion/react' {
  export interface Theme {
    colors: ColorsTypes;
    typography: TypographyTypes;
    layout: LayoutTypes;
    breakpoints: BreakpointsTypes;
    buttons: ButtonsTypes;
    input: InputTypes;
  }
}
