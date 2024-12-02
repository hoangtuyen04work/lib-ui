

import { combineReducers } from 'redux';
import userReducer from './userReducer'; // Import userReducer

const rootReducer = combineReducers({
    user: userReducer, // Thêm userReducer vào rootReducer
});

export default rootReducer;