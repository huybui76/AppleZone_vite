import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:3001/api/',
    withCredentials: false,
    headers: {
        'Content-type': 'application/json',
    },


});

axiosClient.interceptors.request.use(function (config) {
    return config;
});

axiosClient.interceptors.response.use(function (response) {
    return response.data;
});

export default axiosClient;