const mesEntry = {
  name: "MES测试",
  code: "mes-app",
  sort: 1,
  menus: [
    {
      icon: "https://hellouniapp.dcloud.net.cn/static/c1.png",
      name: "mes测试",
      code: "mes-test1",
      path: "/pages/mes/mes-test1/index",
    },
    {
      icon: "https://hellouniapp.dcloud.net.cn/static/c2.png",
      name: "mes测试",
      code: "mes-test2",
    },
    {
      icon: "https://hellouniapp.dcloud.net.cn/static/c3.png",
      name: "mes测试",
      code: "mes-test3",
    },
    {
      icon: "https://hellouniapp.dcloud.net.cn/static/c4.png",
      name: "mes测试",
      code: "mes-test4",
    },
  ],
}

const wmsEntry = {
  name: "WMS测试",
  code: "wms-app",
  sort: 1,
  menus: [
    {
      icon: "https://hellouniapp.dcloud.net.cn/static/c5.png",
      name: "wms测试",
      code: "wms-test1",
      path: "/pages/wms/wms-test1/index",
    },
    {
      icon: "https://hellouniapp.dcloud.net.cn/static/c6.png",
      name: "wms测试",
      code: "wms-test2",
    },
    {
      icon: "https://hellouniapp.dcloud.net.cn/static/c7.png",
      name: "wms测试",
      code: "wms-test3",
    },
    {
      icon: "https://hellouniapp.dcloud.net.cn/static/c8.png",
      name: "wms测试",
      code: "wms-test4",
    },
  ],
}

// 首页的各模块和菜单入口
export const entrys = [{ ...mesEntry }, { ...wmsEntry }]
