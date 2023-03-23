<script setup lang="ts">
import { pinia库 } from '../stores/pinia库';
import { useRouter } from 'vue-router';
import { socket } from "../stores/socket链接";
import lmButton from "@组件/新版按钮.vue";
import { ref } from 'vue';
import { 获取Cookie, 删除Cookie, 设置Cookie } from "@仓库/cookie";

let 库 = pinia库()

//一个测试
let 同步判定 = ref("同步判定")
let 同步判定函数 = () => {
  let 订单表排序 = 库.订单表.sort((a: any, b: any) => { return a.订单号 - b.订单号 })
  let 筛选过的订单排序 = 库.筛选过的订单.sort((a: any, b: any) => { return a.订单号 - b.订单号 })
  socket.emit('订单', "获", (返回数据: any) => {
    let 返回数据排序 = 返回数据.sort((a: any, b: any) => { return a.订单号 - b.订单号 })

    if (JSON.stringify(返回数据排序) == JSON.stringify(订单表排序)) {
      console.log("服务器和订单表一样")
      同步判定.value = "一样"
    }
    else {
      console.log("服务器和订单表不一样")
      同步判定.value = "不一样"
    }
  });

}



</script>

<template>
  <div class="底部">
    <!-- <div></div>

    <button @click="同步判定函数()">订单同步判定</button>
    <div>{{ 同步判定 }}</div>

    <div>订单表数目=={{ 库.订单表.length }}</div> -->



  </div>
</template>


<style scoped>
.底部 {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
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
