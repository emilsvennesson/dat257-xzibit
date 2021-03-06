import './App.css';
import { ThemeProvider } from '@emotion/react';
import { Box } from '@mui/material';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { mainTheme } from './theme';
import { FBAuthProvider } from './hooks/FBAuthProvider';

import '@fontsource/nunito/300.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/500.css';
import '@fontsource/nunito/700.css';
import RoutesConfig from './RoutesConfig';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <FBAuthProvider>
      <ThemeProvider theme={mainTheme}>
        <div className="App">
          <NavigationBar />
          <Box minHeight="100vh">
            <RoutesConfig />
          </Box>
          <Footer />
          <ScrollToTop />
        </div>
      </ThemeProvider>
    </FBAuthProvider>
  );
}

export default App;
