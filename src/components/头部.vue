<script setup lang="ts">

import { pinia数据中心 } from '../stores/pinia数据';
import { useRouter } from 'vue-router';
import { socket } from "../stores/socket链接";
import lmButton from "@组件/新版按钮.vue";
import { ref } from 'vue';

let pinia = pinia数据中心()
let router = useRouter()

let 退出登录 = () => {
  localStorage.removeItem("token");
  router.push("/login");
}

socket.on("connect", () => {
  pinia.当前数据库状态 = "已连接"
  console.log("数据库已连接");
});

socket.on("disconnect", () => {
  pinia.当前数据库状态 = "断开连接"
  console.log("数据库链接断开");
});

let 推出登录样式 = ref(true)

pinia.新订单初始化

</script>

<template>
  <div class="头部">
    <div></div>

    
    <lmButton > {{pinia.菜单页面名}}</lmButton>

    <lmButton :class="{退出登录:pinia.当前数据库状态!='已连接'}"> 服务器 {{pinia.当前数据库状态}}</lmButton>



    <lmButton>日期:{{pinia.日期}}</lmButton>

    <lmButton>当前用户:{{pinia.当前登录用户}}

    </lmButton>
    <lmButton :class="{退出登录:推出登录样式}" @click="退出登录">
      <icon 图标名="icon-close-circle" 颜色="#fff" font-size='23px' /> 退出登录
    </lmButton>
  </div>
</template>


<style scoped>
.头部 {
  display: grid;
  width: 100%;
  grid-template-columns: 3fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 10px;
  grid-auto-flow: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  background-color: #F0F2F5
}

.退出登录 {
  border:  #F56C6C;
  background-color: #F56C6C;
}
</style>
