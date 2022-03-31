import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PostsType} from '../../types';

const initialState: PostsType[] = []

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<PostsType[]>) => {
            return [...state, ...action.payload]
        },
        setPostsByLimit: (_, action: PayloadAction<PostsType[]>) => {
            return action.payload
        }
    }
})

export const {setPosts, setPostsByLimit} = postsSlice.actions

export default postsSlice.reducer