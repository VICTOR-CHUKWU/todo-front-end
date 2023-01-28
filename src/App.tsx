import './style/todo.css';
import './style/auth.css';
import { Route, Routes } from 'react-router-dom';
import Main from './componets/Main';
import SignUp from './componets/auth/SignUp';
import Login from './componets/auth/Login';

function App() {
  return (
    <section data-testid='app'>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </section>
  );
}

export default App;
