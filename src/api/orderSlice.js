import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../hooks/http.hook";


const orderAdapter = createEntityAdapter();

const initialState = orderAdapter.getInitialState({
    orderingLoadingStatus: 'idle',
});


export const fetchClientOrders = createAsyncThunk(
    'products/fetchClientOrders',
     async (id) => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/my_orders/${id}/`, 'GET')
    }
)


const orderingSlice = createSlice({
    name: 'getOrdering',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchClientOrders.pending, state => {
                state.o = 'loading';
            })
            .addCase(fetchClientOrders.fulfilled, (state) => {
                state.orderingLoadingStatus = 'success';
            })
            .addCase(fetchClientOrders.rejected, state => {state.orderingLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
})

const {reducer} = orderingSlice;
export default reducer;
