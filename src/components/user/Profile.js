import React, { useState } from 'react';
import '../../styles/user/Profile.scss';
import Header from './Header';

const Profile = () => {
    const [category, setCategory] = useState('all');
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [name, setName] = useState(localStorage.getItem('name'))
    const [imageUrl, setImageUrl] = useState(localStorage.getItem('imageUrl'))
    const [borrowedBooks, setBorrowedBooks] = useState(1)
    const [currentBooks, setCurrentBooks] = useState(5)
    // Dữ liệu giả lập cho profile
    const user = {
        name: name,
        email: email,
        borrowedBooks: borrowedBooks,
        currentBooks: currentBooks,
        imageUrl: imageUrl,
    };

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
    };

    return (
        <div className="profile">
            <Header onCategoryChange={handleCategoryChange} />
            <div className="profile-page">
                <div className="profile-header">
                    <img src={user.imageUrl} alt={user.name} className="profile-image" />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
                <div className="profile-info">
                    <p>Số sách đã mượn: {user.borrowedBooks}</p>
                    <p>Số sách đang mượn: {user.currentBooks}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
