import React, { useEffect, useState } from 'react';
import '../styles/header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import NotificationDropdown from './NotificationDropdown';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ onCategoryChange, onSearchChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [listCategory, setListCategory] = useState([]);
  const [notifications] = useState([
    "New book added: 'JavaScript Basics'",
    "Discount on Fiction books!",
    "Your friend has joined the library!"
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle search submit when the search icon is clicked
  const handleSearchSubmit = async () => {
    if (search.trim() !== "") {
      try {
        const token = localStorage.getItem('token');
        console.log("seatch:", search)
        const response = await axios.get(`http://localhost:8888/lib/search/search?name=${search}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("res", response);
        onSearchChange(response.data.data.content); // Pass search results to parent component
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      onSearchChange([]); // Reset search results when search input is empty
    }
  };

  const handleCategoryChange = (e) => {
    onCategoryChange(e.target.value);
  };

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const handleClick = () => {
    if (location.pathname === '/home') {
      // Force reload if already on the homepage
      window.location.reload();
    } else {
      // Navigate to home if on a different page
      navigate('/home');
    }
  };

  useEffect(() => {
    const getAllType = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8888/lib/book/category/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setListCategory(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getAllType();
  }, []);

  return (
    <header className="header">
<div className="logo" onClick={handleClick}>
      Library
    </div>
      <select className="category-select" onChange={handleCategoryChange}>
        <option value="0">All Categories</option>
        {listCategory.length > 0 ? (
          listCategory.map(category => (
            <option key={category.id} value={category.id}>
              {category.category}
            </option>
          ))
        ) : (
          <option disabled>Loading categories...</option>
        )}
      </select>

      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={handleSearchInputChange}
          className="search-bar"
        />
        <button className="search-btn" onClick={handleSearchSubmit}>
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </button>
      </div>

      <div className="user-controls">
        <button className="notification-btn" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faBell} />
          {notifications.length > 0 && (
            <span className="notification-count">{notifications.length}</span>
          )}
        </button>

        <NotificationDropdown
          notifications={notifications}
          isOpen={isDropdownOpen}
          onNotificationClick={(notification) =>
            console.log("Clicked notification:", notification)
          }
        />

        <button className="profile-btn" onClick={() => window.location.href = '/profile'}>
          My Profile
        </button>
        <button className="logout-btn" onClick={() => {
          axios.post('http://localhost:8888/lib/auth/logoutt', {
            token: localStorage.getItem('token'),
            refreshToken: localStorage.getItem('refreshToken')
          });
          localStorage.clear();
          navigate('/login');
        }}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
