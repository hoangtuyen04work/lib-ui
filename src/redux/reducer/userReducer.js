
import { CREATE_USER, IS_SEARCH_USER, IS_UN_SEARCH_USER, OFF_SEARCH, ON_SEARCH } from '../action/userAction'
import { LOGIN } from '../action/userAction'
import { LOGOUT } from '../action/userAction'


const INITIAL_STATE = {
    user: {
        token: '',
        userName: "",
        userId: '',
        roles: [],
        id: ''
    },
    isAuthenticated: false,
    isSearch: false,
    isSearchUser: true,
}


const userReducer = (state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case CREATE_USER:
            return {
                ...state,
                user: {
                    id: action?.payload?.info?.id,
                    token: action?.payload?.token,
                    userName: action?.payload?.info?.userName,
                    userId: action?.payload?.info?.userId ,
                    roles: action?.payload?.info?.roles
                },
                isAuthenticated : true
            }
        case LOGIN:
            return {
                ...state,
                user: {
                    id: action?.payload?.info?.id,
                    token: action?.payload?.token,
                    userName: action?.payload?.info?.userName,
                    userId: action?.payload?.info?.userId ,
                    roles: action?.payload?.info?.roles
                },
                isAuthenticated : true
            }
        case LOGOUT:
            return {
                ...state,
                user: {
                    id: "",
                    token: "",
                    userName: "",
                    userId: "",
                    role: ""
                },
                isAuthenticated : false
            }

        case ON_SEARCH: 
            return {
                ...state,
                isSearch: true
            }
        case OFF_SEARCH:
            return {
                ...state,
                isSearch: false
            }
        case IS_SEARCH_USER:
            return {
                ...state,
                isSearchUser: true
            }
        case IS_UN_SEARCH_USER:
            return {
                ...state,
                isSearchUser: false
            }
        default: return state;
    }
}

export default userReducer;