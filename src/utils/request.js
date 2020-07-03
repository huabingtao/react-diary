import axios from "axios";
import Qs from "qs";
import { Toast } from "antd-mobile";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/"
    : "http://apidiary.huabingtao.com/";

const instance = axios.create({
  baseURL,
  timeout: 15000,
});
// request 拦截
instance.interceptors.request.use(
  (config) => {
    if (config.method === "get") {
      config.paramsSerializer = (params) => {
        return Qs.stringify(params, { arrayFormat: "brackets" });
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response 拦截
instance.interceptors.response.use(
  (response) => {
    // 接口请求成功处理
    return response;
  },
  (error) => {
    // 提示给用户具体报错信息
    let errObj = JSON.parse(JSON.stringify(error));
    if (errObj.message === "Network Error") {
      Toast.fail("服务器异常请稍后再试", 2);
      return Promise.reject();
    }
    Toast.fail(error.response.data.message, 2);
    return Promise.reject(error);
  }
);

export default instance;
