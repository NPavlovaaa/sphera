import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";


const reviewAdapter = createEntityAdapter();

const initialState = reviewAdapter.getInitialState({
    reviewLoadingStatus: 'idle',
});

export const fetchCreateReview = createAsyncThunk(
    'products/fetchCreateReview',
     async (values) => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/create_review/`, 'POST', {
             'review_text': values.review_text,
             'order': values.order,
             'delivery_assessment': values.delivery_assessment,
             'product_quality_assessment': values.delivery_assessment
         })
    }
)


const reviewSlice = createSlice({
    name: 'getReview',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCreateReview.pending, state => {
                state.reviewLoadingStatus = 'loading';
            })
            .addCase(fetchCreateReview.fulfilled, (state) => {
                state.reviewLoadingStatus = 'success';
            })
            .addCase(fetchCreateReview.rejected, state => {state.reviewLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
})

const {reducer} = reviewSlice;
export default reducer;
