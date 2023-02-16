import { createSSRApp } from "vue"
import App from "./App.vue"
import pinia from "./stores"
import uviewPlus from "uview-plus"
export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia).use(uviewPlus)
  return {
    app,
  }
}
