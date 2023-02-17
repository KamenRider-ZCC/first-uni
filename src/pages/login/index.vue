<template>
  <view class="login-box">
    <u-form
      ref="baseForm"
      :rules="rules"
      :model="baseFormData"
      labelPosition="top"
    >
      <u-form-item label="账号:" prop="account">
        <u-input v-model="baseFormData.account" placeholder="请输入账号" />
      </u-form-item>
      <u-form-item label="密码:" prop="password">
        <u-input
          password
          v-model="baseFormData.password"
          placeholder="请输入密码"
        />
      </u-form-item>
      <u-button type="primary" @click="submit()" text="登录"></u-button>
    </u-form>
  </view>
</template>

<script setup lang="ts">
import md5 from "js-md5"
import { USER_TOKEN } from "@/utils/const"
import { translatePermissionList } from "@/utils/helper"
import { userStore } from "@/stores/modules/user"
import {
  login,
  getTokenByTicket,
  getUserInfo,
  getMenuPermission,
} from "@/api/modules/login"
const baseFormData = reactive({
  account: "",
  password: "",
})
const rules = reactive({
  account: {
    type: "string",
    required: true,
    message: "账号不能为空",
    trigger: ["blur", "change"],
  },
  password: {
    type: "string",
    max: 1,
    required: true,
    message: "密码不能为空",
    trigger: ["blur", "change"],
  },
})
const handleGetUserInfo = async () => {
  const resHttp = (await getUserInfo()).data
  const data = resHttp.data
  const user = userStore()
  user.saveUserInfo(data)
  const pemissions = await getMenuPermission()
  const permissionList = translatePermissionList(pemissions)
  user.saveUserPermissionList(permissionList)
  uni.showToast({
    title: `登陆成功`,
  })
  uni.switchTab({
    url: "/pages/index/index",
  })
}
const handleGetTicket = async (tmpTicket: any) => {
  const resHttpTicket = (await getTokenByTicket(tmpTicket)).data
  const dataTicket = resHttpTicket.data
  const userToken = dataTicket.token
  uni.setStorageSync(USER_TOKEN, userToken)
  handleGetUserInfo()
}
const handleLoginRes = (res: any) => {
  const resHttp = res.data
  const data = resHttp.data
  const tmpTicket = data.returnUrl.replace("?tmpTicket=", "")
  handleGetTicket(tmpTicket)
}
const baseForm = ref<HTMLElement | null>(null)
const submit = () => {
  const baseFormValue = baseForm.value as any
  baseFormValue
    .validate()
    .then(() => {
      login({
        username: baseFormData.account,
        password: md5(baseFormData.password),
        returnUrl: "",
      }).then((res: any) => {
        handleLoginRes(res)
      })
    })
    .catch((err: any) => {
      console.log("err", err)
    })
}
</script>

<style>
.login-box {
  margin: 16px 0;
  padding: 0 16px;
}
</style>
