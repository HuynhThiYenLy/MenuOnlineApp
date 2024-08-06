import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk để lấy thông tin người dùng theo ID
export const GetUserByID = createAsyncThunk('chiTietUser/getUserByID', async (userID) => {
    try {
        const response = await fetch(`http://192.168.211.1:3000/user/getUserByID/${userID}`);

        if (!response.ok) {
            const errorDetail = await response.text();
            console.error('Lỗi phản hồi:', errorDetail);
            throw new Error('Lấy chi tiết user thất bại');
        }

        return await response.json();
    } catch (error) {
        console.error('Lỗi fetch:', error);
        throw new Error('Đã xảy ra lỗi trong quá trình xử lý');
    }
});

export const chiTietUserSlice = createSlice({
    name: 'chiTietUser',
    initialState: {
        chiTietUserData: {},
        chiTietUserStatus: 'idle',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(GetUserByID.pending, (state) => {
                state.chiTietUserStatus = 'loading';
            })
            .addCase(GetUserByID.fulfilled, (state, action) => {
                state.chiTietUserStatus = 'succeeded';
                state.chiTietUserData = action.payload;
            })
            .addCase(GetUserByID.rejected, (state, action) => {
                state.chiTietUserStatus = 'failed';
                console.error('Lỗi lấy danh mục:', action.error.message);
            });
    },
});

export default chiTietUserSlice.reducer;
