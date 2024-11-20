/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/**
        |--------------------------------------------------
        | 封装的异步请求函数
        |--------------------------------------------------
        */
import axios from "axios";
import config from "./config";


let ROOT_URL = "";


if (process.env.NODE_ENV === "development") {
    ROOT_URL = config.development;
} else {
    ROOT_URL = config.product;
}

const newRequest = (url: string, params: any, method: 'post' | 'get' | 'put' | 'delete', onError: any,) =>
    new Promise((resolve) => {



        let postData = {};

        let requireUrl: string = ""

        requireUrl = ROOT_URL + url;




        let tokens = localStorage.token ? JSON.stringify(localStorage.token) : ''
        postData = {
            url: requireUrl,
            method,
            timeout: 60000,
            withCredentials: false,
            headers: {
                "Authorization": tokens,
                "Access-Control-Allow-Origin": "*"
            },
            ...params
        };
        type res = {
            data: any,
            status: any
        }
        axios(postData)
            .then(({ data, status }: res) => {
                const codes = status

                const { code, msg, user } = data;


                if (code == 200 && user == null) {

                    localStorage.user = "";

                    msg == '' ? '' : ''

                    localStorage.token = ""

                } else if (code == 680) {
                    // http代码结果为680需要的操作
                } else if (codes == 403) {

                    // http代码结果为403需要的操作

                }

                resolve(data);
            })
            .catch(error => {

                if (error.response.status === 403) {
                    // http代码结果为403需要的操作

                } else {

                }
                onError && onError(error);

            });
    });
const request = ({ url = "", param = {}, method = "get", onError = () => { } }) => {




    const Method = method.toLowerCase();
    if (Method === "post") {

        // console.log("post", param);
        return newRequest(url, { data: param }, "post", onError,);
    }
    if (Method === "put") {
        return newRequest(url, { data: param }, "put", onError,);
    }
    if (Method === "delete") {
        return newRequest(url, { params: param }, "delete", onError,);
    }
    return newRequest(url, { params: param }, "get", onError,); // 默认 Get 请求
};

request.get = (url: string, param: any, onError: any,) =>
    request({ method: "get", url, param, onError, });
request.post = (url: string, param: any, onError: any,) =>
    request({ method: "post", url, param, onError, });
request.put = (url: string, param: any, onError: any,) =>
    request({ method: "put", url, param, onError, });
request.delete = (url: string, param: any, onError: any,) =>
    request({ method: "delete", url, param, onError, });

export default request;