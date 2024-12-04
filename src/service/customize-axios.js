import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8888/lib",
});

api.interceptors.request.use(
  function (config) {
    console.log(">>1")
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

let isRefreshing = false; // Flag to prevent multiple token refreshes

api.interceptors.response.use(
  (response) => {
    return response; // Return response if there is no error
  },
  async (error) => {
    if (error.response) {
      const { code, message } = error.response.data;

      // Handle specific error codes
      switch (code) {
        case 402: // Token expired
          alert("Phiên đăng nhập hết hạn.");
          break;
        case 403: // User does not exist
          alert("Tài khoản không được quyền truy cập vào tài khoản này");
          break;
        case 404: // Wrong password or username
          alert("Sai mật khẩu hoặc tài khoản.");
          break;
        case 406: // email or phone number not found
          alert("Sai tài khoản hoặc mật khẩu");
          break;
        case 407: // Invalid input data
          alert("Tài khoản hoặc mật khẩu.");
          break;
        case 411: // refresh token failed
          alert("Please re login.");
          break;
        default:
          alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
    } else {
      alert("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
    }
    return Promise.reject(error);

    // return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (response) => {
    
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       console.log("Token expired, attempting to refresh...");
//       originalRequest._retry = true;

//       if (!isRefreshing) {
//         isRefreshing = true;

//         try {
//           const newToken = await refreshAccessToken();
//           api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
//           processQueue(null, newToken);
//           return api(originalRequest);
//         } catch (refreshError) {
//           processQueue(refreshError, null);
//           localStorage.removeItem("token");
//           localStorage.removeItem("refreshToken");
//           window.location.href = "/login";
//         } finally {
//           isRefreshing = false;
//         }
//       }

//       // Wait for token refresh
//       return new Promise((resolve, reject) => {
//         failedQueue.push({
//           resolve: (token) => {
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             resolve(api(originalRequest));
//           },
//           reject: (err) => {
//             reject(err);
//           },
//         });
//       });
//     }

//     // Handle other errors
//     console.error("Request failed:", error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

async function refreshAccessToken() {
  try {
    console.log("Refreshing token...");
    const response = await axios.post("http://localhost:8888/lib/auth/refreshToken", {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    console.log(">>Res", response);
    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    throw new Error("Unable to refresh token");
  }
}

export default api;
