import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";


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
         await fetch('http://localhost:8000/login/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                username: values.username,
                password: values.password
            })
        });
    }
)


// export const fetchAuth = async () => {
//     try {
//         const response = await fetch('http://localhost:8000/account/', {
//             headers: {'Content-Type': 'application/json'},
//             credentials: 'include',
//         });
//
//         if (response.ok) {
//             return await response.json();
//         } else {
//             throw new Error(`Error! status: ${response.status}`);
//         }
//     } catch (err) {
//         console.log(err);
//     }
// }

export const fetchAuth = createAsyncThunk(
    'users/fetchAuth',
    async () => {
        const response = await fetch('http://localhost:8000/authUser/', {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        return await response.json();
    }
)

export const fetchClient = createAsyncThunk(
    'users/fetchClient',
    async () => {
        const response = await fetch('http://localhost:8000/account/', {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        return await response.json();
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
            .addCase(fetchClient.fulfilled, (state, action) => {
                state.client = action.payload
            })
            .addCase(fetchAuth.rejected, state => {state.userAuthLoadingStatus = 'error'})
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