<script setup lang="ts">
import { getUserAndPermission, checkHasLogin } from "@/utils/auth"
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app"
onLaunch(() => {
  console.log("App Launch")
  const hasLogin = checkHasLogin()
  if (!hasLogin) {
    uni.redirectTo({
      url: "/pages/login/index",
    })
  } else {
    getUserAndPermission()
  }
})
onShow(() => {
  console.log("App Show")
})
onHide(() => {
  console.log("App Hide")
})
</script>
<style lang="scss">
/*全局公共样式 */
@import "./styles/common.scss";
@import "uview-plus/index.scss";
</style>
