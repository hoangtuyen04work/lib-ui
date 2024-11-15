import React, { useEffect, useState } from 'react';
import '../../styles/admin/ActionList.scss';

function ActionList() {
  const [recentBooks, setRecentBooks] = useState([]);

  useEffect(() => {
    // Giả lập dữ liệu sách mượn gần đây
    const borrowedBooks = [
      { id: 1, title: 'Sách 1', borrower: 'Người dùng A', borrowedDate: '2024-11-10', type: 'Novel' },
      { id: 2, title: 'Sách 2', borrower: 'Người dùng B', borrowedDate: '2024-11-11', type: 'Science' },
      { id: 3, title: 'Sách 3', borrower: 'Người dùng C', borrowedDate: '2024-11-12', type: 'History' },
      { id: 1, title: 'Sách 1', borrower: 'Người dùng A', borrowedDate: '2024-11-10', type: 'Novel' },
      { id: 2, title: 'Sách 2', borrower: 'Người dùng B', borrowedDate: '2024-11-11', type: 'Science' },
      { id: 3, title: 'Sách 3', borrower: 'Người dùng C', borrowedDate: '2024-11-12', type: 'History' },
      { id: 1, title: 'Sách 1', borrower: 'Người dùng A', borrowedDate: '2024-11-10', type: 'Novel' },
      { id: 2, title: 'Sách 2', borrower: 'Người dùng B', borrowedDate: '2024-11-11', type: 'Science' },
      { id: 3, title: 'Sách 3', borrower: 'Người dùng C', borrowedDate: '2024-11-12', type: 'History' },
      { id: 1, title: 'Sách 1', borrower: 'Người dùng A', borrowedDate: '2024-11-10', type: 'Novel' },
      { id: 2, title: 'Sách 2', borrower: 'Người dùng B', borrowedDate: '2024-11-11', type: 'Science' },
      { id: 3, title: 'Sách 3', borrower: 'Người dùng C', borrowedDate: '2024-11-12', type: 'History' }
    ];
    setRecentBooks(borrowedBooks);
  }, []);

  return (
    <div className="action-list">
      <h2>Hoạt động gần đây</h2>
      <div className="header-body">
        <div className="header-item">Book Name</div>
        <div className="header-item">User Name</div>
        <div className="header-item">Type</div>
        <div className="header-item">Time</div>
      </div>
      <ul>
        {recentBooks.map(book => (
          <li key={book.id}>
            <div className="item-title">{book.title}</div>
            <div className="item-borrower">{book.borrower}</div>
            <div className="item-type">{book.type}</div>
            <div className="item-time">{book.borrowedDate}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActionList;
