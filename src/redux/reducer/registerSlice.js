import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const DangKyTaiKhoan = createAsyncThunk('user/register', async data => {
    try {
        const response = await fetch(
            'http://192.168.211.1:3000/user/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            },
        );
        if (!response.ok) {
            throw new Error('Đăng ký tài khoản thất bại');
        }
        return await response.json();
    } catch (error) {
        throw new Error('Đã xảy ra lỗi trong quá trình xử lý');
    }
});

export const registerSlice = createSlice({
    name: 'register',
    initialState: {
        registerData: {},
        registerStatus: 'idle',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(DangKyTaiKhoan.pending, (state, action) => {
                state.registerStatus = 'loading';
            })
            .addCase(DangKyTaiKhoan.fulfilled, (state, action) => {
                state.registerStatus = 'succeeded';
                state.registerData = action.payload;
            })
            .addCase(DangKyTaiKhoan.rejected, (state, action) => {
                state.registerStatus = 'failed';
                console.log(action.error.message);
            });
    },
});

export default registerSlice.reducer;