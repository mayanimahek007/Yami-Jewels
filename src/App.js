import './App.css';
import Route from "./routes/index";
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Route />
    </AuthProvider>
  );
}

export default App;
