import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/user/Home';
import BookDetail from "./components/user/BookDetail";
import Profile from './components/user/Profile';
import AdminHome from './pages/AdminHome';
import AdminBooks from './pages/AdminBooks';
import AdminUsers from './pages/AdminUsers';
import BookAdminDetail from './pages/BookDetail';
import UserAdminDetail from './pages/UserDetail';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import AddBook from './components/admin/AddBook';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes dành cho admin */}

        <Route path="/admin/book/add" element={<ProtectedRoute><AddBook /></ProtectedRoute>} />
        <Route path="/admin/book/:id" element={<ProtectedRoute><AddBook /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
        <Route path="/admin/books" element={<ProtectedRoute><AdminBooks /></ProtectedRoute>} />
        <Route path="/admin/home" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
        <Route path="/admin/book/:bookId" element={<ProtectedRoute><BookAdminDetail /></ProtectedRoute>} />
        <Route path="/admin/user/:userId" element={<ProtectedRoute><UserAdminDetail /></ProtectedRoute>} />

        {/* Route chung */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes dành cho user */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/book/:id" element={<ProtectedRoute><BookDetail /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
