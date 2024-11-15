import React, { useEffect, useState } from 'react';
import '../../styles/admin/BookList.scss';
import AddBook from './AddBook';

function BookList() {
  const [recentBooks, setRecentBooks] = useState([]);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newBook, setNewBook] = useState({
    id: null,
    bookCode: '',
    name: '',
    publicationDate: '',
    edition: '',
    numberPage: '',
    shortDescription: '',
    price: '',
    author: '',
    imageUrl: '',
    language: '',
    numberBorrowed: '',
    numberInstock: '',
    categories: [],
  });

  useEffect(() => {
    const books = [
      {
        id: 1,
        bookCode: 'BC001',
        name: 'Sách 1',
        publicationDate: '2022-01-01',
        edition: '1st',
        numberPage: 300,
        shortDescription: 'Một cuốn sách thú vị',
        price: 100000,
        author: 'Phan Văn Nam',
        imageUrl: '',
        language: 'Tiếng Việt',
        numberBorrowed: 22,
        numberInstock: 220,
        categories: [],
      },
    ];
    setRecentBooks(books);
  }, []);

  const handleAddBook = () => {
    if (isEditing) {
      setRecentBooks(
        recentBooks.map((book) => (book.id === newBook.id ? newBook : book))
      );
    } else {
      setRecentBooks([...recentBooks, { id: recentBooks.length + 1, ...newBook }]);
    }
    setShowAddBookModal(false);
    setIsEditing(false);
    setNewBook({
      id: null,
      bookCode: '',
      name: '',
      publicationDate: '',
      edition: '',
      numberPage: '',
      shortDescription: '',
      price: '',
      author: '',
      imageUrl: '',
      language: '',
      numberBorrowed: '',
      numberInstock: '',
      categories: [],
    });
  };

  const handleEditBook = (id) => {
    const book = recentBooks.find((book) => book.id === id);
    setNewBook(book);
    setIsEditing(true);
    setShowAddBookModal(true);
  };

  const handleDeleteBook = (id) => {
    setRecentBooks(recentBooks.filter((book) => book.id !== id));
  };

  return (
    <div className="book-list">
      <div className="body-panel">
        <h2 className="body-title">Top Books</h2>
        <button className="body-add-book" onClick={() => setShowAddBookModal(true)}>
          Thêm sách
        </button>
      </div>
      <div className="header-body">
        <div className="header-item">Name</div>
        <div className="header-item">Author</div>
        <div className="header-item">Price</div>
        <div className="header-item">Language</div>
        <div className="header-item">Stock</div>
        <div className="header-item">Action</div>
      </div>
      <ul>
        {recentBooks.map((book) => (
          <li key={book.id}>
            <div className="item-title">{book.name}</div>
            <div className="item-author">{book.author}</div>
            <div className="item-price">{book.price} VND</div>
            <div className="item-language">{book.language}</div>
            <div className="item-stock">{book.numberInstock} </div>
            
            <div className="item-actions">
              <button onClick={() => handleEditBook(book.id)}>Sửa</button>
              <button onClick={() => handleDeleteBook(book.id)}>Xóa</button>
            </div>
          </li>
        ))}
      </ul>

      {showAddBookModal && (
        <AddBook
          isEditing={isEditing}
          bookData={newBook}
          setBookData={setNewBook}
          onSubmit={handleAddBook}
          onClose={() => setShowAddBookModal(false)}
        />
      )}
    </div>
  );
}

export default BookList;
