<script setup lang="ts">
import { pinia库, 订单类 } from '@仓库/pinia库';
import lmB from "@组件/按钮.vue";
import { 获取Cookie, 删除Cookie, 设置Cookie } from "@仓库/cookie";
import { ref } from 'vue';
import DDH from "@组件/订单行.vue";



let 库 = pinia库();
let 保存=()=>{
  console.log(库.订单表);
}

const data = {
  name: 'Alice',
  age: 30,
};

const saveToFile = () => {
  const json = JSON.stringify(库.订单表, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'data.json';
  link.click();
  URL.revokeObjectURL(url);
};

</script>

<template>
  <div class="第三页">
    <h1>保存</h1>
    <lmB @click="保存()">保存</lmB>
    <lmB @click="saveToFile()">saveToFile</lmB>
  </div>
</template>

<style scoped lang="scss">
.列表 {
  height: 200px;
}

.第三页 {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40px 40px 40px auto;
  gap: 2px;
  align-content: start;
  background-color: $背景;
}

</style>
