import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/admin/BookDetail.scss";
import { fetchBookData } from "../service/adminApiService";

function BookDetail({ onSave }) {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState(null); // Initial book data
  const [editableBook, setEditableBook] = useState(null); // Editable book data
  const [isEditing, setIsEditing] = useState(false);

  // Fetch book data on component mount
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`/book/${bookId}`);
        setBookData(response.data);
        setEditableBook(response.data); // Set editableBook to the fetched data
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };
    fetchBookData();
  }, [bookId]);

  // Handle input changes in edit mode
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableBook({ ...editableBook, [name]: value });
  };

  // Save changes
  const handleSave = async () => {
    try {
      await axios.put(`/book/update/${bookId}`, editableBook, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setBookData({ ...editableBook }); // Update displayed book data
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving book data:", error);
    }
  };

  // Enable edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Cancel edit mode
  const handleCancel = () => {
    setEditableBook({ ...bookData }); // Revert changes
    setIsEditing(false);
  };

  if (!bookData) return <div>Loading...</div>;

  return (
    <div className="book-detail-admin">
      <h2 className="detail-title">Book Detail</h2>
      <div className="detail-fields">
        <div className="field">
          <label>Book Code:</label>
          {isEditing ? (
            <input
              type="text"
              name="bookCode"
              value={editableBook.bookCode || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span>{bookData.bookCode}</span>
          )}
        </div>

        <div className="field">
          <label>Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editableBook.name || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span>{bookData.name}</span>
          )}
        </div>

        <div className="field">
          <label>Publication Date:</label>
          {isEditing ? (
            <input
              type="date"
              name="publicationDate"
              value={editableBook.publicationDate || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span>{bookData.publicationDate}</span>
          )}
        </div>

        <div className="field">
          <label>Edition:</label>
          {isEditing ? (
            <input
              type="text"
              name="edition"
              value={editableBook.edition || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span>{bookData.edition}</span>
          )}
        </div>

        <div className="field">
          <label>Number of Pages:</label>
          {isEditing ? (
            <input
              type="number"
              name="numberPage"
              value={editableBook.numberPage || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span>{bookData.numberPage}</span>
          )}
        </div>

        <div className="field">
          <label>Price:</label>
          {isEditing ? (
            <input
              type="number"
              name="price"
              value={editableBook.price || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span>{bookData.price} VND</span>
          )}
        </div>

        <div className="field">
          <label>Author:</label>
          {isEditing ? (
            <input
              type="text"
              name="author"
              value={editableBook.author || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span>{bookData.author}</span>
          )}
        </div>

        <div className="field">
          <label>Language:</label>
          {isEditing ? (
            <input
              type="text"
              name="language"
              value={editableBook.language || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span>{bookData.language}</span>
          )}
        </div>

        <div className="field">
          <label>Short Description:</label>
          {isEditing ? (
            <textarea
              name="shortDescription"
              value={editableBook.shortDescription || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span>{bookData.shortDescription}</span>
          )}
        </div>
      </div>

      <div className="detail-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
      </div>
    </div>
  );
}

export default BookDetail;
