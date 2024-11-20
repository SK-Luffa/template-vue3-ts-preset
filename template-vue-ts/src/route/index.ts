import { createRouter, createWebHistory, } from 'vue-router'
import type { RouteRecordRaw, } from "vue-router"

// import Home from '@/Page/Home/index.vue'//示例

const routes: Array<RouteRecordRaw> = [
    // { path: '/', component: Home },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


export default router