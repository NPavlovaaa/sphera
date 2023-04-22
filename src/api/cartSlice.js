import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../hooks/http.hook";


const cartAdapter = createEntityAdapter();

const initialState = cartAdapter.getInitialState({
    cartLoadingStatus: 'idle',
});


export const fetchCart = createAsyncThunk(
    'products/fetchCart',
     async (id) => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/cart/${id}/`)
    }
)

export const fetchUpdateCart = createAsyncThunk(
    'products/fetchUpdateCart',
     async (data) => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/carts/${data.id}/`, 'PUT', {
            client: data.client,
            weight_selection: data.weight_selection,
            product_count: data.product_count
     })
})


const productSlice = createSlice({
    name: 'getCart',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCart.pending, state => {
                state.cartLoadingStatus = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state) => {
                state.cartLoadingStatus = 'success';
            })
            .addCase(fetchCart.rejected, state => {state.cartLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
})

const {reducer} = productSlice;
export default reducer;
