<script setup lang="ts">
import { pinia库 } from '@仓库/pinia库';
import lmRow from "@组件/用户行.vue";
import lmB from "@组件/按钮.vue";
import { 获取Cookie, 删除Cookie, 设置Cookie } from "@仓库/cookie";
import { ref } from 'vue';

let 库 = pinia库();
let 名字 = ref("");
let 天数 = ref("");
let 数值 = ref("");
let 存储 = () => {
    console.log(名字.value, 数值.value, 天数.value);
    设置Cookie(名字.value, 数值.value, 天数.value);
}
let 获取 = () => {
    console.log(获取Cookie(名字.value));
}
let 删除 = () => {
    删除Cookie(名字.value);
}
let 测试build = () => {
    console.log(库.当前登录用户);
    
}

</script>

<template>
    <div class="第三页">
        <h1>这是第三页 cookie</h1>
        <div class="首行">
            <lmB @click="存储()">存储</lmB>
            <lmB @click="获取()">获取</lmB>
            <lmB @click="删除()">删除</lmB>
            <lmB @click="测试build()">测试build</lmB>
        </div>
        <div class="横向 平均行">
            <input v-model.lazy="名字" placeholder="名字">
            <input v-model.lazy="天数" placeholder="天数">
            <input v-model.lazy="数值" placeholder="数值">
        </div>

    </div>
</template>

<style scoped lang="scss">
.列表 {
    height: 200px;
}

.第三页 {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 40px 40px 1fr auto;
    gap: 2px;
    align-content: start;
    align-items: center;
    justify-content: center;
    justify-items: center;
    overflow: auto;
    background-color: #F0F2F5
}

.首行 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 210px;
    grid-template-rows: repeat(auto-fit, minmax(20px, 32px));
    gap: 5px;
    align-content: start;
    align-items: center;
    justify-content: center;
    justify-items: center;
    overflow: auto;
    background-color: #F0F2F5
}
</style>
