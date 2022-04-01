import React, {useEffect, useMemo, useState} from 'react';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    Grid, Skeleton,
    TextField, ToggleButton, ToggleButtonGroup, Toolbar
} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {setPosts, setPostsByLimit} from '../../store/slicies/postsSlice';
import {postsApi} from '../../api/api';
import {RootState} from '../../store/store';
import {useStyles} from './useStyles';
import {CustomCard} from '../customCard/CustomCard';

export const HomePage = () => {
    const dispatch = useDispatch();
    const storePosts = useSelector((state: RootState) => state.posts);
    const [getPosts, {isFetching: postsLoading}] = postsApi.endpoints.posts.useLazyQuery();
    const [getPostsByLimit, {isFetching: postsByLimitLoading}] = postsApi.endpoints.postsByLimit.useLazyQuery();

    const [start, setStart] = useState(0);
    const [limit, setLimit] = useState(10);

    const [searchText, setSearchText] = useState('');

    const [alignment, setAlignment] = useState<string | null>('left');

    const loading = postsLoading || postsByLimitLoading;

    const matchRegExp = new RegExp(searchText, 'i');

    const hasPosts = storePosts.length < 100;

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

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null
    ) => {
        setAlignment(newAlignment);
    };

    const skeletonList = Array.from({length: limit});

    const posts = useMemo(
        () => storePosts.filter(({title}) => (
            searchText !== ''
                ? Boolean(title.match(matchRegExp))
                : true
        )),
        [searchText, storePosts]
    );


    useEffect(() => {
        fetchPosts(0);
    }, []);


    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <TextField
                        type="text"
                        placeholder="Search..."
                        onChange={e => setSearchText(e.target.value)}
                    />
                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                    >
                        <ToggleButton
                            value="left"
                            aria-label="left aligned"
                            className="toggle-btn"
                            onClick={limitTagHandle(10)}
                        >
                            By 10
                        </ToggleButton>
                        <ToggleButton
                            value="center"
                            aria-label="centered"
                            className="toggle-btn"
                            onClick={limitTagHandle(20)}
                        >
                            By 20
                        </ToggleButton>
                        <ToggleButton
                            value="right"
                            aria-label="right aligned"
                            className="toggle-btn"
                            onClick={limitTagHandle(50)}
                        >
                            By 50
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Toolbar>
            </AppBar>
            <Grid container spacing={2} style={{marginTop: 100}}>
                {posts.map((post) => {
                    const {id} = post;
                    return (
                        <Grid item md={4} sm={6} xs={12} key={id}>
                            <CustomCard post={post}/>
                        </Grid>
                    );
                })}
                {loading && skeletonList.map((_, i) => (
                    <Grid item md={4} sm={6} xs={12} key={i}>
                       <div>
                           <Skeleton variant="rectangular" width={250} height={250}/>
                           <Skeleton width="150px"/>
                           <Skeleton width="100px"/>
                       </div>
                    </Grid>
                ))}
            </Grid>
            <div className="show-more">
                {loading
                    ? <CircularProgress/>
                    : (hasPosts && (
                        <Button
                            variant="contained"
                            onClick={paginationHandle}
                        >
                            Show more
                        </Button>
                    ))}
            </div>

        </Container>
    );
};
