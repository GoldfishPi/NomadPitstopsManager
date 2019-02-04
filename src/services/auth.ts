import VueRouter from 'vue-router';
import sotre from '@/store';
import store from '@/store';

class AuthService {
    isLoggedIn(to: Object, from: Object, next: Function) {
        console.log(to, from);
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

export default new AuthService();
