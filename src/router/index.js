import { createRouter, createWebHistory } from 'vue-router';

import { AuthLayout, HomeLayout, ManagerLayout } from '../layouts/index';

const routes = [
    {
        path: '/',
        name: 'HomeLayout',
        component: HomeLayout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('../views/Home.vue'),
            },
            {
                path: '/create-post',
                name: 'CreatePost',
                component: () => import('../views/user/CreatePost'),
            },
        ],
    },
    {
        path: '/manager',
        name: 'ManagerLayout',
        component: ManagerLayout,
        redirect: '/manager/profile',
        children: [
            {
                path: '/manager/profile',
                name: 'Profile',
                component: () => import('../views/Profile.vue'),
            },
        ],
    },
    {
        path: '/auth',
        name: 'auth',
        component: AuthLayout,
        redirect: '/login',
        children: [
            {
                path: '/login',
                name: 'login',
                component: () => import('../views/auth/Login.vue'),
            },
            {
                path: '/register',
                name: 'register',
                component: () => import('../views/auth/Register.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
