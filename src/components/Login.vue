<template>
    <div class="login">
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    v-model="user.email"
                >
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    v-model="user.password"
                >
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import config from '@/config.ts';
import router from '@/router';

export default Vue.extend({
    data() {
        return {
            user: {
                email: '',
                password: ''
            }
        };
    },
    methods: {
        handleSubmit() {
            console.log('being called', this.user.email);
            axios
                .post(config.api + '/user/authenticate', {
                    username: this.user.email,
                    password: this.user.password
                })
                .then(data => {
                    window.localStorage.setItem('token', data.data.token);
                    router.push('/');
                });
        }
    }
});
</script>

<style lang="less">
.login {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    form {
        grid-column: 2;
    }
}
</style>
