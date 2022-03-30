import Axios from 'axios';

const getInstance = () => {
    return Axios.create({
        baseURL: `https://jsonplaceholder.typicode.com`
    });
};

export const postsApi = {

    getPosts: (page: number, per_page: number) => {
        return getInstance()
            .get(`/posts`, {params: {per_page, page}})
            .then((res) => res.data)
            .catch(({response}) => {
                throw response.data;
            });
    }
};
