import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
    reducerPath: '',
    baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:8000'}),
    tagTypes: ['Users'],
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

    })
})

export const {  useGetUsersQuery,
                useCreateUserMutation,
                useCreateClientMutation,
} = apiSlice;