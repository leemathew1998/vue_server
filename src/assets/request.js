import axios from "axios";
import * as qs from "qs";

const instance = axios.create({
    baseURL: 'http://1.15.125.141:3007/',
    timeout: 3000,
});

// 请求拦截
// qs 序列化 防止XSRF攻击 可以对深层次的json array进行序列化
instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截
instance.interceptors.response.use(
    (res) => {
        return res;
    },
    (err) => {

        return err;
    }
);

export default instance;
