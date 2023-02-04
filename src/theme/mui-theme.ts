import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode:'dark',
    primary: {
      main: '#3A3A3A',
      contrastText: "#fff"
    },
    secondary: {
      main: grey[400],
    },
    text:{
      primary:'#fff'
    }
  },
});

export default theme
