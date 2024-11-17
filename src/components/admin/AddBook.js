import React, { useEffect } from "react";
import "../../styles/admin/AddBook.scss";

function AddBook({ isEditing, bookData, setBookData, onSubmit, onClose }) {
  useEffect(() => {
    if (!isEditing) {
      setBookData({
        id: '',
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
        numberBorrowed: 0,
        numberInstock: 0,
        categories: [],
      });
    }
  }, [isEditing, setBookData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBookData({ ...bookData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <h3>{isEditing ? "Sửa thông tin sách" : "Thêm sách mới"}</h3>
          <div className="form-group">
            <label>Code</label>
            <input
              type="text"
              placeholder="Book Code"
              value={bookData.bookCode || ''}
              onChange={(e) =>
                setBookData({ ...bookData, bookCode: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Tên sách"
              value={bookData.name || ''}
              onChange={(e) =>
                setBookData({ ...bookData, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>CreationDate</label>
            <input
              type="date"
              value={bookData.publicationDate || ''}
              onChange={(e) =>
                setBookData({ ...bookData, publicationDate: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              placeholder="Tác giả"
              value={bookData.author || ''}
              onChange={(e) =>
                setBookData({ ...bookData, author: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Giá</label>
            <input
              type="number"
              placeholder="Giá"
              value={bookData.price || ''}
              onChange={(e) =>
                setBookData({ ...bookData, price: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Total Page</label>
            <input
              type="number"
              placeholder="Số trang"
              value={bookData.numberPage || ''}
              onChange={(e) =>
                setBookData({ ...bookData, numberPage: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Mô tả ngắn"
              value={bookData.shortDescription || ''}
              onChange={(e) =>
                setBookData({ ...bookData, shortDescription: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Language</label>
            <input
              type="text"
              placeholder="Ngôn ngữ"
              value={bookData.language || ''}
              onChange={(e) =>
                setBookData({ ...bookData, language: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Hình ảnh</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          {bookData.imageUrl && (
            <div className="image-preview">
              <img src={bookData.imageUrl} alt="Preview" />
            </div>
          )}
          <div className="modal-actions">
            <button onClick={onSubmit}>
              {isEditing ? "Cập nhật" : "Thêm"}
            </button>
            <button onClick={onClose}>Hủy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBook;
