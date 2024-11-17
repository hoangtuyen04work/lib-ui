import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/admin/UserDetail.scss";

function UserDetail() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null); // Dữ liệu gốc
  const [editableUser, setEditableUser] = useState(null); // Dữ liệu chỉnh sửa
  const [isEditing, setIsEditing] = useState(false);

  // Fetch dữ liệu người dùng
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setUserData(response.data);
        setEditableUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [userId]);

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser({ ...editableUser, [name]: value });
  };

  // Lưu thay đổi
  const handleSave = async () => {
    try {
      await axios.put(`/api/users/${userId}`, editableUser, {
        headers: { "Content-Type": "application/json" },
      });
      setUserData({ ...editableUser });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  // Hủy chỉnh sửa
  const handleCancel = () => {
    setEditableUser({ ...userData });
    setIsEditing(false);
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="user-detail">
      <h2>User Detail</h2>
      <div className="user-fields">
        <div className="field">
          <label>ID:</label>
          <span>{userData.id}</span>
        </div>

        <div className="field">
          <label>Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editableUser.name || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.name}</span>
          )}
        </div>

        <div className="field">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editableUser.email || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.email}</span>
          )}
        </div>

        <div className="field">
          <label>Phone:</label>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={editableUser.phone || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.phone}</span>
          )}
        </div>

        <div className="field">
          <label>Number Borrowed:</label>
          <span>{userData.numberBorrowed}</span>
        </div>

        <div className="field">
          <label>Number Returned:</label>
          <span>{userData.numberReturned}</span>
        </div>

        <div className="field">
          <label>Created At:</label>
          <span>{new Date(userData.created_at).toLocaleString()}</span>
        </div>

        <div className="field">
          <label>Updated At:</label>
          <span>{new Date(userData.updated_at).toLocaleString()}</span>
        </div>

        <div className="field">
          <label>Image:</label>
          {userData.imageUrl && (
            <img src={userData.imageUrl} alt="User Avatar" className="user-avatar" />
          )}
        </div>

        <div className="field">
          <label>Roles:</label>
          <ul>
            {userData.roles.map((role) => (
              <li key={role.id}>{role.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="actions">
        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
      </div>
    </div>
  );
}

export default UserDetail;
