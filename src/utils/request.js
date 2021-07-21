import axios from "axios";
import router from "@/router";
import store from "@/store";
import qs from "qs";
import NProgress from "nprogress"; // 进度条
import {
  isFormData
} from "./index";
import {
  Message,
  Loading
} from "element-ui";

// 创建axios 实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000, // 请求超时时间
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
  },
});

// 请求loading，使用elemnt-ui的loading，loadingDelayTime是延迟显示时间
let loading;
let loadingTimer;
let loadingDelayTime = 1000;
let errorMsgStatus = true;

function showLoading() {
  clearTimeout(loadingTimer);
  loadingTimer = setTimeout(() => {
    loading = Loading.service({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
  }, loadingDelayTime);
}

function closeLoading() {
  if (loadingTimer) {
    clearTimeout(loadingTimer);
    loadingTimer = "";
  }
  if (loading) {
    loading.close();
    loading = "";
  }
}

// request 拦截器
service.interceptors.request.use(
  (config) => {
    // 这里可以自定义一些config 配置
    if (config.headers["Content-Type"] !== "application/json; charset=utf-8") {
      config.data = !isFormData(config.data) ? qs.stringify(config.data, {indices: false}) : config.data;
    }
    if (
      store.state.user &&
      store.state.user.user &&
      store.state.user.user.token &&
      config.headers["Authorization"] !== ""
    ) {
      config.headers["Authorization"] = "Bearer " + store.state.user.user.token;
    }
    config.headers['x-client-type'] = 'web';
    config.headers['x-client-version'] = store.state.app.version;
    if (config.responseType === "arraybuffer") {
      // 文件下载类型60s超时
      config.timeout = 600000;
    }
    // loading + 1
    NProgress.start();
    store.dispatch("SetLoading", true);
    showLoading();
    return config;
  },
  (error) => {
    //  这里处理一些请求出错的情况

    // loading 清 0
    setTimeout(function () {
      NProgress.done();
      store.dispatch("SetLoading", 0);
      closeLoading();
    }, 300);

    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 这里处理一些response 正常放回时的逻辑
    if (
      response &&
      response.config &&
      response.config.url.indexOf("/message/count") < 0 &&
      response.config.url.indexOf("/enum/") < 0 &&
      response.config.url.indexOf("/contacts/userSearch") < 0 &&
      response.config.url.indexOf("/contacts/deptUserTree") < 0
    ) {
      console.log("#####################");
      console.log("%cURL:" + response.config.url, "color:orange");
      console.log("params:" + response.config.data);
      console.log("response:", res);
      console.log("#####################");
    }
    // 比如， 如果code 非 200 统一提示错误，当然你仍可以更详细的区分
    if (
      response.config.responseType !== "arraybuffer" &&
      res.code !== 200 &&
      res.code !== 401
    ) {
      Promise.reject(res);
      if (res.code && res.msg && res.msg !== "禁止访问") {
        Message({
          message: "系统提示:" + res.msg, // + '\n错误详情:' + res.errorDetail,
          type: "warning",
          duration: 3000
        });
      }
      /*
      Message({
        message: '请求错误:' + res.msg , // + '\n错误详情:' + res.errorDetail,
        type: 'warning',
        duration: 3000
      })
      */
    } else if (res.code === 401 && errorMsgStatus) {
      errorMsgStatus = false;
      Message({
        message: "登录超时，请重新登录!",
        type: "error",
        duration: 3000,
      });
      store.dispatch("FedLogOut", false);
      router.push({
        path: "/login"
      });
      setTimeout(() => {
        errorMsgStatus = true;
      }, 3000);
    }
    // loading - 1
    NProgress.done();
    store.dispatch("SetLoading", false);
    closeLoading();
    return response.config.responseType === "arraybuffer" ? response : res;
  },
  (error) => {
    // 这里处理一些response 出错时的逻辑
    /*
    Message({
      message: '系统错误：' + error,
      type: 'error',
      duration: 3000
    });
    */
    console.log("系统错误：" + error);
    // loading - 1
    NProgress.done();
    store.dispatch("SetLoading", false);
    closeLoading();

    return Promise.reject(error);
  }
);

export default service;
