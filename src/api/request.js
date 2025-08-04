import mpx from "@mpxjs/core";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "https://cbs-gateway.dev.ebsfw.com" // 测试环境
    : "https://xxx.xxx.com"; // 线上环境
let loadingCount = 0;

// 全局 loading 控制
function showLoading() {
  if (loadingCount === 0) {
    mpx.showLoading({ title: "加载中..." });
  }
  loadingCount++;
}
function hideLoading() {
  loadingCount--;
  if (loadingCount <= 0) {
    loadingCount = 0;
    mpx.hideLoading();
  }
}

// 添加请求拦截器
mpx.xfetch.interceptors.request.use((config) => {
  if (config.showLoading !== false) {
    showLoading();
  }
  let cookies = mpx.getStorageSync("cookies");
  if (cookies && cookies.length) {
    if (!config.headers) config.headers = {};
    config.headers.cookie = cookies.join(";");
  }
  return config;
});

// 添加响应拦截器
mpx.xfetch.interceptors.response.use(
  (response) => {
    if (response.requestConfig.showLoading) {
      hideLoading();
    }
    if (response.cookies.length) {
      console.log("response.cookies", response.cookies);
      let cookies = [];
      const cookie = response.cookies[0];
      let c = cookie.split(";");
      if (c) cookies = c;
      let expired = true;
      for (let i = 0; i < cookies.length; i++) {
        let key = cookies[i].split("=")[0];
        let value = cookies[i].split("=")[1];
        if (key === "SESSION") {
          expired = false;
          if (!value) {
            expired = true;
          }
        }
      }
      if (expired) {
        mpx.removeStorageSync("cookies");
      } else {
        mpx.setStorageSync("cookies", cookies);
      }
    }

    if (response.data.code !== 0) {
      if (response.data.code === 101) {
        mpx.removeStorageSync("cookies");
        mpx.reLaunch({
          url: "/pagesMine/login/index",
        });
        return;
      }
      if (
        response.requestConfig.showToastMsg !== false &&
        response.requestConfig.method !== "get"
      ) {
        mpx.showToast({
          title: response.data.message || "网络异常",
          icon: "none",
        });
      }
    }
    return response.data;
  },
  (error) => {
    hideLoading();
    if (error.code === "ECONNABORTED") {
      mpx.showToast({ title: "请求超时", icon: "error" });
      return Promise.reject(error);
    }
    try {
      const { status, data } = error.response;
      let message;
      if (status === 404) {
        message = `接口【${data.path}】未定义`;
      } else if (status === 500) {
        message = `服务不可用`;
      } else {
        message = `系统异常`;
      }
      mpx.showToast({ title: message, icon: "error" });
      return Promise.reject(error);
    } catch (err) {
      return Promise.reject(err);
    }
  }
);

// 通用请求方法
function request({ url, config = {} }) {
  return mpx.xfetch
    .fetch({
      url: url.includes("http") ? url : baseURL + url,
      ...config,
      timeout: config.timeout ?? 10000,
    })
    .then((res) => res);
}

// GET
export function get(url, parameter = {}) {
  const { showLoading, params } = parameter;
  let config = {};
  config.method = "GET";
  config.params = params;
  config.showLoading = showLoading;
  config.headers = config.headers || {};
  config.timeout = config.timeout;
  return request({ url, config });
}

// POST
export function post(url, parameter = {}) {
  const { showLoading, showToastMsg, data, params } = parameter;
  let config = {};
  config.method = "POST";
  config.params = params;
  config.data = data;
  config.showLoading = showLoading;
  config.showToastMsg = showToastMsg;
  config.headers = config.headers || {};
  config.timeout = config.timeout;
  return request({ url, config });
}

// POST form
export function postForm(url, parameter = {}) {
  const { headers, showLoading, showToastMsg, data, params } = parameter;
  let config = {};
  config.method = "POST";
  config.params = params;
  config.data = data;
  config.showLoading = showLoading;
  config.showToastMsg = showToastMsg;
  config.headers = headers
    ? { ...headers, "Content-Type": "application/x-www-form-urlencoded" }
    : { "Content-Type": "application/x-www-form-urlencoded" };
  config.timeout = config.timeout;
  return request({ url, config });
}

// PUT
export function put(url, parameter = {}) {
  const { showLoading, showToastMsg, data, params } = parameter;
  let config = {};
  config.method = "PUT";
  config.data = data;
  config.params = params;
  config.showLoading = showLoading;
  config.showToastMsg = showToastMsg;
  config.timeout = config.timeout;
  config.headers = config.headers || {};
  return request({ url, config });
}

// DELETE
export function del(url, parameter = {}) {
  const { showLoading, showToastMsg, data, params } = parameter;
  let config = {};
  config.method = "DELETE";
  config.data = data;
  config.params = params;
  config.headers = config.headers || {};
  config.showLoading = showLoading;
  config.showToastMsg = showToastMsg;
  config.timeout = config.timeout;
  return request({ url, config });
}

// 上传文件
export function uploadFile(url, parameter = {}) {
  const { formData = {}, params, showLoading, showToastMsg } = parameter;
  config.method = "POST";
  config.headers = {
    "Content-Type": "multipart/form-data",
  };
  let config = {};
  config.formData = formData;
  config.params = params;
  config.showToastMsg = showToastMsg;
  config.timeout = config.timeout;
  config.showLoading = showLoading;
  return request({ url, config });
}
