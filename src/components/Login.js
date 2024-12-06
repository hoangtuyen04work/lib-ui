import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.scss';
import {login, refresh} from '../service/authService'
import { loginUser} from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("login >>", email, password);
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
        console.log("Login successful!");
        navigate('/home');
    } else {
        console.error("Login failed: ", result.payload || result.error.message);
        setError("Invalid email or password.");
    }
};


  const checkPreLogin = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        const response = await refresh(refreshToken);
        if (response.data.code !== 200) {
          localStorage.clear();
        } else {
          const { token, refreshToken, email: responseEmail, imageUrl, name, id, roles } = response.data.data;
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('email', responseEmail);
          localStorage.setItem('imageUrl', imageUrl);
          localStorage.setItem('name', name);
          localStorage.setItem('id', id);
          const roleNames = roles.map(role => role.roleName);
          localStorage.setItem('role', JSON.stringify(roleNames));
          if (roleNames.includes('ADMIN')) {
            navigate('/admin/home'); 
          } else {
            navigate('/home'); 
          }
        }
      } catch (error) {
        console.error("Token refresh failed:", error);
        localStorage.clear();
      }
    }
    setLoading(false); // Mark loading as complete
  };
  useEffect(() => {
    checkPreLogin();
  }, []);


  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }
  else return (
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
