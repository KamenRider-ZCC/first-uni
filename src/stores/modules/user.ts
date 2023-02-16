import { defineStore } from "pinia"
import { translatePermissionsToMenuList } from "@/utils/helper"
import piniaPersistConfig from "@/configs/piniaPersist"

export const userStore = defineStore("user", {
  state: () => {
    return {
      token: "",
      account: "",
      deptId: "",
      nickName: "",
      roleId: "",
      roleName: "",
      tenantId: "",
      tenantName: "",
      userId: "",
      userName: "",
      userType: "",
      permissions: [],
      menus: <any>[],
    }
  },
  actions: {
    async setToken(val: string) {
      this.token = val
    },
    saveUserInfo(user: any) {
      this.account = user.account
      this.deptId = user.deptId
      this.nickName = user.nickName
      this.roleId = user.roleId
      this.roleName = user.roleName
      this.tenantId = user.tenantId
      this.tenantName = user.tenantName
      this.userId = user.userId
      this.userName = user.userName
      this.userType = user.userType
    },
    saveMenuList(permissions: any[]) {
      this.menus = translatePermissionsToMenuList(permissions)
    },
    saveUserPermissionList(permissions: any) {
      this.permissions = permissions
      this.saveMenuList(permissions)
    },
  },
  persist: piniaPersistConfig("user"),
})
