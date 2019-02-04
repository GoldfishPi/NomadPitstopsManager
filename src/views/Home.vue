<template>
    <div class="home">Home sweet home</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Login from '@/components/Login.vue';

@Component({
    components: {
        Login
    }
})
export default class Home extends Vue {}
</script>
