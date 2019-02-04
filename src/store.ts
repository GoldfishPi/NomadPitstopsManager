import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loggedIn: true
    },
    mutations: {
        logout: state => {
            state.loggedIn = false;
        },
        login: state => {
            state.loggedIn = true;
        }
    },
    actions: {}
});
