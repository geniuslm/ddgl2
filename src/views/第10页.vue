<script setup lang="ts">
import { pinia数据中心, 订单类, 镜片类, 用户蓝图 } from '../stores/pinia数据';
import lmH from "@组件/镜片行.vue";
import { socket } from '@/stores/socket链接';
//import { HubConnectionBuilder } from "@microsoft/signalr";
import { ref, reactive } from "vue";


let pinia = pinia数据中心();
pinia.获取旧订单();

var 数据 = ref("")

// var signalr中心 = new HubConnectionBuilder()
//     .withUrl("http://localhost:5066/signalr") // 此处填服务器地址
//     .withAutomaticReconnect()  // 断开自动重连
//     .build();
// //开始连接
// signalr中心.start()

// var 发消息 = () => { signalr中心.invoke("测试消息", "测试用户", "测试消息"); }
// var 添加用户 = (用户: 用户蓝图) => {signalr中心.invoke("添加用户", 用户); 
//     }
// var 获取用户列表 = () => { signalr中心.invoke("获取用户列表", pinia.当前登录用户); }

// signalr中心.on("回传消息", (user, message) => {
//     数据.value = user + message,
//         console.log(user + message);
// });

// signalr中心.on("用户列表", (用户列表) => {
//     pinia.测试列表 = 用户列表,
//         console.log(用户列表);
// });
// signalr中心.on("添加用户", (用户) => {
//     console.log(用户.id + " 已添加");
// });


</script>

<template>

    <div class="第十页">
        <h1>第十页</h1>
        <!-- <button @click="发消息"> 发信息</button>
        <h1>数据{{ 数据 }}</h1>
        <button @click="获取用户列表"> 获取用户列表</button>
        <lmb v-for="a, i in pinia.测试列表">
            {{ pinia.测试列表[i].用户名 }}{{ pinia.测试列表[i].手机号 }} {{ pinia.测试列表[i].密码 }}
        </lmb>
        <input v-model="pinia.测试新用户.ID" placeholder="ID">
        <input v-model="pinia.测试新用户.用户名" placeholder="用户名">
        <input v-model="pinia.测试新用户.手机号" placeholder="手机号">
        <input v-model="pinia.测试新用户.密码" placeholder="密码">
        <lmb @click="添加用户(pinia.测试新用户)">添加用户</lmb> -->

    </div>

</template>


<style scoped>
.第十页 {
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: auto;
    align-content: start;
    align-items: start;
    background-color: #F0F2F5;
    gap: 0px;
}
</style>
