import React, { useEffect, useState } from 'react';
import '../../styles/admin/ActionList.scss';
import { fetchRecentlyAction } from '../../service/adminApiService';
function ActionList() {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const fetchActions = async () => {
      const token = localStorage.getItem('token');
      try {
        const data = await fetchRecentlyAction(token);
        setActions(prev => [...prev, ...data.data.data.content]);
      } catch (error) {
        console.error('Error fetching actions:', error);
      }
    };
  
    fetchActions();
  }, []);
  
  return (
    <div className="action-list">
      <h2>Hoạt động gần đây</h2>
      <div className="header-body">
        <div className="header-item">Book Id</div>
        <div className="header-item">User Id</div>
        <div className="header-item">BorrowDate</div>
        <div className="header-item">Status</div>
      </div>
      <ul>
        {actions.map(book => (
          <li key={book.id}>
            <div className="item-title">{book.bookId}</div>
            <div className="item-borrower">{book.userId}</div>
            <div className="item-type">{book.borrowDate}</div>
            <div className="item-time">{book.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActionList;
