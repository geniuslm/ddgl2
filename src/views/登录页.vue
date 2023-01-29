<script setup lang="ts">

import { useRouter } from 'vue-router';
import { pinia数据中心 } from '@/stores/pinia数据';
import { socket } from "../stores/socket链接";
import lmButton from "@组件/按钮.vue";
let pinia = pinia数据中心()
let router = useRouter()



function 登录() {
    socket.emit('登录验证', { 用户名: pinia.当前登录用户, 密码: pinia.密码, 手机号: '' }, (返回数据: any) => {

        console.log("登录验证" + 返回数据);

        if (返回数据 == "登录成功") {
            router.push("/1")
            localStorage.setItem("token", "通过")
            localStorage.setItem("当前登录用户", pinia.当前登录用户)
        }
        else if (返回数据 == "此用户名未注册") {

            alert(返回数据)
        }
        else if (返回数据 == "此用户名未注册") {
            alert(返回数据)
        }
        else
            alert(返回数据)
    })
}


socket.on("connect", () => {
    pinia.当前数据库状态 = "已连接"
    console.log("数据库已连接");

});
socket.on("disconnect", () => {
    pinia.当前数据库状态 = "断开连接"
    console.log("数据库链接断开");
});



</script>

<template>
    <div class="登录页">

        <input type="text" placeholder="用户名" v-model.lazy="pinia.当前登录用户">
        <input type="text" placeholder="密码" v-model.lazy="pinia.密码">
        <lmButton plain @click="登录">登录</lmButton>
        <lmButton :class="{退出登录:pinia.当前数据库状态!='已连接'}"> 服务器 {{pinia.当前数据库状态}}</lmButton>

    </div>



</template>


<style scoped>
.登录页{
    display: grid;
    height: 100vh;
    width: 100vw;
    grid-auto-flow: row;
    grid-template-rows: auto;
    align-content: center;
    align-items: center;

    gap: 10px;
}
.退出登录 {
    background-color: red;
}
</style>
