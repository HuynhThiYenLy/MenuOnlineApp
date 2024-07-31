import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Tạo async thunk để lấy danh mục cha
export const GetProductAll = createAsyncThunk('product/getAll', async () => {
    try {
        const response = await fetch('http://192.168.211.1:3000/product/getAll');

        if (!response.ok) {
            const errorDetail = await response.text();
            console.error('Lỗi phản hồi:', errorDetail);
            throw new Error('Lấy sản phẩm thất bại');
        }

        return await response.json();
    } catch (error) {
        console.error('Lỗi fetch:', error);
        throw new Error('Đã xảy ra lỗi trong quá trình xử lý');
    }
});

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        productData: [],
        productStatus: 'idle',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(GetProductAll.pending, (state) => {
                state.productStatus = 'loading';
            })
            .addCase(GetProductAll.fulfilled, (state, action) => {
                state.productStatus = 'succeeded';
                state.productData = action.payload;
            })
            .addCase(GetProductAll.rejected, (state, action) => {
                state.productStatus = 'failed';
                console.error('Lỗi lấy danh mục:', action.error.message);
            });
    },
});

export default productSlice.reducer;
