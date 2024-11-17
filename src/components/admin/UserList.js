import React, { useEffect, useState } from 'react';
import '../../styles/admin/UserList.scss';
import { useNavigate } from "react-router-dom";
import { fetchUsersBasicData } from '../../service/adminApiService';
function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const handleBookClick = (userId) => {
    navigate(`/admin/user/${userId}`);
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    const response = await fetchUsersBasicData(token);
    setUsers(prev => [...prev, ...response.data.data.content])
  }

  useEffect(() => {

    fetchUserData();
  }, []);

  return (
    <div className="user-list">
      <h2>Danh sách sách</h2>
      <div className="header-body">
        <div className="header-item">Name</div>
        <div className="header-item">Email</div>
        <div className="header-item">Phone</div>
        <div className="header-item">createdAt</div>
      </div>
      <ul>
        {users.map(user => (
          <li key={user.id} onClick={() => handleBookClick(user.id)} >
            <div className="item-name">{user.name}</div>
            <div className="item-email">{user.email}</div>
            <div className="item-phone">{user.phone}</div>
            <div className="item-createdAt">{user.createdAt}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
