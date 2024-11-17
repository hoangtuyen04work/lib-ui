import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/user/BookItem.scss'; // Giữ nguyên nếu cần style

const BookItem = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${book.id}`); // Chuyển hướng đến trang chi tiết sách theo ID
  };

  return (
    <div className="book-item" onClick={handleClick}>
      <div className="book-image-wrapper">
        <img src={book.imageUrl} alt={book.title} />
      </div>
      <h3>{book.name}</h3>
      <p>Borrowed: {book.numberBorrowed}</p>
    </div>
  );
};

export default BookItem;
