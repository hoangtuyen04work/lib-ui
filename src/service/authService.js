import axios from "./customize-axios";

const login = (email, password) => {
    return axios.post(`/auth/login`, {
        email,
        password
    });
};

const register = (email, password) => {
    return axios.post(`/auth/register`, {
        email,
        password
    });
};

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


export { login, register, logout, authenticate, refresh};
