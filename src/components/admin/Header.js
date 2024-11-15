import React from 'react';
import '../../styles/admin/Header.scss';
import { useNavigate } from 'react-router-dom';
function Header({ toggleSidebar }) {
  const navigate = useNavigate();

  const handlePanelClick = () => {
    navigate("/admin/home");
  };
  return (
    <header className="header-admin">
      {/* <button onClick={toggleSidebar} className="sidebar-toggle">
        ☰
      </button> */}
      <img src="/xxx.jpg" alt="Library Logo" className="header-logo" />
      <h1 className="panel" onClick={handlePanelClick}>Manage Library</h1>
      
      <input type="text" placeholder="Tìm kiếm sách..." className="search-input" />
      
      <div className="header-right">
        <button className="logout-button">Logout</button>
        <div className="profile">
          <img src="/logo512.png" alt="Profile" className="profile-pic" />
          <span className="profile-name">Admin</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
