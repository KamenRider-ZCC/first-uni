import { entrys } from "@/configs/home-entrys"
export function translatePermissionList(list: any[]) {
  const result = []

  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    result.push({
      code: item.code,
      name: item.name,
      icon: item.icons,
      sort: item.sort,
    })
  }

  return result
}
function findHasMenu(menu: any, list: any[]) {
  let result = null
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (menu.code === item.code) {
      result = {
        code: item.code || menu.code,
        name: item.name || menu.name,
        icon: item.icons || menu.icon,
        sort: item.sort || menu.sort,
        path: menu.path || null,
      }
    }
  }
  return result
}
function translateSubMenus(menus: any[], list: any[]) {
  const result = []
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]
    const menuResult = findHasMenu(menu, list)
    if (menuResult) {
      result.push(menuResult)
    }
  }
  return result
}
function findHasProduct(prod: any, list: any[]) {
  let result = null
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (prod.code === item.code) {
      const subMenu = translateSubMenus(prod.menus, list)
      if (subMenu.length !== 0) {
        result = {
          code: item.code || prod.code,
          name: item.name || prod.name,
          sort: item.sort || prod.sort,
          menus: subMenu,
        }
      }
    }
  }
  return result
}
export function translatePermissionsToMenuList(list: any[]) {
  const result = []

  for (let i = 0; i < entrys.length; i++) {
    const entry = entrys[i]
    const prodResult = findHasProduct(entry, list)

    if (prodResult) {
      result.push(prodResult)
    }
  }

  return result
}
