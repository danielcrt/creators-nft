import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      primary: string;
      primaryAccent: string;
      secondary: string;
      secondaryAccent: string;
      text: string;
      success: string;
      danger: string;
      dangerAccent: string;
    };
  }
}