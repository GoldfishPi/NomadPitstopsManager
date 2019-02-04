<template>
    <div class="post-meta-editor">
        <div class="thumbnail">
            <img v-bind:src="image" alt="thumbnail" class="thumbnail-image img-thumbnail">
            <div class="form-group">
                <input
                    type="file"
                    class="form-control-file"
                    id="exampleFormControlFile1"
                    v-on:change="handleFileUpload()"
                    ref="imageUpload"
                >
            </div>
        </div>
        <div class="meta">
            <div class="name">
                <div class="form-inline">
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="post.title">
                    </div>
                    <div class="btn btn-primary" @click="saveTitle">Save Title</div>
                </div>
            </div>
            <div class="snippet">
                <div class="form-group"></div>
                <div class="form-group">
                    <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        v-model="snippet"
                    ></textarea>
                </div>
                <div class="btn btn-primary save" @click="saveMeta">Save Snippet</div>
            </div>
            <div class="active">
                <input
                    v-if="post.active"
                    type="button"
                    class="btn btn-outline-danger"
                    value="Deactivate"
                    @click="deactivate"
                >
                <input
                    v-else
                    type="button"
                    class="btn btn-primary"
                    value="Activate"
                    @click="activate"
                >
            </div>
        </div>
    </div>
</template>

<script>
import Api from '@/services/api';
import Vue from 'vue';
export default Vue.extend({
    props: ['post'],
    created() {
        if (!this.post) return;
        console.log('this.post', this.post);
        this.image = this.post.thumbnail;
        this.snippet = this.post.snippet;
    },
    watch: {
        post: function() {
            this.image = this.post.thumbnail;
            this.snippet = this.post.snippet;
        }
    },
    data() {
        return {
            imageUpload: '',
            image: '',
            snippet: ''
        };
    },
    methods: {
        handleFileUpload() {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(this.$refs.imageUpload.files[0]);
            fileReader.onload = () => {
                this.image = fileReader.result;
                this.saveThumbnail();
            };
        },
        saveThumbnail() {
            Api.post('/blog/' + this.post.id, {
                thumbnail: this.image
            });
        },
        saveMeta() {
            Api.post('/blog/' + this.post.id, {
                snippet: this.snippet,
                title: this.post.title
            });
        },
        saveTitle() {
            Api.post('/blog/' + this.post.id, {
                title: this.post.title
            });
        },
        activate() {
            this.post.active = true;
            Api.post('/blog/' + this.post.id, {
                active: true
            });
        },
        deactivate() {
            this.post.active = false;
            Api.post('/blog/' + this.post.id, {
                active: false
            });
        }
    }
});
</script>

<style lang="less">
.post-meta-editor {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'thumb meta';

    grid-gap: 1rem;
    .thumbnail {
        grid-area: thumb;
        display: flex;
        flex-direction: column;
        .thumbnail-image {
            // max-width: 100%;
            min-height: 500px;
            max-width: 500px;
            margin-bottom: 1rem;
        }
        .save {
            align-self: flex-start;
        }
    }
    .meta {
        display: flex;
        flex-direction: column;
        // justify-content: space-between;
        .name {
            align-self: flex-end;
        }
        .snippet {
            grid-area: snippet;
            display: flex;
            flex-direction: column;
            .save {
                align-self: flex-end;
            }
        }
        .active {
            margin-top: 1rem;
            align-self: flex-end;
        }
    }
}
@media only screen and (max-width: 900px) {
    .post-meta-editor {
        grid-template-columns: 1fr;
        .snippet {
            .save {
                align-self: flex-start;
            }
        }
    }
}
</style>
