import { USER_TOKEN } from "@/utils/const"
import { translatePermissionList } from "@/utils/helper"
import { userStore } from "@/stores/modules/user"
import { getUserInfo, getMenuPermission } from "@/api/modules/login"

export function checkHasLogin() {
  const userToken = uni.getStorageSync(USER_TOKEN)

  if (userToken) {
    return true
  }

  return false
}

export function getPermission() {
  getMenuPermission().then((res) => {
    const permissionList = translatePermissionList(res as any[])
    const user = userStore()
    user.saveUserPermissionList(permissionList)
  })
}

export function getUserAndPermission() {
  getUserInfo().then((res: any) => {
    const resHttp = res.data
    const data = resHttp.data

    if (resHttp.code === 1) {
      const user = userStore()
      user.saveUserInfo(data)
      getPermission()
    } else {
      uni.showToast({
        title: resHttp.message,
        icon: "none",
      })
    }
  })
}

export function logout() {
  uni.removeStorageSync(USER_TOKEN)
  uni.redirectTo({
    url: "/pages/login/index",
  })
}
