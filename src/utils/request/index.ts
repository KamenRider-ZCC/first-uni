/* eslint-disable @typescript-eslint/ban-types */
import {
  HEADER,
  HEADERPARAMS,
  TOKENNAME,
  HTTP_REQUEST_URL,
} from "@/configs/app"
import { userStore } from "@/stores/modules/user"

type RequestOptionsMethod =
  | "OPTIONS"
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "TRACE"
  | "CONNECT"
type RequestOptionsMethodAll =
  | RequestOptionsMethod
  | Lowercase<RequestOptionsMethod>

/**
 * 发送请求
 */
function baseRequest(
  url: string,
  method: RequestOptionsMethod,
  data: any,
  { noAuth = false, noVerify = false }: any,
  params: unknown
) {
  const user = userStore()
  const { token } = toRefs(user)
  const Url = HTTP_REQUEST_URL
  let header = JSON.parse(JSON.stringify(HEADER))
  if (params != undefined) {
    header = HEADERPARAMS
  }
  if (!noAuth) {
    if (!token.value) {
      uni.showToast({
        icon: "none",
        duration: 3000,
        title: `未登录`,
      })
      return Promise.reject({
        msg: "未登录",
      })
    }
    if (token.value && token.value !== "null")
      header[TOKENNAME] = "Bearer " + token.value
  }

  return new Promise((reslove, reject) => {
    uni.showLoading({
      title: "加载中",
      mask: true,
    })
    uni.request({
      url: Url + url,
      method: method || "GET",
      header: header,
      data: data || {},
      success: (res: any) => {
        console.log("res", res)
        uni.hideLoading()
        res.data.token &&
          res.data.token !== "null" &&
          user.setToken(res.data.token)
        if (noVerify) {
          reslove(res)
        } else if (res.statusCode === 200) {
          reslove(res.data)
        } else {
          uni.showToast({
            icon: "none",
            duration: 3000,
            title: `${res.data.message || "系统错误"}`,
          })
          reject(res.data.message || "系统错误")
        }
      },
      fail: (msg) => {
        uni.hideLoading()
        uni.showToast({
          icon: "none",
          duration: 3000,
          title: `请求失败`,
        })
        reject("请求失败")
      },
    })
  })
}

// const request: Request = {}
const requestOptions: RequestOptionsMethodAll[] = [
  "options",
  "get",
  "post",
  "put",
  "head",
  "delete",
  "trace",
  "connect",
]
type Methods = typeof requestOptions[number]

const request: { [key in Methods]?: Function } = {}

requestOptions.forEach((method) => {
  const m = method.toUpperCase() as unknown as RequestOptionsMethod
  request[method] = (api: string, data: any, opt: any, params: any) =>
    baseRequest(api, m, data, opt || {}, params)
})

export default request
