import React, {useEffect, useMemo, useState} from 'react';
import {Button, CircularProgress, TextField} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {setPosts, setPostsByLimit} from '../../store/slicies/postsSlice';
import {postsApi} from '../../api/api';
import {RootState} from '../../store/store';

export const HomePage = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state: RootState) => state.posts);
    const [getPosts, {isFetching: postsLoading}] = postsApi.endpoints.posts.useLazyQuery();
    const [getPostsByLimit, {isFetching: postsByLimitLoading}] = postsApi.endpoints.postsByLimit.useLazyQuery();

    const [start, setStart] = useState(0);
    const [limit, setLimit] = useState(10);

    const loading = postsLoading || postsByLimitLoading;

    const fetchPosts = async (start: number) => {
        const {data = []} = await getPosts({start: start * limit, limit});
        dispatch(setPosts(data));
        setStart(start);
    };

    const fetchByLimit = async (limit: number) => {
        const {data = []} = await getPostsByLimit(limit);
        dispatch(setPostsByLimit(data));
    };

    const paginationHandle = async () => {
        await fetchPosts(start + 1);
    };

    const limitTagHandle = (lim: number) => async () => {
        setLimit(lim);
        setStart(0);
        await fetchByLimit(lim);
    };

    useEffect(() => {
        fetchPosts(0);
    }, []);

    return (
        <div>
            {posts.map((post) => {
                const {userId, id, title, body} = post;
                return (
                    <div key={id}>
                        {/*<div>{userId}</div>*/}
                        <div>{id}</div>
                        <div>{title}</div>
                        <div>{body}</div>
                    </div>
                );
            })}
            {loading
                ? <CircularProgress/>
                : <Button onClick={paginationHandle}>click</Button>
            }
            <Button onClick={limitTagHandle(10)}>10</Button>
            <Button onClick={limitTagHandle(20)}>20</Button>
            <Button onClick={limitTagHandle(50)}>50</Button>
        </div>
    );
};
