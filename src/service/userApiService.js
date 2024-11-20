import axios from "./customize-axios";


const fetchBookDetailData = (token, id) => {
    return axios.get(`/book/book/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào headers
        },
    });
}


export {
    fetchBookDetailData
};