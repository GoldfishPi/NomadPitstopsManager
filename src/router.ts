import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Blog from './views/Blog.vue';
import PostManager from '@/components/PostManager.vue';
import Login from '@/components/Login.vue';
import AuthService from '@/services/auth.ts';

Vue.use(Router);

// var authservice = new AuthService();

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            beforeEnter: AuthService.isLoggedIn
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/blog',
            name: 'blog',
            component: Blog,
            beforeEnter: AuthService.isLoggedIn
        },
        {
            path: '/blog/edit/:id',
            name: 'blogEditor',
            component: PostManager,
            beforeEnter: AuthService.isLoggedIn
        }
    ]
});
