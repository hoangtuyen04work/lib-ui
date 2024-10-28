import React, { useState, useEffect } from 'react';
import '../styles/home.scss';
import axios from 'axios';
import BookItem from './BookItem'; // Import the new BookItem component

const Body = ({ category, searchResult, isSearch }) => {
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/lib/book/book/top?typeId=${category}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setBookData(response.data.data.content);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    if (isSearch === true) {
      setBookData(searchResult);
    } else {
      getBook(); // Show trending books if no search
    }
  }, [category, searchResult]);

  return (
    <div className="body">
      <h2>{isSearch ? 'Search Results' : 'Trending Books'}</h2>
      <div className="book-list">
        {bookData.length > 0 ? (
          bookData.map((book) => <BookItem key={book.id} book={book} />) // Use the new BookItem component
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
};

export default Body;
