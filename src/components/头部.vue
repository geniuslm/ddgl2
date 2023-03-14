<script setup lang="ts">
import { pinia库 } from '../stores/pinia库';
import { useRouter } from 'vue-router';
import { socket } from "../stores/socket链接";
import lmButton from "@组件/新版按钮.vue";
import { ref, onMounted } from 'vue';
import { 获取Cookie, 删除Cookie, 设置Cookie } from "@仓库/cookie";


let 库 = pinia库()
let router = useRouter()

let 退出登录 = () => {
  删除Cookie("当前登录用户");
  删除Cookie("token");
  router.push("/login");
}

socket.on("connect", () => {
  库.当前数据库状态 = "已连接"
  console.log("数据库已连接");
});

socket.on("disconnect", () => {
  库.当前数据库状态 = "断开连接"
  console.log("数据库链接断开");
});
onMounted(() => {
  库.初始化()

})

let 推出登录样式 = ref(true)

</script>

<template>
  <div class="头部">
    <div></div>


    <lmButton> {{ 库.菜单页面名 }}</lmButton>

    <lmButton :class="{ 退出登录: 库.当前数据库状态 != '已连接' }"> 服务器 {{ 库.当前数据库状态 }}</lmButton>



    <lmButton>日期:{{ 库.月日 }}</lmButton>

    <lmButton>当前用户:{{ 库.当前登录用户 }} {{ 库.当前登录用户类型 }}</lmButton>
    <lmButton :class="{ 退出登录: 推出登录样式 }" @click="退出登录">
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
  border: #F56C6C;
  background-color: #F56C6C;
}
</style>
