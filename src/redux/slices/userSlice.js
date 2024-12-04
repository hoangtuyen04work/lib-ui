import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {login} from '../../service/authService'
const initialState = {
    userName: "",
    token: "",
    refreshToken: "",
    roles: []
}

// export const loginUser = createAsyncThunk(
//     'user/login',
//     async ({ email, password }, thunkAPI) => {
//         console.log("login >>", email, password);
//         const response = await login(email, password);
//         return response;
//     }
// )
export const loginUser = createAsyncThunk(
    'user/login',
    async ({ email, password }, thunkAPI) => {
        console.log("login >>", email, password);
        try {
            const response = await login(email, password);
            return response; // Nếu thành công, trả về dữ liệu
        } catch (error) {
            // Nếu có lỗi, ném ra lỗi để `rejected` có thể xử lý
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state, action) => {
                console.log("pedding");
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log("fulfield>>", action.payload);
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log("rejst");
            })
    }
})

export default userSlice.reducer

