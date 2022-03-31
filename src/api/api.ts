import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {PostsType} from '../types';

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({baseUrl: `https://jsonplaceholder.typicode.com`}),
    endpoints: (builder) => ({
        posts: builder.query<PostsType[], { start: number, limit: number }>({
            query: ({start, limit}) => `/posts?_start=${start}&_limit=${limit}`
        }),

        postsByLimit: builder.query<PostsType[], number>({
            query: (limit) => `/posts?_start=0&_limit=${limit}`
        })
    })
});

export const {usePostsQuery} = postsApi;