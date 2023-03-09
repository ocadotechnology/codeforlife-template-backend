import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { common, red, blue } from '@mui/material/colors';

let theme = createTheme({
  palette: {
    primary: {
      main: common.black
    },
    secondary: {
      main: blue.A400
    },
    error: {
      main: red.A400
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          fontSize: '0.8rem',
          border: '1px solid black'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
          height: '100%'
        }
      }
    }
  }
});

theme = responsiveFontSizes(theme);

export default theme;
