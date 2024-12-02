export const CREATE_USER = 'CREATE_USER';
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const ON_SEARCH = "ON_SEARCH"
export const OFF_SEARCH = "OFF_SEARCH"
export const IS_SEARCH_USER = "SEARCH_USER"
export const IS_UN_SEARCH_USER = "UN_SEARCH_USER"


export const doOnSearchUser = () => {
    return {
        type: IS_SEARCH_USER
    }
}
export const doUnSearchUser = () => {
    return {
        type: IS_UN_SEARCH_USER
    }
}
export const doOnSearch = () => {
    return {
        type: ON_SEARCH,
    };
};
export const doOffSearch = () => {
    return {
        type: OFF_SEARCH,
    };
};


export const doSignup = (data) => {
    return {
        type: CREATE_USER,
        payload: data
    };
};


export const doLogin = (data) => {
    return {
        type: LOGIN,
        payload: data
    }
}

export const doLogout = () => {
    return {
        type: LOGOUT,
    }
}