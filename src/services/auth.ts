import VueRouter from 'vue-router';
import sotre from '@/store';
import store from '@/store';

export default class AuthService {
    isLoggedIn(to, from, next) {
        const router = new VueRouter();
        if (window.localStorage && window.localStorage.getItem('token')) {
            next();
            store.commit('login');
            return true;
        }
        store.commit('logout');
        next('/login');
        return false;
    }

    isLoggedInRouterless() {
        if (window.localStorage && window.localStorage.getItem('token')) {
            return true;
        }
        return false;
    }
    logOut() {
        store.state.loggedIn = false;
        if (window.localStorage) {
            window.localStorage.removeItem('token');
        }
    }
}
