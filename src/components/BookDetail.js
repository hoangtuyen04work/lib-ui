import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/bookdetail.scss';
import Header from './Header';
import axios from 'axios';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [borrowStatus, setBorrowStatus] = useState(false); 
  const [borrowId, setBorrowId] = useState();
  useEffect(() => {
    const getInfo = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8888/lib/book/book?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBook(response.data.data);
    };

    const getRatings = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8888/lib/rating/rate/book?bookId=${id}&size=${10}&page=${0}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReviews(response.data.data.content);
    };
    
    const checked = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('id');
      const response = await axios.get(`http://localhost:8888/lib/borrow/check?userId=${userId}&bookId=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBorrowStatus(response.data.data);
    };
    getRatings();
    getInfo();
    checked();
  }, [id]);

  const handleBorrow = async () => {
    const userId = localStorage.getItem('id');
    try {
      const response = await axios.put(
        `http://localhost:8888/lib/borrow/borrow/${userId}/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.data) {
        setBorrowStatus(true);
      } else {
        setBorrowStatus(false);
      }
    } catch (error) {
      console.error('Error borrowing book:', error);
      setBorrowStatus(false);
    }
  };

  const handleReturn = async () => {
    const userId = localStorage.getItem('id');
    try {
      const response = await axios.put(
        `http://localhost:8888/lib/borrow/return/${userId}`,
        [id],
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.data) {
        setBorrowStatus(false);
      } else {
        console.error('Error returning book');
      }
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('id');
    const userName = localStorage.getItem('name');
    console.log(userName)
    try {
      const response = await axios.post(
        `http://localhost:8888/lib/rating/rate`,
        {
          userId: userId,
          bookId: id,
          rating: rating,
          comment: comment,
          userName: userName
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.data) {
        setReviews([...reviews, { userId, rating, comment, userName }]);
      } else {
        console.error('Error submitting review');
      }
    } catch (error) {
      console.error('Error returning book:', error);
    }
    setComment('');
    setRating(0);
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className="book-detail">
        <h1>{book.name}</h1>
        <div className="book-info">
          <img src={book.imageUrl} alt={book.name} />
          <div className="book-description">
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Publication Date:</strong> {book.publicationDate}</p>
            <p><strong>Price:</strong> {book.price} VND</p>
            <p><strong>Description:</strong> {book.shortDescription}</p>
            
            {borrowStatus ? (
              <button onClick={handleReturn}>Return Book</button>
            ) : (
              <button onClick={handleBorrow}>Borrow Book</button>
            )}
          </div>
        </div>

        <h2>Submit Your Review</h2>
        <form onSubmit={handleSubmitReview}>
          <div>
            <label>Rating:</label>
            <div className="star-rating">
              {[5, 4, 3, 2, 1].map((star) => (
                <React.Fragment key={star}>
                  <input
                    type="radio"
                    id={`star${star}`}
                    name="rating"
                    value={star}
                    checked={rating === star}
                    onChange={() => setRating(star)}
                  />
                  <label htmlFor={`star${star}`}>★</label>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div>
            <label>Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit Review</button>
        </form>

        <h3>Reviews</h3>
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <strong>Rating:</strong> {review.rating} ★<br/>
              <strong>{review.userName}:</strong> {review.comment} <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookDetail;
