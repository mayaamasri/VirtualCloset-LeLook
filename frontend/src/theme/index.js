import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#8C6F51',
    },
    secondary: {
      main: '#e8e1d7',
    },
    background: {
      default: '#EDE5DA',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Playfair Display, serif',
    },
    h2: {
      fontFamily: 'Playfair Display, serif',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          fontWeight: 500,
        },
      },
    },
  },
});