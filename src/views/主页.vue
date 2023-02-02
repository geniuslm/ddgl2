<script setup lang="ts">
import lm菜单 from '@/components/菜单.vue';
import lm头部 from '@组件/头部.vue';
import { computed } from 'vue';






</script>

<template>
    <div class="布局">
        <lm头部 class="两列" />
        <lm菜单 />
        <RouterView name="内容" />
        <div class="两列">
        </div>
    </div>
</template>


<style scoped lang="scss">
.布局 {
    grid-template-rows: 40px 1fr 40px;
    grid-template-columns: auto 1fr;
    height: 100vh;
    width: 100vw;
    background-color: #fff;
    gap: 5px;
}
</style>
