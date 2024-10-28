import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.scss';

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
      const response = await axios.post('http://localhost:8888/lib/auth/login', { email, password });
      // Lưu token, refreshToken và email vào localStorage sau khi đăng nhập thành công
      console.log(response);
      const { token, refreshToken, email: responseEmail, imageUrl, name, id} = response.data.data;  // Đổi tên email thành responseEmail
      
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('email', responseEmail);  // Lưu email từ response vào localStorage
      localStorage.setItem('imageUrl', imageUrl);
      localStorage.setItem('name', name);
      localStorage.setItem('id', id)
      // Điều hướng tới trang chính
      navigate('/home');
    } catch (error) {
      console.log(error);
      setError('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
    }
  };

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
