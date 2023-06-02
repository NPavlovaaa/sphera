import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";


const productAdapter = createEntityAdapter();

const initialState = productAdapter.getInitialState({
    productLoadingStatus: 'idle',
    product: [],
    roasting: [],
    processing: [],
    variety: [],
    categories: [],
    activeFilterProcessing: null,
    activeFilterRoasting: null,
    activeFilterVariety: [],
    activeCategory: null,
    quantity: null,
    total_quantity: null,
    activeEditProduct: null
});

// export const fetchProductList = createAsyncThunk(
//     'products/fetchProductList',
//     async (offset) => {
//         const {request} = useHttp();
//         return await request(`http://localhost:8000/product_list/${offset}/`)
//     }
// )


export const fetchProductList = createAsyncThunk(
    'products/fetchProductList',
    async () => {
        const {request} = useHttp();
        return await request(`http://localhost:8000/products/`)
    }
)

export const fetchDeleteProduct = createAsyncThunk(
    'products/fetchDeleteProduct',
    async (id) => {
        const {request} = useHttp();
        return await request(`http://localhost:8000/products/${id}/`, 'DELETE')
    }
)


export const fetchProduct = createAsyncThunk(
    'products/fetchProduct',
     async (id) => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/products/${id}/`)
    }
)

export const fetchWeight = createAsyncThunk(
    'products/fetchWeight',
     async (id) => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/weight_selection/${id}/`)
    }
)

export const fetchRoastingMethod = createAsyncThunk(
    'products/fetchRoastingMethod',
     async (id) => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/roasting/${id}/`)
    }
)

export const fetchRoastingMethods = createAsyncThunk(
    'products/fetchRoastingMethods',
    async () => {
        const {request} = useHttp();
        return await request(`http://localhost:8000/roasting/`)
    }
)
export const fetchProcessingMethods = createAsyncThunk(
    'products/fetchProcessingMethods',
    async () => {
        const {request} = useHttp();
        return await request(`http://localhost:8000/processing/`)
    }
)

export const fetchProcessingMethod = createAsyncThunk(
    'products/fetchProcessingMethod',
     async (id) => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/processing/${id}/`)
    }
)

export const fetchVariety = createAsyncThunk(
    'products/fetchVariety',
    async () => {
        const {request} = useHttp();
        return await request(`http://localhost:8000/variety/`)
    }
)

export const fetchProductVariety = createAsyncThunk(
    'products/fetchProductVariety',
     async (id) => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/product_variety/${id}/`)
    }
)

export const fetchFavorite = createAsyncThunk(
    'products/fetchFavorite',
     async (id) => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/favorite_detail/${id}/`)
    }
)

export const fetchFavoriteList = createAsyncThunk(
    'products/fetchFavoriteList',
    async () => {
        const {request} = useHttp();
        return await request(`http://localhost:8000/favorites/`)
    }
)

export const fetchCategory = createAsyncThunk(
    'products/fetchCategory',
    async () => {
        const {request} = useHttp();
        return await request(`http://localhost:8000/categories/`)
    }
)

export const fetchProductMakingMethods = createAsyncThunk(
    'products/fetchProductMakingMethods',
    async (id) => {
        const {request} = useHttp();
        return await request(`http://localhost:8000/making_methods/${id}/`)
    }
)

export const fetchProductWarehouse = createAsyncThunk(
    'products/fetchProductWarehouse',
    async () => {
        const {request} = useHttp();
        return await request(`http://localhost:8000/product_warehouse/`)
    }
)

export const fetchProductConsumption = createAsyncThunk(
    'products/fetchProductConsumption',
    async (data) => {
        const {request} = useHttp();
        return await request(`http://localhost:8000/product_consumption/${data}/`)
    }
)

export const fetchProductCountChange = createAsyncThunk(
    'products/fetchProductCountChange',
    async (data) => {
        const {request} = useHttp();
        return await request(`http://localhost:8000/admin_product_change/`, 'POST',
            {
                'product': data.product,
                'count': data.count,
                'price': data.price,
                'action': data.action,
            })
    }
)

const productSlice = createSlice({
    name: 'getProduct',
    initialState,
    reducers: {
        activeFilterProcessingChange: (state, action) => {
            state.activeFilterProcessing = action.payload;
        },
        activeFilterRoastingChange: (state, action) => {
            state.activeFilterRoasting = action.payload;
        },
        activeFilterVarietyChange: (state, action) => {
            state.activeFilterVariety.push(action.payload);
        },
        activeCategoryChange: (state, action) => {
            state.activeCategory = action.payload;
        },
        editProduct: (state, action) => {
            state.activeEditProduct = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProduct.pending, state => {
                state.productLoadingStatus = 'loading';
            })
            .addCase(fetchProductList.pending, state => {
                state.productLoadingStatus = 'loading';
            })
            .addCase(fetchProductList.fulfilled, state => {
                state.productLoadingStatus = 'success';
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.productLoadingStatus = 'success';
                state.product = action.payload;
            })
            .addCase(fetchFavorite.fulfilled, state => {
                state.productLoadingStatus = 'success';
            })
            .addCase(fetchFavoriteList.pending, state => {
                state.productLoadingStatus = 'loading';
            })
            .addCase(fetchFavoriteList.fulfilled, state => {
                state.productLoadingStatus = 'success';
            })
            .addCase(fetchRoastingMethods.fulfilled, (state, action) => {
                state.roasting = action.payload;
            })
            .addCase(fetchProcessingMethods.fulfilled, (state, action) => {
                state.processing = action.payload;
            })
            .addCase(fetchVariety.fulfilled, (state, action) => {
                state.variety = action.payload;
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(fetchProductConsumption.fulfilled, (state, action) => {
                state.quantity = action.payload.quantity;
                state.productLoadingStatus = 'success';
            })
            .addCase(fetchProductCountChange.fulfilled, (state, action) => {
                state.quantity = action.payload.quantity;
                state.productLoadingStatus = 'success change';
            })
            .addCase(fetchDeleteProduct.fulfilled, (state) => {
                state.productLoadingStatus = 'success deleted';
            })
            .addCase(fetchProductWarehouse.fulfilled, (state, action) => {
                state.productLoadingStatus = 'success';
                let arr = action.payload
                if(!state.total_quantity){
                    arr.map(item => {
                        state.total_quantity += item.quantity;
                    })
                }
            })
            .addCase(fetchWeight.rejected, state => {state.productLoadingStatus = 'error'})
            .addCase(fetchProduct.rejected, state => {state.productLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = productSlice;
export default reducer;
export const {
    activeFilterProcessingChange,
    activeFilterRoastingChange,
    activeFilterVarietyChange,
    activeCategoryChange,
    editProduct
} = actions;