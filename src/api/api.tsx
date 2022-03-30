import Axios from 'axios';

const getInstance = () => {
    return Axios.create({
        baseURL: `https://jsonplaceholder.typicode.com`
    });
};

export const postsApi = {

    getPosts: (_start: number, _limit: number) => {
        return getInstance()
            .get(`/posts`, {params: {_start, _limit}})
            .then((res) => res.data)
            .catch(({response}) => {
                throw response.data;
            });
    }
};
