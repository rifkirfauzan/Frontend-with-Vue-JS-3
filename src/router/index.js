//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path: '/',
        name: 'warga.index',
        component: () => import( /* webpackChunkName: "warga.index" */ '@/views/warga/Index.vue')
    },
    {
        path: '/create',
        name: 'warga.create',
        component: () => import( /* webpackChunkName: "warga.create" */ '@/views/warga/Create.vue')
    },
    {
        path: '/edit/:id',
        name: 'warga.edit',
        component: () => import( /* webpackChunkName: "warga.edit" */ '@/views/warga/Edit.vue')
    }
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes  // config routes
})

export default router