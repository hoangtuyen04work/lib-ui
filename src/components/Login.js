import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.scss';
import {login, authenticate, refresh} from '../service/authService'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(email);
      console.log(password);
      const response = await login(email, password);
      const { token, refreshToken, email: responseEmail, imageUrl, name, id, roles} = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('email', responseEmail);  // Lưu email từ response vào localStorage
      localStorage.setItem('imageUrl', imageUrl);
      localStorage.setItem('name', name);
      localStorage.setItem('id', id);
      const roleNames = roles.map(role => role.roleName);
      localStorage.setItem('role', JSON.stringify(roleNames)); // Lưu mảng roleNames vào localStorage
      if (roleNames.includes('ADMIN')) {
        navigate('/admin/home'); // Chuyển hướng đến trang admin
      } else {
        navigate('/home'); // Chuyển hướng đến trang thường
      }
    } catch (error) {
      console.log(error);
      setError('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
    }
  };

  const checkPreLogin = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const response = await refresh(refreshToken);
      if (response.data.code != 200) {
        localStorage.clear();
      }
      else {
        const { token, refreshToken, email: responseEmail, imageUrl, name, id, roles} = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('email', responseEmail);  // Lưu email từ response vào localStorage
        localStorage.setItem('imageUrl', imageUrl);
        localStorage.setItem('name', name);
        localStorage.setItem('id', id);
        const roleNames = roles.map(role => role.roleName);
        localStorage.setItem('role', JSON.stringify(roleNames)); // Lưu mảng roleNames vào localStorage
        if (roleNames.includes('ADMIN')) {
          navigate('/admin/home'); // Chuyển hướng đến trang admin
        } else {
          navigate('/home'); // Chuyển hướng đến trang thường
        }
      }
    }
  }

  useEffect(() => {
    checkPreLogin();
  }, [])

  return (
    <div className="login-container">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Đăng nhập</button>
      </form>
      <p>Bạn chưa có tài khoản? <a href="/register">Đăng ký ngay</a></p>
    </div>
  );
};

export default Login;
