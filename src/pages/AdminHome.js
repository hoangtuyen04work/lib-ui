import React, { useState } from 'react';
import Header from '../components/admin/Header';
import Sidebar from '../components/admin/Sidebar';
import ActionList from '../components/admin/ActionList';
import '../styles/admin/AdminHome.scss';

function AdminHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Trạng thái Sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState); // Đảo ngược trạng thái của Sidebar
  };

  return (
    <div className="admin-home">
      <Header toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="content-body">
          <ActionList />
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
