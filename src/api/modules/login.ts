import type { userModule } from "../interface/user"
import request from "@/utils/request/index"

// 登录接口
export const login = (data: any) => {
  return request?.post?.(`oauth/cas/login`, data, {
    noAuth: true,
  })
}

export const getTokenByTicket = (tmpTicket: string) => {
  return request?.post?.(`oauth/cas/verifyTmpTicket?tmpTicket=${tmpTicket}`)
}

export const getUserInfo = () => {
  return request?.get?.(`oauth/oauth/checkToken`)
}

export function changePassword(userId: string, data: any) {
  return request?.get?.(`uim/user/update-password/${userId}`, data)
}

export const getMenuPermission = () => {
  return request?.get?.(`uim/role/getAuthorizedMenu?productCode=MOBILE`)
}
