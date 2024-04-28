import axios from "axios";
import { error } from "./message";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOST}/verification`,
  timeout: 1000 * 30,
});

// Alter defaults after instance has been created
instance.defaults.headers.post["Content-Type"] = "application/json";

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // 1.从缓存中获取到token,这里的Authorization时登录时你给用户设置token的键值
    let authorization = localStorage.getItem("xcAuthorization");
    // 2.如果token不为null，那么设置到请求头中，此处哪怕为null，我们也不进行处理，因为后台会进行拦截
    if (authorization) {
      //后台给登录用户设置的token的键时什么，headers['''']里的键也应该保持一致
      config.headers["Authorization"] = authorization;
    }
    return config;
  },
  async (error) => {
    // Do something with request error
    return await Promise.reject(error);
  }
);

const errorHandle = (status: number, other: string): void => {
  switch (status) {
    case 400:
      error(other);
      break;

    default:
      console.log(status, other);
      error(`${status}: ${other}`);
  }
};

// Add a response interceptor
instance.interceptors.response.use(
  async (response) => {
    // Do something with response data
    if (response.status === 200) {
      return response;
    } else {
      return await Promise.reject(response);
    }
  },
  async (error) => {
    // Do something with response error
    // error code message
    errorHandle(
      error.response.status as number,
      error.response.data.message as string
    );
    return await Promise.reject(error);
  }
);

export default instance;
