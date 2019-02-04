<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link class="navbar-brand" to="/">Site Manager</router-link>
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link href to="/blog" class="nav-link">Blog</router-link>
                </li>
            </ul>
            <ul
                class="nav navbar-nav flex-row justify-content-md-center justify-content-start flex-nowrap"
            >
                <li v-if="!loggedIn" class="nav-item">
                    <a href class="nav-link">Login</a>
                </li>
                <li v-if="loggedIn" class="nav-item">
                    <a href v-on:click="logout" class="nav-link">Logout</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import AuthService from '@/services/auth';
import { Component, Prop, Vue } from 'vue-property-decorator';

import axios from 'axios';
import config from '@/config.ts';
import router from '@/router';
import store from '@/store';
export default Vue.extend({
    computed: {
        loggedIn() {
            return this.$store.state.loggedIn;
        }
    },
    methods: {
        logout(e) {
            e.preventDefault();
            const authService = new AuthService();
            this.$store.commit('logout');
            authService.logOut();
            this.$router.push('/login');
        }
    }
});
</script>

<style>
</style>
