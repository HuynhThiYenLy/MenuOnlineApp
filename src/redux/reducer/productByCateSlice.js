import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const GetProductByCate = createAsyncThunk('product/getProductByCate', async (categoryID) => {
    try {
        const response = await fetch(`http://192.168.211.1:3000/product/getProductByCate/${categoryID}`);

        if (!response.ok) {
            const errorDetail = await response.text();
            console.error('Lỗi phản hồi:', errorDetail);
            throw new Error('Lấy sản phẩm theo danh mục thất bại');
        }

        return await response.json();
    } catch (error) {
        console.error('Lỗi fetch:', error);
        throw new Error('Đã xảy ra lỗi trong quá trình xử lý');
    }
});

export const productByCateSlice = createSlice({
    name: 'productByCate',
    initialState: {
        productByCateData: [],
        productByCateStatus: 'idle',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(GetProductByCate.pending, (state) => {
                state.productByCateStatus = 'loading';
            })
            .addCase(GetProductByCate.fulfilled, (state, action) => {
                state.productByCateStatus = 'succeeded';
                state.productByCateData = action.payload;
            })
            .addCase(GetProductByCate.rejected, (state, action) => {
                state.productByCateStatus = 'failed';
                console.error('Lỗi lấy danh mục:', action.error.message);
            });
    },
});

export default productByCateSlice.reducer;
