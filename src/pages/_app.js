const { Provider } = require('react-redux');
import { store } from '../store';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from 'src/assets/theme';
import '../assets/styles.css';

function App({ Component, navigationProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>{getLayout(<Component {...navigationProps} />)}</main>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
