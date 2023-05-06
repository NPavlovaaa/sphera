import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../hooks/http.hook";


const orderAdapter = createEntityAdapter();

const initialState = orderAdapter.getInitialState({
    ordersLoadingStatus: 'idle',
    statuses: null,
    changeOrderStatus: 'idle'
});


export const fetchClientOrders = createAsyncThunk(
    'products/fetchClientOrders',
     async (id) => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/my_orders/${id}/`, 'GET')
    }
)

export const fetchAdminOrders = createAsyncThunk(
    'products/fetchAdminOrders',
     async (data) => {
        const {request} = useHttp();
        return await request(`http://localhost:8000/admin_orders/${data}/`)
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
    },
    extraReducers: builder => {
        builder
            .addCase(fetchClientOrders.pending, state => {
                state.ordersLoadingStatus = 'loading';
            })
            .addCase(fetchClientOrders.fulfilled, (state) => {
                state.ordersLoadingStatus = 'success';
            })
            .addCase(fetchStatuses.fulfilled, (state, action) => {
                state.statuses = action.payload;
            })
            .addCase(fetchChangeOrderStatus.fulfilled, (state, action) => {
                state.changeOrderStatus = 'success';
            })
            .addCase(fetchClientOrders.rejected, state => {state.ordersLoadingStatus = 'error'})
            .addCase(fetchChangeOrderStatus.rejected, state => {state.changeOrderStatus = 'error'})

            .addDefaultCase(() => {})
    }
})

const {reducer} = orderingSlice;
export default reducer;
