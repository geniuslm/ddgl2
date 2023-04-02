<script setup lang="ts">

import { useRouter } from 'vue-router';
import { pinia库, 用户类 } from '@/stores/pinia库';
import { socket } from "../stores/socket链接";
import { ref, toRefs, reactive, computed, watch } from 'vue';
import { 获取Cookie, 删除Cookie, 设置Cookie } from "@仓库/cookie";
import lmButton from "@组件/按钮.vue";
let 库 = pinia库()
let router = useRouter()
let 用户 = reactive(new 用户类)



function 登录() {

    socket.emit('登录验证', 用户, (返回数据: any) => {

        console.log("登录验证" + 返回数据[0]);

        if (返回数据[0] == "登录成功") {

            库.当前登录用户 = 返回数据[1].用户名
            库.当前登录用户类型 = 返回数据[1].类型
            设置Cookie("当前登录用户", 返回数据[1].用户名, 1)
            设置Cookie("当前登录用户类型", 返回数据[1].类型, 1)
            设置Cookie("token", "通过", 1)
            router.push("/01")
        }
        else if (返回数据.length == 0) { alert('用户名不存在') }
        else if (返回数据 == "密码错误") { alert(返回数据) }
        else alert(返回数据)
    })
}


socket.on("connect", () => {
    库.当前数据库状态 = "已连接"
    console.log("数据库已连接");

});
socket.on("disconnect", () => {
    库.当前数据库状态 = "断开连接"
    console.log("数据库链接断开");
});



</script>

<template>
    <div class="登录页" @keyup.enter="登录">
        <h1>李默眼镜工作室-V1.4.02-修改版</h1>

        <input type="text" placeholder="用户名" v-model.lazy="用户.用户名">
        <input type="text" placeholder="密码" v-model.lazy="用户.密码">
        <div class='按钮组'>
            <lmButton plain @click="登录" @keyup.enter="登录">登录</lmButton>
            <lmButton :class="{ 退出登录: 库.当前数据库状态 != '已连接' }"> 服务器 {{ 库.当前数据库状态 }}</lmButton>
        </div>


    </div>
</template>

<style scoped lang="scss">
.登录页 {
    display: grid;
    height: 100vh;
    width: 100vw;
    grid-auto-flow: row;
    grid-template-rows: auto;
    align-content: center;
    align-items: center;
    background: #f5f5f5;
    gap: 10px;
    .按钮组{
        gap: 10px;
        grid-template-columns: 200px ;
        grid-template-rows: 1fr 1fr;
    }
}

.退出登录 {
    background-color: red;
}


</style>
