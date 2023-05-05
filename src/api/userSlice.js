import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../hooks/http.hook";


const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
    userAuthLoadingStatus: 'idle',
    user: null,
    role: null,
    client: null,
    level: null,
    token: null
});

export const fetchLogin = createAsyncThunk(
    'users/fetchLogin',
     async (data) => {
        const {request} = useHttp();
        return await request('http://localhost:8000/login/', 'POST', {
                username: data.username,
                password: data.password,
                token: data.token
        })
    }
)

const userSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        activeUserChange: (state, action) => {
            state.user = action.payload;
            state.client = action.payload;
            state.userAuthLoadingStatus = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchLogin.pending, state => {
                state.userAuthLoadingStatus = 'loading';
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.userAuthLoadingStatus = 'login success';
                state.token = action.payload;
                state.user = action.payload.user;
                state.role = action.payload.user.role;
                state.client = action.payload.client;
                state.level = action.payload.level;
            })
            .addCase(fetchLogin.rejected, state => {state.userAuthLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = userSlice;
export default reducer;

export const {
    activeUserChange,
    activeClientChange
} = actions;