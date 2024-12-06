import axios from "./customize-axios";


const fetchBookDetailData = (token, id) => {
    return axios.get(`/book/book/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào headers
        },
    });
}
const fetchListBook = (token, category) => {
    return axios.get(`/book/book/top?typeId=${category}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào headers
        },
    });
}
const fetchAllType = (token) => {
    return axios.get(`/book/category/all`, {
        headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào headers
        },
    });
}

const searchBook = (token, name) => {
    return axios.get(`search/search?name=${name}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào headers
        },
    });
}
export {
    fetchBookDetailData,
    fetchListBook,
    fetchAllType,
    searchBook
};