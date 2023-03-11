import { createTheme } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode:'dark',
    primary: {
      main: blue[600],
      contrastText: "#fff"
    },
    secondary: {
      main: blue[400],
    },
    text:{
      primary:'#fff'
    }
  },
});

export default theme
