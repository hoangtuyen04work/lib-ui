import React, { useEffect, useState } from 'react';
import '../../styles/admin/UserList.scss';

function UserList() {
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const books = [
      { id: 1, image: 'download.jpg', name: 'User1', email: "@gmail.com", phone: "0020202", createdAt: "22/10/2004"}
    ];
    setRecentUsers(books);
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
        {recentUsers.map(user => (
          <li key={user.id}>
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
