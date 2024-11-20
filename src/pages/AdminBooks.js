import React, { useState } from 'react';
import Header from '../components/admin/Header';
import Sidebar from '../components/admin/Sidebar';
import BookList from '../components/admin/BookList';
import '../styles/admin/AdminBooks.scss';

function AdminBooks() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Trạng thái Sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState); // Đảo ngược trạng thái của Sidebar
  };

  return (
    <div className="admin-books">
      <Header toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="content-body">
          <BookList />
        </div>
      </div>
    </div>
  );
}

export default AdminBooks;
