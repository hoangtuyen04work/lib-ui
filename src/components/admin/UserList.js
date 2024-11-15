import React, { useEffect, useState } from 'react';
import '../../styles/admin/UserList.scss';

function UserList() {
  const [recentBooks, setRecentBooks] = useState([]);

  useEffect(() => {
    const books = [
      { id: 1, image: 'download.jpg', name: 'Sách 1', email: "@gmail.com", phone: "0020202", createdAt: "22/10/2004", numberBorrowed: 222, numberReturned: 209 }
    ];
    setRecentBooks(books);
  }, []);

  return (
    <div className="action-list">
      <h2>Danh sách sách</h2>
      <div className="header-body">
        <div className="header-item">Tên sách</div>
        <div className="header-item">Tác giả</div>
        <div className="header-item">Tổng sách</div>
        <div className="header-item">Số lượng còn</div>
      </div>
      <ul>
        {recentBooks.map(book => (
          <li key={book.id}>
            <div className="item-title">{book.title}</div>
            <div className="item-borrower">{book.author}</div>
            <div className="item-type">{book.totalNumber}</div>
            <div className="item-time">{book.stock}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
