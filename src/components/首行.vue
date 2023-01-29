<script setup lang="ts">
import { pinia数据中心 } from '../stores/pinia数据';
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue';

//接收参数
let pinia = pinia数据中心();
let 属性与值 = pinia.旧订单搜索属性与值



</script>
<template>
  <div class="行" >
    <!-- <input type="text" @click="pinia.正反 *= -1" v-model="pinia.要搜索的值" placeholder="_id" @focus="pinia.行的属性 = '_id'">
    <input type="text" @click="pinia.正反 *= -1" v-model="pinia.要搜索的值" placeholder="旺旺名" @focus="pinia.行的属性 = '旺旺名'">
    <input type="text" @click="pinia.正反 *= -1" v-model="pinia.要搜索的值" placeholder="收件人" @focus="pinia.行的属性 = '收件人'">
    <input type="text" @click="pinia.正反 *= -1" v-model="pinia.要搜索的值" placeholder="镜片下单日" @focus="pinia.行的属性 = '镜片下单日'">
    <input type="text" @click="pinia.正反 *= -1" v-model="pinia.要搜索的值" placeholder="镜片" @focus="pinia.行的属性 = '镜片'"> -->
     
    <!-- class 是显示筛选之后的不同的样式 v-model绑定要搜索的值 :placeholder是默认显示的文字 -->
    <input type="text" :class="{ 查找状态: 属性与值[0].值 !== '' }" v-model.lazy="属性与值[0].值" :placeholder=属性与值[0].属性>
    <input type="text" :class="{ 查找状态: 属性与值[1].值 !== '' }" v-model.lazy="属性与值[1].值" :placeholder=属性与值[1].属性>
    <input type="text" :class="{ 查找状态: 属性与值[2].值 !== '' }" v-model.lazy="属性与值[2].值" :placeholder=属性与值[2].属性>
    <input type="text" :class="{ 查找状态: 属性与值[3].值 !== '' }" v-model.lazy="属性与值[3].值" :placeholder=属性与值[3].属性>
    <input type="text" :class="{ 查找状态: 属性与值[4].值 !== '' }" v-model.lazy="属性与值[4].值" :placeholder=属性与值[4].属性>
    <input type="text" :class="{ 查找状态: 属性与值[5].值 !== '' }" v-model.lazy="属性与值[5].值" :placeholder=属性与值[5].属性>
    <input type="text" :class="{ 查找状态: 属性与值[6].值 !== '' }" v-model.lazy="属性与值[6].值" :placeholder=属性与值[6].属性>
    <input type="text" :class="{ 查找状态: 属性与值[7].值 !== '' }" v-model.lazy="属性与值[7].值" :placeholder=属性与值[7].属性>
    <input type="text" :class="{ 查找状态: 属性与值[8].值 !== '' }" v-model.lazy="属性与值[8].值" :placeholder=属性与值[8].属性>
    <input type="text" :class="{ 查找状态: 属性与值[9].值 !== '' }" v-model.lazy="属性与值[9].值" :placeholder=属性与值[9].属性>
    <input type="text" :class="{ 查找状态: 属性与值[10].值 !== '' }" v-model.lazy="属性与值[10].值" :placeholder=属性与值[10].属性>
    <input type="text" :class="{ 查找状态: 属性与值[11].值 !== '' }" v-model.lazy="属性与值[11].值" :placeholder=属性与值[11].属性>
    <input type="text" :class="{ 查找状态: 属性与值[12].值 !== '' }" v-model.lazy="属性与值[12].值" :placeholder=属性与值[12].属性>
    <input type="text" :class="{ 查找状态: 属性与值[13].值 !== '' }" v-model.lazy="属性与值[13].值" :placeholder=属性与值[13].属性>
    <input type="text" :class="{ 查找状态: 属性与值[14].值 !== '' }" v-model.lazy="属性与值[14].值" :placeholder=属性与值[14].属性>
    <input type="text" :class="{ 查找状态: 属性与值[15].值 !== '' }" v-model.lazy="属性与值[15].值" :placeholder=属性与值[15].属性>


  









  </div>

</template>


<style scoped>
.行 {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 100px repeat(3, 30px) 100px 200px 120px 170px repeat(6, 60px) 100px 1fr;
  grid-template-rows: 25px;
  align-content: flex-start;
  background-color: #F0F2F5
}

.查找状态 {
  background-color: #223f14;
}

input {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 0.5px solid rgb(225, 225, 225);
  color: #ffffff;
  background-color: #409EFF;
  border-radius: 5px;
  margin: 0;
}

input[type="text"] {
  text-align: center;
  color: #ffffff;
}

input::-webkit-input-placeholder {
  color: #ffffff;
}

input:hover {
  border: 1px solid rgb(36, 168, 0);
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
  top: 25px;
  z-index: 5;
}


</style>
