import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";

const orderAdapter = createEntityAdapter();

const initialState = orderAdapter.getInitialState({
    ordersLoadingStatus: 'idle',
    statuses: [],
    changeOrderStatus: null,
    activeFilter: 0,
    deliveryLoadingStatus: null
});


export const fetchOrders = createAsyncThunk(
    'orders/fetchClientOrders',
     async () => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/get_orders/`)
    }
)

export const fetchStatuses = createAsyncThunk(
    'orders/fetchStatuses',
    async () => {
        const {request} = useHttp();
        return await request(`http://localhost:8000/statuses/`)
    }
)

export const fetchChangeOrderStatus = createAsyncThunk(
    'orders/fetchChangeOrderStatus',
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

export const fetchCreateDelivery = createAsyncThunk(
    'orders/fetchCreateDelivery',
    async (value) => {
        const {request} = useHttp();
        return await request(`http://localhost:8000/create_delivery/`, 'POST', value)
    }
)
// "id": value.id,
//     "type": "standard",
//     "matter": "Кофе",
//     "total_weight_kg": total_weight / 1000,
//     "points": [
//     {"address": "Москва, Бориса Галушкина 9", "contact_person": {"phone": "89519504886"}},
//     {"address": value.address, "contact_person": {"phone": value.phone, "name": value.client}}
// ],

export const fetchIncomes = createAsyncThunk(
    'orders/fetchIncomes',
    async () => {
        const {request} = useHttp();
        return await request(`http://localhost:8000/incomes/`)
    }
)

export const fetchProductCount = createAsyncThunk(
    'orders/fetchProductCount',
    async () => {
        const {request} = useHttp();
        return await request(`http://localhost:8000/product_count/`)
    }
)

export const fetchPayment= createAsyncThunk(
    'orders/fetchPayment',
    async (value) => {
        let response = await fetch(
            'https://securepay.tinkoff.ru/v2/Init', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(value)
            });
        let data = await response.json();
        if (data.Success === true) {
            return data
            // PaymentURL
        } else {
            alert('Что-то пошло не так!')
        }

    }
)

export const fetchPaymentHash = createAsyncThunk(
    'orders/fetchPaymentHash',
    async (PaymentId) => {
        const {request} = useHttp();
        return await request(`http://localhost:8000/payment/`, 'POST', {PaymentId})
        // const myBitArray = sjcl.hash.sha256.hash(token)
        // const myHash = sjcl.codec.hex.fromBits(myBitArray)
        // const body = {
        //     "TerminalKey" : "1685608375285DEMO",
        //     "PaymentId" : `${PaymentId}`,
        //     "Token" : `${myHash}`
        // }
        // console.log(body)
        // let response = await fetch(
        //     'https://securepay.tinkoff.ru/v2/GetState', {
        //         method: 'POST',
        //         headers: {'Content-Type': 'application/json'},
        //         body: JSON.stringify(body)
        //     })
        // let data = await response.json();
        // if (data.Success === true) {;
        //     return data
        //     // PaymentURL
        // } else {
        //     alert('Что-то пошло не так!')
        // }

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
            .addCase(fetchCreateDelivery.fulfilled, (state, action) => {
                state.deliveryLoadingStatus = 'success'
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