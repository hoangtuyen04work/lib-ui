import axios from "./customize-axios";


const fetchBookData = (token, bookId) => {
    return axios.get(`/book/book/${bookId}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào headers
        },
    });
}


const updateBookData = (token, bookId, bookData) => {
    const formData = new FormData();
    for (const key in bookData) {
        if (Array.isArray(bookData[key])) {
            bookData[key].forEach((item) => formData.append(`${key}[]`, item));
        } else {
            formData.append(key, bookData[key]);
        }
    }

    return axios.put(`/book/book/update?id=${bookId}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`, // Thêm token
            "Content-Type": "multipart/form-data", // Định dạng FormData
        },
    });
};

const fetchRecentlyAction = (token) => {
    return axios.get(`/borrow/action/recently`, {
        headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào headers
        },
    });
}

const fetchUsersBasicData = (token) => {
    return axios.get(`/auth/basic`, {
        headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào headers
        },
    });
}


export {
    fetchBookData,
    updateBookData,
    fetchRecentlyAction,
    fetchUsersBasicData
};