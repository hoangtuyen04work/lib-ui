import axios from "./customize-axios";

// const login = (email, password) => {
//     axios.post(`/auth/login`, {
//         email,
//         password
//     });
//     return "hello";
    

// };
const login = async (email, password) => {
    try {
      const response = await axios.post(`/auth/login`, {
        email,
        password
      });
      return response.data; // Trả về dữ liệu khi đăng nhập thành công
    } catch (error) {
      console.error("êr", error); // Nếu có lỗi, sẽ được xử lý ở đây
      // Lỗi sẽ được xử lý trong interceptor, không cần xử lý lại ở đây
      throw error; // Đảm bảo lỗi vẫn được ném đi để interceptor xử lý
    }
};
  
// const register = (email, password) => {
//     return axios.post(`/auth/register`, {
//         email,
//         password
//     });
// };

const logout = (token, refreshToken) => {
     return axios.post('/auth/logoutt', {
        token: token,
        refreshToken: refreshToken
      });
};

const authenticate = (token, refreshToken) => {
    return axios.post('/auth/authenticate',
        {
            token: token,
            refreshToken: refreshToken
        });
}

const refresh = (refreshToken) => {
    return axios.post('/auth/refreshToken',
        {
            refreshToken: refreshToken
        });
}


export { login, logout, authenticate, refresh};
