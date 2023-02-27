<script setup lang="ts">
import { pinia库, 订单类 } from '@仓库/pinia库';
import lmB from "@组件/按钮.vue";
import { 获取Cookie, 删除Cookie, 设置Cookie } from "@仓库/cookie";
import { ref } from 'vue';

let 库 = pinia库();
let 新值 = ref("");
let 旧值 = ref("");

let 替换 = async () => {
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
let 订单号 = async () => {
  for (let i in 库.订单表) {
    库.订单表[i].订单号 = 库.订单表[i].订单号.slice(0,8)
    await 库.通讯('订单', "改", 库.订单表[i]);
  }
}

let 旺旺号判定 = (行数据) => {
  行数据.购买记录 = []
  let 筛选过的订单表 = 库.订单表.filter((行: any) => {
    return 行.旺旺名 == 行数据.旺旺名
  })
  let 深拷贝的订单表 = JSON.parse(JSON.stringify(筛选过的订单表))
  for (let i in 深拷贝的订单表) {
    if (深拷贝的订单表[i].订单号 < 行数据.订单号) {
      delete 深拷贝的订单表[i].购买记录
      delete 深拷贝的订单表[i].编辑记录
      行数据.购买记录.push(JSON.stringify(深拷贝的订单表[i]))
    }
  }
}

let 购买记录 = async () => {
  for (let i in 库.订单表) {

    旺旺号判定(库.订单表[i])
    console.log(库.订单表[i].购买记录.length);

    库.通讯('订单', "改", 库.订单表[i]);

  }
}


</script>

<template>
  <div class="第三页">
    <h1>这是第三页 cookie</h1>
    <div class="首行">
      <lmB @click="替换()">替换</lmB>
      <lmB @click="订单号()">订单号</lmB>
      <lmB @click="购买记录()">购买记录</lmB>
    </div>
    <div class="横向 平均行">
      <input v-model.lazy="新值" placeholder="新值">
      <input v-model.lazy="旧值" placeholder="旧值">
    </div>
    <div class="滑条 开始">
      <div v-for=" i in  库.订单表">{{ i.订单号}}</div>
      <!-- <div v-for=" i in  库.订单表">{{ i.旺旺名 }}____________{{i.购买记录.length }} </div> -->
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
  grid-template-columns: 1fr 1fr 1fr 210px;
  grid-template-rows: repeat(auto-fit, minmax(20px, 32px));
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
