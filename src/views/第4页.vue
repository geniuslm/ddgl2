<script setup lang="ts">
import { pinia库, 订单类 } from '@仓库/pinia库';
import lmB from "@组件/按钮.vue";
import { 获取Cookie, 删除Cookie, 设置Cookie } from "@仓库/cookie";
import { ref } from 'vue';
import DDH from "@组件/订单行.vue";



let 库 = pinia库();
let 新值 = ref("");
let 旧值 = ref("");

let 替换镜片名字 = async () => {
  let 更改数量 = 0
  for (let i in 库.订单表) {
    if (库.订单表[i].镜片 == 旧值.value) {
      库.订单表[i].镜片 = 新值.value;
      await 库.通讯('订单', "改", 库.订单表[i]);
      更改数量 += 1
    }
  }
  console.log("一共更改了" + 更改数量 + "个");

}
//打印函数


</script>

<template>
  <div class="第三页">
    <h1>这是第2页测试</h1>
    <div class="首行">
      <lmB @click="替换镜片名字()">替换镜片名字</lmB>
      <!-- <lmB v-print="'#printMe'">打印</lmB> -->
    
    </div>
    <div class="横向 平均行">
      <input v-model.lazy="新值" placeholder="新值">
      <input v-model.lazy="旧值" placeholder="旧值">
    </div>
    <div class="滑条 开始">

    </div>
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
  align-items: center;
  justify-content: center;
  justify-items: center;
  overflow: auto;
  background-color: #F0F2F5
}

.首行 {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr)) ;
  grid-template-rows: 1fr;
  gap: 5px;
  align-content: start;
  align-items: center;
  justify-content: center;
  justify-items: center;
  overflow: auto;
  background-color: #F0F2F5
}

.开始 {
  align-content: start;
}
</style>
