import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../hooks/http.hook";


const pruductAdapter = createEntityAdapter();

const initialState = pruductAdapter.getInitialState({
    productLoadingStatus: 'idle',
});


export const fetchProduct = createAsyncThunk(
    'products/fetchProduct',
     async (id) => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/products/${id}/`)
    }
)

export const fetchWeight = createAsyncThunk(
    'products/fetchWeight',
     async (id) => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/weight_selection/${id}/`)
    }
)

export const fetchRoastingMethod = createAsyncThunk(
    'products/fetchRoastingMethod',
     async (id) => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/roasting/${id}/`)
    }
)

export const fetchProcessingMethod = createAsyncThunk(
    'products/fetchProcessingMethod',
     async (id) => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/processing/${id}/`)
    }
)

export const fetchVariety = createAsyncThunk(
    'products/fetchVariety',
     async (id) => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/variety/${id}/`)
    }
)

export const fetchFavorite = createAsyncThunk(
    'products/fetchFavorite',
     async (id) => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/favorite/${id}/`)
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
            })
            .addCase(fetchWeight.pending, state => {
                state.productLoadingStatus = 'loading';
            })
            .addCase(fetchWeight.fulfilled, (state, action) => {
                state.productLoadingStatus = 'success';
            })
            .addCase(fetchWeight.rejected, state => {state.productLoadingStatus = 'error'})
            .addCase(fetchProduct.rejected, state => {state.productLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
})

const {reducer} = productSlice;
export default reducer;
