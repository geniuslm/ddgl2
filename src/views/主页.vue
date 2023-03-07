<script setup lang="ts">
import lm菜单助理 from '@组件/菜单助理.vue';
import lm菜单客服 from '@组件/菜单客服.vue';
import { pinia库 } from '@仓库/pinia库';
import lm头部 from '@组件/头部.vue';
import lm底部 from '@组件/底部.vue';
import { computed } from 'vue';

let 库 = pinia库()


let 菜单 = 库.当前登录用户类型 == '助理'

</script>

<template>
    <div class="布局">
        <lm头部 class="两列" />
        <lm菜单客服 v-if="!菜单" />
        <lm菜单助理 v-if="菜单" />
        <RouterView name="内容" />
        <lm底部 class="两列"/>
        
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
