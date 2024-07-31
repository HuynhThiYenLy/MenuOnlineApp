import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const DangNhapTaiKhoan = createAsyncThunk('user/login', async data => {
    try {
        const response = await fetch(
            'http://192.168.211.1:3000/user/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            },
        );
        if (!response.ok) {
            throw new Error('Đăng nhập tài khoản thất bại');
        }
        return await response.json();
    } catch (error) {
        throw new Error('Đã xảy ra lỗi trong quá trình xử lý');
    }
});

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loginData: {},
        loginStatus: 'idle',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(DangNhapTaiKhoan.pending, (state, action) => {
                state.loginStatus = 'loading';
            })
            .addCase(DangNhapTaiKhoan.fulfilled, (state, action) => {
                state.loginStatus = 'succeeded';
                state.loginData = action.payload;
            })
            .addCase(DangNhapTaiKhoan.rejected, (state, action) => {
                state.loginStatus = 'failed';
                console.log(action.error.message);
            });
    },
});

export default loginSlice.reducer;