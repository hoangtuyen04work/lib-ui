import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/user/Home';
import BookDetail from "./components/user/BookDetail"
import Profile from './components/user/Profile';
import AdminHome from './pages/AdminHome';
import AdminBooks from './pages/AdminBooks'
import AdminUsers from './pages/AdminUsers'
function App() {
  const isLoggedIn = true; // Thay đổi trạng thái đăng nhập thực tế ở đây

  return (
    <Router>
      <Routes>
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/books" element={<AdminBooks />} />
        <Route path="/admin/home" element={<AdminHome />} />
        {/* <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/book/:id" element={<BookDetail />}/>
        <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
