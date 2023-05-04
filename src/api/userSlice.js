import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../hooks/http.hook";


const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
    userAuthLoadingStatus: 'idle',
    user: null,
    role: null,
    client: null,
    level: null,
});

export const fetchLogin = createAsyncThunk(
    'users/fetchLogin',
     async (values) => {
         const {request} = useHttp();
         await request('http://localhost:8000/login/', 'POST', {
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
            .addCase(fetchAuth.pending, state => {
                state.userAuthLoadingStatus = 'loading';
            })
            .addCase(fetchLogin.fulfilled, (state) => {
                state.userAuthLoadingStatus = 'login success';
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.userAuthLoadingStatus = 'success';
                state.user = action.payload.user;
                state.role = action.payload.user.role;
                state.client = action.payload.client;
                state.level = action.payload.level;
            })
            .addCase(fetchLogin.rejected, state => {state.userAuthLoadingStatus = 'error'})
            .addCase(fetchAuth.rejected, state => {state.userAuthLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = userSlice;
export default reducer;

export const {
    activeUserChange,
    activeClientChange
} = actions;