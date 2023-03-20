import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../hooks/http.hook";


const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
    // selectId: (user) => user.user_id,
    userAuthLoadingStatus: 'idle',
    user: null,
    client: null
});


export const fetchLogin = createAsyncThunk(
    'users/fetchLogin',
     async (values) => {
         const {request} = useHttp();
         return await request('http://localhost:8000/login/', 'POST', {
                username: values.username,
                password: values.password
            })
    }
)

export const fetchAuth = createAsyncThunk(
    'users/fetchAuth',
    async () => {
        const {request} = useHttp();
        return await request('http://localhost:8000/authUser/');
    }
)

export const fetchClient = createAsyncThunk(
    'users/fetchClient',
    async () => {
        const {request} = useHttp();
        return await request('http://localhost:8000/account/');
    }
)

const userSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        activeUserChange: (state, action) => {
            state.user = action.payload;
        },
        activeClientChange: (state, action) => {
            state.client = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAuth.pending, state => {
                state.userAuthLoadingStatus = 'loading';
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.userAuthLoadingStatus = 'idle';
                state.user = action.payload;
            })
            .addCase(fetchAuth.rejected, state => {state.userAuthLoadingStatus = 'error'})
            .addCase(fetchClient.pending, state => {
                state.userAuthLoadingStatus = 'loading';
            })
            .addCase(fetchClient.fulfilled, (state, action) => {
                state.client = action.payload
            })
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = userSlice;
export default reducer;
export const {selectAll} = userAdapter.getSelectors(state => state.authUser)

export const {
    activeUserChange,
    activeClientChange
} = actions;