import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
    reducerPath: '',
    baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:8000'}),
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
            query: ({product, client, weight_selection}) => `product_cart/${product}/${client}/${weight_selection}/`,
            providesTags: ['Clients']
        }),
        addFavorite: builder.mutation({
            query: favorite => ({
                url: '/favorites/',
                method: 'POST',
                body: favorite
            }),
            invalidatesTags: ['Clients']
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
                useGetProductsItemQuery,
                useAddCartMutation,
                useGetCartQuery,
                useGetProductCartQuery,
                useAddFavoriteMutation,
                useGetDeliveryMethodsQuery,
                useCreateOrderMutation,
                getClientOrder
} = apiSlice;