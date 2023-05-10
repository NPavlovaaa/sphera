import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../hooks/http.hook";


const orderAdapter = createEntityAdapter();

const initialState = orderAdapter.getInitialState({
    ordersLoadingStatus: 'idle',
    statuses: null,
    changeOrderStatus: null,
    activeFilter: 0
});


export const fetchOrders = createAsyncThunk(
    'products/fetchClientOrders',
     async () => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/get_orders/`)
    }
)

export const fetchStatuses = createAsyncThunk(
    'products/fetchStatuses',
    async () => {
        const {request} = useHttp();
        return await request(`http://localhost:8000/statuses/`)
    }
)

export const fetchChangeOrderStatus = createAsyncThunk(
    'products/fetchChangeOrderStatus',
    async (data) => {
        const {request} = useHttp();
        return await request(`http://localhost:8000/orders/${data.id}/`, 'PUT',{
            'status': data.status,
            'delivery_date': data.delivery_date,
            'order_sum': data.order_sum,
            'delivery': data.delivery,
            'address': data.address,
        })
    }
)


const orderingSlice = createSlice({
    name: 'getOrders',
    initialState,
    reducers: {
        activeFilterStatusChange: (state, action) => {
            state.activeFilter = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchOrders.pending, state => {
                state.ordersLoadingStatus = 'loading';
            })
            .addCase(fetchOrders.fulfilled, (state) => {
                state.ordersLoadingStatus = 'success';
            })
            .addCase(fetchStatuses.fulfilled, (state, action) => {
                state.statuses = action.payload;
            })
            .addCase(fetchChangeOrderStatus.fulfilled, (state, action) => {
                state.changeOrderStatus = action.payload;
            })
            .addCase(fetchOrders.rejected, state => {state.ordersLoadingStatus = 'error'})
            .addCase(fetchChangeOrderStatus.rejected, state => {state.changeOrderStatus = 'error'})

            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = orderingSlice;
export default reducer;
export const {
    activeFilterStatusChange,
} = actions;