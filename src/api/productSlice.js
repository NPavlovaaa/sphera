import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../hooks/http.hook";


const pruductAdapter = createEntityAdapter();

const initialState = pruductAdapter.getInitialState({
    // selectId: (user) => user.user_id,
    productLoadingStatus: 'idle',
    product: null,
});


export const fetchProduct = createAsyncThunk(
    'products/fetchProduct',
     async (id) => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/products/${id}/`)
    }
)



const productSlice = createSlice({
    name: 'getProduct',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProduct.pending, state => {
                state.productLoadingStatus = 'loading';
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.productLoadingStatus = 'idle';
                state.product = action.payload;
            })
            .addCase(fetchProduct.rejected, state => {state.productLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
})

const {reducer} = productSlice;
export default reducer;
