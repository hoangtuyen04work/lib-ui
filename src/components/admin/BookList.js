import React, { useEffect, useState } from "react";
import "../../styles/admin/BookList.scss";
import AddBook from "./AddBook";
import { fetchBooksBasicData } from "../../service/adminApiService";

function BookList() {
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [bookList, setBookList] = useState([]);
  const [bookIdSelected, setBookIdSelected] = useState();

  const fetchBookBasicData = async () => {
    const token = localStorage.getItem('token');
    const response = await fetchBooksBasicData(token);
    console.log(response);
    setBookList(response.data.data.content);
  }

  useEffect(() => {
    fetchBookBasicData();
  }, []);

  const handleShowAddBookModal = () => {
    setIsEditing(false);
    setShowAddBookModal(true);
    
  };
  
  const handleBookClick = (bookId) => {
    setBookIdSelected(bookId);
    setShowAddBookModal(true);
    setIsEditing(true);
  };
  
  const handleOnClose = () => {
    setShowAddBookModal(false);
  }

  return (
    <div className="book-list">
      <div className="body-panel">
        <h2 className="body-title">Top Books</h2>
        <button className="body-add-book" onClick={handleShowAddBookModal}>
          Thêm sách
        </button>
      </div>
      <div className="header-body">
        <div className="header-item">Name</div>
        <div className="header-item">Author</div>
        <div className="header-item">Price</div>
        <div className="header-item">Language</div>
        <div className="header-item">Borrowed</div>
      </div>
      <ul>
        {bookList.map((book) => (
          <li key={book.id} onClick={() => handleBookClick(book.id)}>
            <div className= "item-title">{book.name}</div>
            <div className="item-author">{book.author}</div>
            <div className="item-price">{book.price} VND</div>
            <div className="item-language">{book.language}</div>
            <div className="item-numberBorrowed">{book.numberBorrowed}</div>
          </li>
        ))}
      </ul>

      {showAddBookModal && (
        <AddBook
          isEditing={isEditing}
          bookId={bookIdSelected}
          onClose={handleOnClose}
        />
      )}
    </div>
  );
}

export default BookList;
