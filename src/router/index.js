import { createRouter, createWebHistory } from 'vue-router';

import { AuthLayout, HomeLayout, ManagerLayout } from '../layouts/index';
import store from '../store';
import { ACCESS_TOKEN } from '../constants';

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
                path: '/post',
                name: 'HomePost',
                component: () => import('../views/HomePost'),
            },
            {
                path: '/problem',
                name: 'HomeProblem',
                component: () => import('../views/HomeProblem'),
            },
            {
                path: '/post/:idPost',
                name: 'PostDetail',
                component: () => import('../views/user/PostDetail'),
            },
            {
                path: '/create-post',
                name: 'CreatePost',
                component: () => import('../views/user/CreatePost'),
            },
            {
                path: '/create-problem',
                name: 'CreateProblem',
                component: () => import('../views/user/CreateProblem'),
            },
            {
                path: '/problem/:idProblem',
                name: 'ProblemDetail',
                component: () => import('../views/user/ProblemDetail'),
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
                component: () => import('../views/user/Profile.vue'),
            },
        ],
    },
    {
        path: '/auth',
        name: 'Auth',
        component: AuthLayout,
        redirect: '/login',
        children: [
            {
                path: '/login',
                name: 'Login',
                component: () => import('../views/auth/Login.vue'),
            },
            {
                path: '/register',
                name: 'Register',
                component: () => import('../views/auth/Register.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (store.state.accessToken && store.state.userInfo) {
        next();
    } else {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (accessToken) {
            if (to.fullPath === '/login') {
                next({ name: 'Home' });
            } else {
                store.commit('SET_AUTH_USER', accessToken);
                store
                    .dispatch('user/GET_USER_INFO', null, {
                        root: true,
                    })
                    .then(res => {
                        if (res.status) {
                            next();
                        } else {
                            if (to.fullPath === '/home' || to.fullPath === '/login') {
                                next();
                            } else {
                                next({ name: 'Login' });
                            }
                        }
                    });
            }
        } else if (to.fullPath === '/home' || to.fullPath === '/login') {
            next();
        } else {
            next({ name: 'Login' });
        }
    }
});

export default router;
