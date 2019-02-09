<template>
    <div class="post-editor">
        <div class="editor">
            <VueEditor v-if="post" v-model="post.body"></VueEditor>
        </div>
        <button class="btn btn-primary save" @click="handleSave">Save</button>
    </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
// import Vue from 'vue';
import axios from 'axios';
import config from '@/config.ts';
import api from '@/services/api';
import { VueEditor } from 'vue2-editor';
// const VueEditor = require('vue2-editor');

export default Vue.extend({
    components: {
        VueEditor
    },
    props: ['post'],

    data() {
        return {};
    },
    methods: {
        handleSave() {
            api.post('/blog/' + this.post.id, {
                body: this.post.body
            });
        }
    }
});
</script>

<style lang="less">
.post-editor {
    .save {
        margin-top: 1rem;
    }
}
</style>
