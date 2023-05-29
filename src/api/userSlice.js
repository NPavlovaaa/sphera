import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../hooks/http.hook";


const userAdapter = createEntityAdapter();

const token = localStorage.getItem('TOKEN_AUTH') ? localStorage.getItem('TOKEN_AUTH') : null

const initialState = userAdapter.getInitialState({
    userAuthLoadingStatus: 'idle',
    user: null,
    role: null,
    client: null,
    level: null,
    token
});

export const fetchLogin = createAsyncThunk(
    'users/fetchLogin',
    async (data) => {
        const {request} = useHttp();
        return await request('http://localhost:8000/auth/jwt/create/', 'POST', {
            username: data.username,
            password: data.password,
        })
    }
)

export const fetchAuth = createAsyncThunk(
    'users/fetchAuth',
    async () => {
        const {request} = useHttp();
        return await request('http://localhost:8000/login/')
    }
)

export const fetchAchievements = createAsyncThunk(
    'users/fetchAchievements',
    async () => {
        const {request} = useHttp();
        return await request('http://localhost:8000/achievements/')
    }
)

const userSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        activeUserChange: (state, action) => {
            state.user = action.payload;
            state.role = action.payload;
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
                state.token = action.payload.access;

            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.userAuthLoadingStatus = 'success';
                state.user = action.payload.user;
                state.role = action.payload.user.role;
                state.client = action.payload.client;
                state.level = action.payload.level;
            })
            .addCase(fetchLogin.rejected, state => {state.userAuthLoadingStatus = 'error'})
            .addCase(fetchAuth.rejected, state => {
                state.userAuthLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = userSlice;
export default reducer;

export const {
    activeUserChange,
} = actions;