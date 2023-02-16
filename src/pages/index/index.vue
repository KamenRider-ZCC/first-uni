<template>
  <view v-if="menus.length !== 0">
    <u-cell-group
      v-for="menu in menus"
      :title="menu.name"
      :key="menu.code"
      @click="handleGridClick(menu, $event)"
    >
      <u-cell
        v-for="submenu in menu.menus"
        :key="submenu.code"
        :icon="submenu.icon"
        :title="submenu.name"
      />
    </u-cell-group>
  </view>
  <u-empty v-else mode="permission" />
</template>

<script setup lang="ts">
import { userStore } from "@/stores/modules/user"

const user = userStore()
const { menus } = toRefs(user)
menus.value = [
  {
    name: "一",
    code: 1,
    menus: [
      { code: 11, icon: "setting-fill", name: "一一" },
      { code: 12, icon: "setting-fill", name: "一二" },
    ],
  },
  {
    name: "二",
    code: 2,
    menus: [
      { code: 21, name: "二一" },
      { code: 22, icon: "setting-fill", name: "二二" },
    ],
  },
]
const handleGridClick = (menus: any, e: any) => {
  console.log(e)
  // let { index } = e.detail
  // const subMenus = menus.menus
  // const currentMenu = subMenus[index]

  // if (currentMenu.path) {
  //   uni.navigateTo({
  //     url: currentMenu.path,
  //   })
  // } else {
  //   uni.showToast({
  //     title: `${currentMenu.name}暂未开放`,
  //     icon: "none",
  //   })
  // }
}
</script>

<style></style>
