import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Tạo một action async để tìm kiếm sản phẩm
export const SearchProduct = createAsyncThunk('product/search', async (name, thunkAPI) => {
    try {
        const response = await fetch(
            `http://192.168.211.1:3000/product/search/${name}`, // Endpoint không cần param name trong URL
            {
                method: 'POST', // Sử dụng method POST để truy vấn sản phẩm
                headers: {
                    'Content-Type': 'application/json', // Thiết lập headers
                },
                body: JSON.stringify({ name }) // Gửi dữ liệu name trong body của yêu cầu
            }
        );
        if (!response.ok) {
            const errorDetail = await response.text(); // Lấy chi tiết lỗi từ response
            throw new Error(`Tìm sản phẩm thất bại: ${errorDetail}`);
        }
        return await response.json(); // Trả về dữ liệu sản phẩm từ server
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message); // Trả về lỗi
    }
});

// Khởi tạo slice cho search
export const searchSlice = createSlice({
    name: 'search', // Tên của slice là 'search'
    initialState: {
        searchData: [], // Dữ liệu kết quả tìm kiếm ban đầu là mảng rỗng
        searchStatus: 'idle', // Trạng thái ban đầu là 'idle' (chưa thực hiện tìm kiếm)
        searchError: null, // Khởi tạo giá trị lỗi là null
    },
    reducers: {}, // Không có reducers địa phương trong slice này
    extraReducers: (builder) => {
        builder
            .addCase(SearchProduct.pending, (state, action) => {
                state.searchStatus = 'loading'; // Khi action pending, chuyển trạng thái sang 'loading'
                state.searchError = null; // Reset lỗi
            })
            .addCase(SearchProduct.fulfilled, (state, action) => {
                state.searchStatus = 'succeeded'; // Khi action thành công, chuyển trạng thái sang 'succeeded'
                state.searchData = action.payload; // Lưu dữ liệu kết quả tìm kiếm vào trong state
            })
            .addCase(SearchProduct.rejected, (state, action) => {
                state.searchStatus = 'failed'; // Khi action bị reject, chuyển trạng thái sang 'failed'
                state.searchError = action.payload; // Lưu lỗi vào state
                console.error('Lỗi khi tìm kiếm sản phẩm:', action.payload); // Log lỗi ra console
            });
    },
});

export default searchSlice.reducer; // Xuất reducer của slice search
