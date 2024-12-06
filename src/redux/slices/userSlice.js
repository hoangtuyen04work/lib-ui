import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../service/authService";

const initialState = {
  isAuthenticated: false,
  userInfo: null,
};

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await login(email, password);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateToken = createAsyncThunk(
  "user/updateToken",
  async ({ accessToken }, thunkAPI) => {
    return { accessToken };
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userInfo = action.payload.data;
      })
      .addCase(updateToken.fulfilled, (state, action) => {
        if (state.userInfo) {
          state.userInfo.accessToken = action.payload.accessToken;
        }
      });
  },
});

export default userSlice.reducer;
