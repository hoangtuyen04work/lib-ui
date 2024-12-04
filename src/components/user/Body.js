import React, { useState, useEffect } from 'react';
import '../../styles/user/UserHome.scss';
import axios from 'axios';
import BookItem from './BookItem'; // Import the new BookItem component
import { fetchListBook } from '../../service/userApiService';
const Body = ({ category, searchResult, isSearch }) => {
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetchListBook(token, category);
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
