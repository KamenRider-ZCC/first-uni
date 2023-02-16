import type { PersistedStateOptions } from "pinia-plugin-persistedstate"

/**
 * @description pinia持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @return persist
 * */
const piniaPersistConfig = (key: string) => {
  const persist: PersistedStateOptions = {
    key,
    storage: {
      setItem: uni.setStorageSync,
      getItem: uni.getStorageSync,
    },
  }
  return persist
}

export default piniaPersistConfig
