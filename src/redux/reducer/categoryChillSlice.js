import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Tạo async thunk để lấy danh mục cha
export const GetCategoryChill = createAsyncThunk('category/getCateChill', async () => {
    try {
        const response = await fetch('http://192.168.211.1:3000/category/getCateChill');

        if (!response.ok) {
            const errorDetail = await response.text();
            console.error('Lỗi phản hồi:', errorDetail);
            throw new Error('Lấy danh mục thất bại');
        }

        return await response.json(); 
    } catch (error) {
        console.error('Lỗi fetch:', error);
        throw new Error('Đã xảy ra lỗi trong quá trình xử lý');
    }
});

export const categoryChillSlice = createSlice({
    name: 'categoryChill',
    initialState: {
        categoryChillData: [], 
        categoryChillStatus: 'idle',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(GetCategoryChill.pending, (state) => {
                state.categoryChillStatus = 'loading'; 
            })
            .addCase(GetCategoryChill.fulfilled, (state, action) => {
                state.categoryChillStatus = 'succeeded'; 
                state.categoryChillData = action.payload; 
            })
            .addCase(GetCategoryChill.rejected, (state, action) => {
                state.categoryChillStatus = 'failed'; 
                console.error('Lỗi lấy danh mục:', action.error.message); 
            });
    },
});

export default categoryChillSlice.reducer;
