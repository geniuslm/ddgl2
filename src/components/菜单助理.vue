<script setup lang="ts">
import {pinia数据中心} from "@仓库/pinia数据";
import {pinia库} from "@仓库/pinia库";
import {reactive, ref} from "vue";

import {useRouter} from 'vue-router';

let pinia = pinia数据中心();
let 库 = pinia库();
let 路由 = useRouter()
let 跳转 = (路径: any) => {
  库.菜单页面名 = 路径.路径
  路由.push(路径.路径);
}


let 菜单列表 = reactive([
  {路径: "/mr", 内容: "默认页", 图标: "lm-file"},
  {路径: "/02", 内容: "测试页面", 图标: "lm-question-circle"},
  {路径: "/03", 内容: "cookie测试", 图标: "lm-team"},
  {路径: "/04", 内容: "镜片库存", 图标: "lm-filedone"},
  {路径: "/01", 内容: "镜片订单", 图标: "lm-star-fill"},
  {路径: "/06", 内容: "镜框列表", 图标: "lm-table"},
  {路径: "/05", 内容: "镜框订单", 图标: "lm-accountbook"},
  {路径: "/08", 内容: "镜片列表", 图标: "lm-table"},
  {路径: "/09", 内容: "用户表", 图标: "lm-team"},
  {路径: "/10", 内容: "利润", 图标: "lm-linechart"},
  {路径: "/07", 内容: "镜片对账", 图标: "lm-accountbook"},
  {路径: "/11", 内容: "订单表", 图标: "lm-taobao"}, 
  { 路径: "/08T", 内容: "镜片测试", 图标: "lm-question-circle" },
])
let 常用列表 = reactive([
  {路径: "/11", 内容: "订单表", 图标: "lm-taobao"},
  {路径: "/10", 内容: "利润", 图标: "lm-linechart"},
  {路径: "/01", 内容: "镜片订单", 图标: "lm-star-fill"},
  {路径: "/04", 内容: "镜片库存", 图标: "lm-filedone"},
  {路径: "/08", 内容: "镜片列表", 图标: "lm-table"},
])


let 开关 = ref(true);

let 测试 = () => {
  console.log('登录类型' + 库.当前登录用户类型);
}


</script>

<template>
  <div class="菜单" :style="[开关 ? ' width:  130px' : 'width: 50px']">

    <div v-for="(按钮,index) in 常用列表" :key="index" @click="跳转(常用列表[index])"
         :class="{ 当前: 常用列表[index].路径 === 库.菜单页面名,按钮:true }">
      <icon :图标名="按钮.图标" color="#fff" :font-size="开关?'20px':'30px'"/>
      <p v-if="开关">{{ 按钮.内容 }}</p>
    </div>
    <div class="间隔"></div>
    <div class="按钮">其他</div>

    <div v-for="(按钮,index) in 菜单列表" :key="index" @click="跳转(菜单列表[index])"
         :class="{ 当前: 菜单列表[index].路径 === 库.菜单页面名,按钮:true }">
      <icon :图标名="按钮.图标" color="#fff" :font-size="开关?'20px':'30px'"/>
      <p v-if="开关">{{ 按钮.内容 }}</p>
    </div>

    <div class="展开按钮" @click="开关 = !开关"></div>

  </div>
</template>

<style lang="scss" scoped>
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

.间隔 {
  height: 30px;
}

.其他 {
  height: 30px;
  text-align: center;
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
  border: 2px solid $背景;
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

.按钮 {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 1fr;
  grid-template-columns: 30px 1fr;
  box-sizing: border-box;
  border: 2px solid #409EFF;
  width: 100%;
  border-radius: 4px;
  padding: 4px 8px;
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

.按钮:hover {

  background-color: #79bbff;
  border: 2px solid #79bbff;
}

.按钮:active {
  background-color: #337ecc;
  border: 2px solid #337ecc;
}

.当前 {
  height: 50px;
  background-color: #1c82e7;
}

</style>
