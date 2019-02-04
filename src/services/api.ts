import axios from 'axios';
import config from '@/config';
export default {
    post(url: String, postobj: any) {
        const axiosConfig = {
            headers: {
                token: window.localStorage.getItem('token')
            }
        };
        return axios.post(config.api + url, postobj, axiosConfig);
    },
    get(url: String) {
        const axiosConfig = {
            headers: {
                token: window.localStorage.getItem('token')
            }
        };
        return axios.get(config.api + url, axiosConfig);
    }
};
