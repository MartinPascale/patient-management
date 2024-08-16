import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: {
      main: string;
      accent: string;
    };
    color: string;
    primary: {
      default: string;
      hover: string;
      dark?: string;
    };
    secondary: {
      default: string;
      hover: string;
      dark?: string;
    };
  }
}
