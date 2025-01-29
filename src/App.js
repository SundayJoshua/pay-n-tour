import './App.css';
import Checkout from './Checkout'; // Import Checkout component
import { Container } from 'react-bootstrap'; // Import Container component if needed
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create a theme with Roboto font
const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
});


function App() {
  return (
    <Container>
      <Checkout /> {/* Render the Checkout component as a JSX element */}
    </Container>
  );
}

export default App;
