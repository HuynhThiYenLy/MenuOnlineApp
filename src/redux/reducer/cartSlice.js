import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const GetCart = createAsyncThunk('cart/getCartByUserID', async (userID) => {
    try {
        const response = await fetch(`http://192.168.211.1:3000/cart/getCartByUserID/${userID}`);

        if (!response.ok) {
            const errorDetail = await response.text();
            console.error('Lỗi phản hồi:', errorDetail);
            throw new Error('Lấy giỏ hàng thất bại');
        }

        return await response.json();
    } catch (error) {
        console.error('Lỗi fetch:', error);
        throw new Error('Đã xảy ra lỗi trong quá trình xử lý');
    }
});

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartData: [],
        cartStatus: 'idle',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(GetCart.pending, (state) => {
                state.cartStatus = 'loading';
            })
            .addCase(GetCart.fulfilled, (state, action) => {
                state.cartStatus = 'succeeded';
                state.cartData = action.payload;
            })
            .addCase(GetCart.rejected, (state, action) => {
                state.cartStatus = 'failed';
                console.error('Lỗi lấy danh mục:', action.error.message);
            });
    },
});

export default cartSlice.reducer;
