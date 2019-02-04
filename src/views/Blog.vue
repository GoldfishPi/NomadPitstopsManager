<template>
    <div class="active-blog-posts">
        <div class="form-inline">
            <div class="form-group">
                <input v-model="postName" type="text" class="form-control">
            </div>
            <div class="btn btn-primary" @click="createPost">Add Post</div>
        </div>
        <div class="cards">
            <div class="card" v-for="(post, index) in posts" :key="index">
                <h5 class="card-header">{{post.title}}</h5>
                <img class="card-img-top img-thumbnail" :src="post.thumbnail" alt="Card image cap">
                <div class="card-body">
                    <p v-if="post.active" class="text-success card-text">Active</p>
                    <p v-else class="text-danger card-text">Stage</p>
                    <router-link :to="'/blog/edit/'+post.id" class="btn btn-primary">Edit Blog Post</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import config from '@/config';
import api from '@/services/api';
// import func from './vue-temp/vue-editor-bridge';
export default Vue.extend({
    data() {
        return {
            posts: [],
            postName: ''
        };
    },
    created() {
        this.getPosts();
    },
    methods: {
        getPosts() {
            api.get('/blog').then(data => {
                console.log('posts', data);
                this.posts = data.data.posts;
            });
        },
        createPost() {
            api.post('/blog', {
                title: this.postName,
                id: this.postName.toLowerCase().replace(/\s/g, '')
            }).then(this.getPosts);
        }
    }
});
</script>

<style lang="less">
.active-blog-posts {
    margin: 4rem;
    .form-inline {
        margin-bottom: 1rem;
    }
    .cards {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 1rem;
        text-align: left;
    }
}
</style>
