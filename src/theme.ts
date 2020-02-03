import { createMuiTheme } from '@material-ui/core/styles';

const Theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#FFD900',
    },
    secondary: {
      main: '#3E464F',
    },
    error: {
      main: '#E01F1F',
    },
    background: {
      default: '#2A343D',
      paper: '#545B63',
    },
  },
  overrides: {
    // TODO MuiAlert: {},
  },
});

export default Theme;
