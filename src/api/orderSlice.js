import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../hooks/http.hook";


const orderAdapter = createEntityAdapter();

const initialState = orderAdapter.getInitialState({
    orderingLoadingStatus: 'idle',
});


export const fetchOrder = createAsyncThunk(
    'products/fetchOrder',
     async (data) => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/ordering/${data.client}/`)
    }
)


const orderingSlice = createSlice({
    name: 'getOrdering',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchOrder.pending, state => {
                state.o = 'loading';
            })
            .addCase(fetchOrder.fulfilled, (state) => {
                state.orderingLoadingStatus = 'success';
            })
            .addCase(fetchOrder.rejected, state => {state.orderingLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
})

const {reducer} = orderingSlice;
export default reducer;
