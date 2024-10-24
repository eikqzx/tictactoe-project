import { extendTheme } from '@mui/joy/styles';

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#7e4b8b',
        },
        secondary: {
          main: '#f8ccf9',
        },
        background: {
          default: '#fbf1f9',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#fff',
        },
        secondary: {
          main: '#171717',
        },
      },
    },
  },
});
