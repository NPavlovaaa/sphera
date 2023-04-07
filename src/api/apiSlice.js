import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
    reducerPath: '',
    baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:8000'}),
    tagTypes: ['Users', 'CLients', 'Products'],
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users/',
            providesTags: ['Users']
        }),
        createUser: builder.mutation({
            query: user => ({
                url: '/users/',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['Users']
        }),
        createClient: builder.mutation({
            query: client => ({
                url: '/clients/',
                method: 'POST',
                body: client
            }),
            invalidatesTags: ['Clients']
        }),
        getProducts: builder.query({
            query: () => '/products/',
            providesTags: ['Products']
        }),
        getRoastingMethods: builder.query({
            query: () => '/roasting/',
            providesTags: ['Products']
        }),
        getProcessingMethods: builder.query({
            query: () => '/processing/',
            providesTags: ['Products']
        }),
        getWeights: builder.query({
            query: () => '/weight/',
            providesTags: ['Products']
        }),
        getWeightSelection: builder.query({
            query: () => '/weight_selection/',
            providesTags: ['Products']
        }),
        getVariety: builder.query({
            query: () => '/variety/',
            providesTags: ['Products']
        }),
        getProductsItem: builder.query({
            query: (id) => `products/${id}/`,
            providesTags: ['Products']
        }),
        // getProductsItem: builder.query({
        //     query: id => ({
        //         url: `products/${id}`,
        //         providesTags: ['Products']
        //     }),
        // }),
    })
})

export const {  useGetUsersQuery,
                useCreateUserMutation,
                useCreateClientMutation,
                useGetProductsQuery,
                useGetRoastingMethodsQuery,
                useGetProcessingMethodsQuery,
                useGetWeightsQuery,
                useGetWeightSelectionQuery,
                useGetVarietyQuery,
                useGetProductsItemQuery
} = apiSlice;