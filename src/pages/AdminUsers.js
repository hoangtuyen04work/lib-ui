import React, { useState } from 'react';
import Header from '../components/admin/Header';
import Sidebar from '../components/admin/Sidebar';
import UserList from '../components/admin/UserList';
import '../styles/admin/AdminUsers.scss';

function AdminUsers() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Trạng thái Sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState); // Đảo ngược trạng thái của Sidebar
  };

  return (
    <div className="admin-user">
      <Header toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="content-body">
          <UserList />
        </div>
      </div>

    </div>
  );
}

export default AdminUsers;
