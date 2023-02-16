import { USER_TOKEN } from "@/utils/const"
import { logout } from "@/utils/auth"
import _config from "./config"

export default function $http(options: any, chechResStatus = false) {
  let urltype =
    options.url.split("/")[0] == ""
      ? options.url.split("/")[1]
      : options.url.split("/")[0]

  switch (urltype) {
    case "oauth":
      options.url = "http://172.30.252.14:3008/" + options.url
      break
    case "uim":
      options.url = "http://172.30.252.14:3006/" + options.url
      break
    default:
      break
  }

  const userToken = uni.getStorageSync(USER_TOKEN) || ""

  options.header = {
    "Content-Type": options.contentType || "application/json",
    Authorization: `Bearer ${userToken}`,
  }

  return new Promise((resolve, reject) => {
    // 进行url字符串拼接
    // 拦截请求
    _config.complete = (response) => {
      //  request請求访问成功
      if (response.statusCode === 200) {
        // 接口请求成功
        if (chechResStatus) {
          const code = response.data.code
          if (code === 1) {
            resolve(response.data.data)
          } else {
            uni.showToast({
              title: response.data.message,
              icon: "none",
            })
            resolve(response.data)
          }
        } else {
          resolve(response)
        }
      } else {
        // 处理catch 请求，不在本页面之外处理，统一在这里处理
        if (options.handle) {
          reject(response)
        } else {
          if (response) {
          }
          try {
            Promise.reject(response).catch((err) => {
              _page_error(response)
            })
          } catch (e) {
            console.log(e)
          }
        }
      }
    }
    uni.request(Object.assign({}, _config, options))
  })
}

// request 錯誤
function _page_error(err: any) {
  switch (err.statusCode) {
    case 401:
      // 错误码404的处理方式
      uni.showToast({
        title: "登录过期！",
        icon: "error",
        duration: 2000,
      })
      logout()
      break
    default:
      uni.showToast({
        title: JSON.stringify(err),
        icon: "error",
        duration: 2000,
      })
      break
  }
}
