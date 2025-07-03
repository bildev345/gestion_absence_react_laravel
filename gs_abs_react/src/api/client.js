import axios from "axios";
import {logout} from '../features/auth/authAction';

let storeRef = null;
export const injectStore = (store) => {
    storeRef = store;
}
const client = axios.create({ baseURL : 'http://localhost:8000/api'});

client.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

client.interceptors.response.use(
    res => res,
    err => {
        const {status} = err.response || {};
        if (status === 401) {
            storeRef?.dispatch(logout());
            window.location.href = '/login';
        }
        if (status === 403) {
            window.location.href = '/unauthorized';
        }
        return Promise.reject(err);
    }
);

export default client;