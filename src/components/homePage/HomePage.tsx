import React, {useEffect, useState} from 'react';
import {postsApi} from '../../api/api';
import {Button} from '@mui/material';
import {PostsType} from '../../types';


export const HomePage = () => {

    const [start, setStart] = useState(0);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);

    const [posts, setPosts] = useState<PostsType[]>([]);

    const fetchPosts = async (start: number) => {
        const data = await postsApi.getPosts(start * limit, limit);
        setPosts([...posts, ...data]);
        setStart(start);
    };

    const fetchByLimit = async (limit: number) => {
        const data = await postsApi.getPosts(0, limit);
        setPosts(data);
    };

    const paginationHandle = async () => {
        await fetchPosts(start + 1);
    };

    const limitTagHandle = async (lim: number) => {
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
            <Button onClick={paginationHandle}>click</Button>
            <Button onClick={() => limitTagHandle(10)}>10</Button>
            <Button onClick={() => limitTagHandle(20)}>20</Button>
            <Button onClick={() => limitTagHandle(50)}>50</Button>
        </div>
    );
};
