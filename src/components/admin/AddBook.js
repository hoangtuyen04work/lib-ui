import React, { useEffect, useState } from "react";
import "../../styles/admin/AddBook.scss";
import { fetchBooksDetailData, fetchAllBookType, updateBook, createBook } from "../../service/adminApiService";

function AddBook({ isEditing, bookId, onClose }) {
  const [bookData, setBookData] = useState({
    bookId: '',
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
    number: '',
    categories: [],
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown toggle
  const [allCategories, setAllCategories] = useState([]);

  const onSubmit = async () => {
    const token = localStorage.getItem("token");
    const payload = { ...bookData };
  
    if (isEditing) {
      await updateBook(bookId, token, payload);
      alert("Book updated successfully!");
    } else {
      console.log(payload)
      await createBook(token, payload);
      alert("Book created successfully!");
    }
    window.location.reload()
    // onClose();
  };
  
  useEffect(() => {
    const getAllCategories = async () => {
      const token = localStorage.getItem('token');
      const response = await fetchAllBookType(token);
      setAllCategories(response.data.data);
    }
    const initPage = async () => {
      if (!isEditing) {
        setBookData({
          bookCode: '',
          name: '',
          publicationDate: '',
          edition: '',
          numberPage: 0, 
          shortDescription: '',
          price: 0,
          author: '',
          imageUrl: '',
          language: '',
          number: 0,
          categories: [],
        });
      } else {
        const token = localStorage.getItem('token');
        const response = await fetchBooksDetailData(token, bookId);
        setBookData(response.data.data);
      }
    };

    initPage();
    getAllCategories();
  }, [isEditing, bookId]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.dropdown')) {
        setIsDropdownOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleCategorySelect = (category) => {
    setBookData((prevData) => {
      const isSelected = prevData.categories.some(
        (cat) => typeof cat === "object" && cat.id === category.id
      );
  
      const updatedCategories = isSelected
        ? prevData.categories.filter((cat) => cat.id !== category.id)
        : [...prevData.categories, category];
  
      return { ...prevData, categories: updatedCategories };
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBookData((prevData) => ({
          ...prevData,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <h3>{isEditing ? "Sửa thông tin sách" : "Thêm sách mới"}</h3>
          <div className="form-group">
            <label>Code</label>
            <input
              type="text"
              name="bookCode"
              placeholder="Book Code"
              value={bookData.bookCode || ''}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Tên sách"
              value={bookData.name || ''}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <label>Creation Date</label>
            <input
              type="date"
              name="publicationDate"
              value={bookData.publicationDate || ''}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              name="author"
              placeholder="Tác giả"
              value={bookData.author || ''}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              placeholder="Giá"
              value={bookData.price || ''}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <label>Total Page</label>
            <input
              type="number"
              name="numberPage"
              placeholder="Số trang"
              value={bookData.numberPage || ''}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <label>Số lượng trong kho</label>
            <input
              type="number"
              name="number"
              placeholder="Số lượng trong kho"
              value={bookData.number || ''}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <label>Thể loại</label>
            <div className="dropdown">
              <div className="dropdown-toggle" onClick={toggleDropdown}>
                {bookData.categories.length > 0
                  ? bookData.categories.map((cat) =>
                      typeof cat === "object" ? cat.category : cat
                    ).join(", ")
                  : "Chọn thể loại"}
              </div>

              {isDropdownOpen && (
                <div className="dropdown-menu">
                  {allCategories.map((category) => (
                    <div
                      key={category.id}
                      className={`dropdown-item ${
                        bookData.categories.some((cat) =>
                          typeof cat === "object" ? cat.id === category.id : cat === category.category
                        )
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category.category}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="shortDescription"
              placeholder="Mô tả ngắn"
              value={bookData.shortDescription || ''}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <label>Language</label>
            <input
              type="text"
              name="language"
              placeholder="Ngôn ngữ"
              value={bookData.language || ''}
              onChange={handleOnChange}
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