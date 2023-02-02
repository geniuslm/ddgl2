<script setup lang="ts">
import { pinia数据中心 } from "../stores/pinia数据";
import { reactive, ref } from "vue";

import { useRouter } from 'vue-router';

let pinia = pinia数据中心();
let 路由 = useRouter()
let 跳转 = (路径: any) => {

    pinia.菜单页面路径 = 路径.路径
    pinia.菜单页面名 = 路径.内容
    路由.push(路径.路径);
}


let 菜单列表 = reactive([
    { 路径: "/mr", 内容: "默认页", 图标: "icon-file" },
    { 路径: "/01", 内容: "1图标页", 图标: "icon-star-fill" },
    { 路径: "/02", 内容: "2未订单", 图标: "icon-question-circle" },
    { 路径: "/03", 内容: "3用户页", 图标: "icon-team" },
    { 路径: "/04", 内容: "4旧订单", 图标: "icon-filedone" },
    { 路径: "/05", 内容: "5删除单", 图标: "icon-question-circle" },
    { 路径: "/06", 内容: "第六测试", 图标: "icon-question-circle" },
    { 路径: "/07", 内容: "新单录入", 图标: "icon-question-circle" },
    { 路径: "/08", 内容: "镜片列表", 图标: "icon-question-circle" },
    { 路径: "/09", 内容: "第九测试", 图标: "icon-question-circle" },
    { 路径: "/10", 内容: "第十测试", 图标: "icon-question-circle" },
    { 路径: "/11", 内容: "第十一页", 图标: "icon-filedone" },


])


let 开关 = ref(true);



</script>

<template>
    <div class="菜单" :style="[开关 ? ' width:  130px' : 'width: 50px']">

        <button v-for="按钮, index in 菜单列表" :key="index" @click="跳转(菜单列表[index])"
            :class="{ 当前: 菜单列表[index].路径 == pinia.菜单页面路径 }">
            <icon v-show="!开关" :图标名="按钮.图标" color="#fff" font-size="30px" />
            <icon v-show="开关" :图标名="按钮.图标" color="#fff" font-size="20px" />
            <p v-if="开关">{{ 按钮.内容 }}</p>
        </button>



        <button @click="开关 = !开关">{{ 开关? "开": "关" }}</button>
        <div class="展开按钮" @click="开关 = !开关"></div>
    </div>
</template>

<style scoped>
.菜单 {
    display: grid;
    box-sizing: border-box;
    gap: 2px;
    width: 100px;
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    align-content: start;
    align-items: center;
    justify-content: center;
    justify-items: center;
    background-color: #f0f2f5;
    padding: 5px;
    transition: all 0.2s;
    position: relative;
}

.当前 {
    height: 50px;
    background-color: #1c82e7;
}

p {
    white-space: nowrap;
}

.展开按钮 {
    position: absolute;
    right: -10px;
    width: 20px;
    height: 100px;
    border-radius: 10px;
    background-color: #409EFF;
    transition: all 0.2s;
    z-index: 1;
}

.展开按钮:hover {
    right: -15px;
    width: 30px;
    height: 150px;
    border-radius: 15px;
    background-color: #337ecc;
}

button {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: 1fr;
    box-sizing: border-box;
    border: 2px solid #409EFF;
    width: 100%;
    border-radius: 4px;
    padding: 4px 8px;
    font-family: Arial;
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
    height: 30px;
    overflow: hidden;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    background-color: #409EFF;
    transition: all 0.2s;
}

button:hover {

    background-color: #79bbff;
    border: 2px solid #79bbff;
}

button:active {
    background-color: #337ecc;
    border: 2px solid #337ecc;
}
</style>
