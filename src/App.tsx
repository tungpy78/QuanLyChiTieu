import './App.css';
import { AppProvider } from './context/AppContext';
import { Dashboard } from './components/dashboard/Dashboard';

function App() {
  return (
    <AppProvider>
      <header className="app-header">
        <div className="header-content">
          <h1>Quản lý chi tiêu cá nhân</h1>
          <p className="subtitle">Theo dõi và quản lý dòng tiền của bạn một cách khoa học</p>
        </div>
      </header>
      
      <main className="app-main">
        <Dashboard />
      </main>

      <footer className="app-footer">
        <p>Personal Expense Tracker &copy; 2026</p>
      </footer>
    </AppProvider>
  );
}

export default App;
