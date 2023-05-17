import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
    reducerPath: '',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().authUser.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
                return headers
            }
        },
    }),
    tagTypes: ['Users', 'Clients', 'Products', 'Orders'],
    endpoints: builder => ({
        registration: builder.mutation({
            query: client => ({
                url: '/registration/',
                method: 'POST',
                body: client,
            }),
            invalidatesTags: ['Users', 'Clients']
        }),
        getUsers: builder.query({
            query: () => '/users/',
            providesTags: ['Users']
        }),
        getProducts: builder.query({
            query: () => '/products/',
            providesTags: ['Products']
        }),
        getProductsItem: builder.query({
            query: (id) => `products/${id}/`,
            providesTags: ['Products']
        }),
        addCart: builder.mutation({
            query: cart => ({
                url: '/cart_addition/',
                method: 'POST',
                body: cart
            }),
            invalidatesTags: ['Clients']
        }),
        getCart: builder.query({
            query: (id) => `cart/${id}/`,
            providesTags: ['Clients']
        }),
        getProductCart: builder.query({
            query: ({product, weight_selection}) => `product_cart/${product}/${weight_selection}/`,
            providesTags: ['Clients']
        }),
        addFavorite: builder.mutation({
            query: favorite => ({
                url: '/create_favorite/',
                method: 'POST',
                body: favorite
            }),
            invalidatesTags: ['Clients']
        }),
        getFavorites: builder.query({
            query: () => '/favorites/',
            providesTags: ['Products']
        }),
        getDetailFavorite: builder.query({
            query: (id) => `/favorite_detail/${id}/`,
            providesTags: ['Products']
        }),
        getProductVarieties: builder.query({
            query: () => `/product_varieties/`,
            providesTags: ['Products']
        }),
        getDeliveryMethods: builder.query({
            query: () => '/delivery_methods/',
            providesTags: ['Orders']
        }),
        createOrder: builder.mutation({
            query: body => ({
                url: `/create_order/`,
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Orders']
        }),
    })
})

export const {  useGetUsersQuery,
                useRegistrationMutation,
                useGetProductsQuery,
                useAddCartMutation,
                useGetDeliveryMethodsQuery,
                useCreateOrderMutation,
                useAddFavoriteMutation,
                useGetFavoritesQuery,
                useGetDetailFavoriteQuery,
                useGetProductVarietiesQuery
} = apiSlice;