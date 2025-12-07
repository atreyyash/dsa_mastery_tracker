import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import ChapterDetails from './pages/ChapterDetails';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup/>} />
        <Route element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate replace to='dashboard' />}></Route>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='/chapters/:chapterId' element={<ChapterDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
