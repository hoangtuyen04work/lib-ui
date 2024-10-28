import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/register.scss';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [roles, setRoles] = useState([]);  // Ví dụ, danh sách role
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('multipartFile', file);
    formData.append('roles', JSON.stringify(roles));  // Giả sử roles là danh sách
    
    try {
      const response = await axios.post('http://localhost:8888/lib/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("res", response)
      const { token, refreshToken, email: responseEmail, imageUrl, name, id} = response.data.data;      
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('email', responseEmail);  // Lưu email từ response vào localStorage
      localStorage.setItem('imageUrl', imageUrl);
      localStorage.setItem('name', name);
      localStorage.setItem('id', id)
      // Điều hướng tới trang chính
      navigate('/home');
    } catch (error) {
      setError('Đăng ký không thành công.');
    }
  };

  return (
    <div className="register-container">
      <h2>Đăng ký</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Xác nhận mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <input type="file" onChange={handleFileChange} />
        {error && <p className="error">{error}</p>}
        <button type="submit">Đăng ký</button>
      </form>
      <p>Đã có tài khoản? <a href="/login">Đăng nhập ngay</a></p>
    </div>
  );
};

export default Register;
