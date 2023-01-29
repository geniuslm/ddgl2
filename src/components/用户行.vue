<script setup lang="ts">
import { socket } from "../stores/socket链接";
import { pinia数据中心 } from "../stores/pinia数据";
import { storeToRefs } from "pinia";

let pinia = pinia数据中心();
const { 用户 } = storeToRefs(pinia);


let 修改与添加用户 = (行: any) => {
  socket.emit('修改用户', 行, (返回数据: any) => {
    console.log(返回数据)
    pinia.获取用户()
  });
}
let 删除用户 = (行: any) => {
  socket.emit('删除用户', 行, (返回数据: any) => {
    console.log(返回数据)
    pinia.获取用户()
  });
}

</script>

<template>
  <div class="表"> 
    <div class="行" v-for="(行, index) in 用户" :key="index">

      <input type="text" v-model="用户[index]['用户名']">
      <input type="text" v-model="用户[index]['密码']">
      <input type="text" v-model="用户[index]['手机号']">
      <button @click="修改与添加用户(用户[index])">修改与添加用户</button>
      <button @click="删除用户(用户[index])">删除用户</button>

    </div>
  </div>

</template>


<style scoped>
.表{

  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto-fit, minmax(40px, auto));

}

.行 {
  display: grid;
  width: 100%;
  height: 100%;
  grid-auto-flow: column;
  grid-template-columns: minmax(40px, 1fr) minmax(40px, 1fr) minmax(40px, 1fr);
  grid-template-rows: repeat(auto-fit, minmax(20px, 10px));
  grid-gap: 2px;
  align-content: center;
  justify-content: space-between;
  grid-template-rows: 25px;
  background-color: #F0F2F5
}

input {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 0.5px solid rgb(225, 225, 225);
  border-radius: 5px;
  background-color: #F0F2F5;
  margin: 0;
}

input[type="text"] {
  text-align: center;
}

input:hover {
  box-sizing: border-box;
  border: 0.5px solid rgb(36, 168, 0);
}

input:focus {
  outline: none;
  box-shadow: 0px 0px 3px 1px rgb(50, 216, 4);
  z-index: 99;

}

.单元格 {
  position: relative;
}

.下滑菜单 {
  display: grid;
  gap: 5px;
  position: absolute;
  border-radius: 5px;
  background-color: #F0F2F5;
  box-shadow: 0px 0px 3px 1px rgb(50, 216, 4);
  height: auto;
  top: 35px;
  z-index: 5;
}

button {
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: repeat(auto-fit, minmax(30px, 1fr));
  box-sizing: border-box;
  border: 2px solid #67C23A;
  width: 100%;
  border-radius: 4px;
  padding: 4px 8px;
  font-family: Arial;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  height: 40px;
  overflow: hidden;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  background-color: #67C23A;
  transition: all 0.2s;
}

button:hover {
  background-color: #95d475;
  border: 5px solid #95d475;
}

button:active {
  background-color: #529b2e;
  border: 5px solid #67C23A;
}
</style>
