import { AppProvider } from './context/AppProvider';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <AppProvider>
      <HomePage />
    </AppProvider>
  );
}

export default App;
