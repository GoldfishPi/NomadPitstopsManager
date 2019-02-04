<template>
    <div class="post-manager">
        <div class="card text-center">
            <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item">
                        <a
                            v-bind:class="{active: navState.about}"
                            @click="setAbout"
                            class="nav-link"
                            href="#"
                        >About</a>
                    </li>
                    <li class="nav-item">
                        <a
                            v-bind:class="{active: navState.post}"
                            @click="setPost"
                            class="nav-link"
                            href="#"
                        >Post</a>
                    </li>
                    <li class="nav-item">
                        <a
                            v-bind:class="{active: navState.meta}"
                            @click="setMeta"
                            class="nav-link"
                            href="#"
                        >Meta</a>
                    </li>
                </ul>
            </div>
            <div v-if="navState.post" class="card-body">
                <PostEditor v-bind:post="post"></PostEditor>
            </div>
            <div v-if="navState.meta" class="card-body">
                <PostMetaEditor v-bind:post="post"></PostMetaEditor>
            </div>
            <div v-if="navState.about && post" class="card-body">
                <h1 class="title">{{post.title}}</h1>
                <h5>{{post.snippet}}</h5>
                <p>Date Created: {{post.dateCreated}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import PostEditor from '@/components/PostEditor.vue';
import PostMetaEditor from '@/components/PostMetaEditor.vue';
import Api from '@/services/api';
export default {
    components: {
        PostEditor,
        PostMetaEditor
    },
    created() {
        this.getPosts();
    },
    data() {
        return {
            navState: {
                about: true,
                post: false,
                meta: false
            },
            post: this.post
        };
    },
    methods: {
        getPosts() {
            Api.get('/blog/' + this.$route.params.id).then(data => {
                this.post = data.data;
            });
        },
        setAbout(e) {
            e.preventDefault();
            this.setNavState('about');
        },
        setMeta(e) {
            e.preventDefault();
            this.setNavState('meta');
        },
        setPost(e) {
            e.preventDefault();
            this.setNavState('post');
        },
        setNavState(activeState) {
            for (var key in this.navState) {
                if (key === activeState) {
                    this.navState[key] = true;
                } else {
                    this.navState[key] = false;
                }
            }
        }
    }
};
</script>

<style>
</style>
