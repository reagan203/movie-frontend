import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1F1F1F',  // Dark, formal color for supremacy
    },
    secondary: {
      main: '#00B8D4',  // Bold, futuristic accent color
    },
    background: {
      default: '#121212', // Dark background for the entire app
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Orbitron", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#FFFFFF',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
});

export default theme;
