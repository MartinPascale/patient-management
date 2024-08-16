import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  background: {
    main: '#f0f0f0',
    accent: '#cfd5dd',
  },
  color: '#333',
  primary: {
    default: '#24a6b6',
    hover: '#1a8f9c',
    dark: '#E7EAED',
  },
  secondary: {
    default: '#b63224',
    hover: '#a22a1f',
  },
};

export const darkTheme: DefaultTheme = {
  background: {
    main: '#0F1215',
    accent: '#333',
  },
  color: 'white',
  primary: {
    default: '#99CCFF',
    hover: '#3399FF',
    dark: '#08233F',
  },
  secondary: {
    default: '#b63224',
    hover: '#a22a1f',
  },
};
