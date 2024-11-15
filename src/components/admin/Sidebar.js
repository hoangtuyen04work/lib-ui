import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUser } from '@fortawesome/free-solid-svg-icons';
import '../../styles/admin/Sidebar.scss';
import { useNavigate } from 'react-router-dom';
function Sidebar({ isOpen }) {
  const navigate = useNavigate();

  const handleManageBookOpen = () => {
    navigate("/admin/books");
  }

  const handleManageUserOpen = () => {
    navigate("/admin/users");
  }

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="a-sidebar" onClick={handleManageBookOpen}>
        <FontAwesomeIcon icon={faBook} className="icon-sidebar" />
        Manage Book
      </div>
      <div className="a-sidebar" onClick={handleManageUserOpen}>
        <FontAwesomeIcon icon={faUser} className="icon-sidebar" />
        Manage User
      </div>
    </aside>
  );
}

export default Sidebar;
