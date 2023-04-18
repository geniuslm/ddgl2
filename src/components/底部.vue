<script setup lang="ts">
import { pinia库 } from '../stores/pinia库';
import { useRouter } from 'vue-router';
import { socket } from "../stores/socket链接";
import lmButton from "@组件/新版按钮.vue";
import { ref } from 'vue';
import { 获取Cookie, 删除Cookie, 设置Cookie } from "@仓库/cookie";

let 库 = pinia库()



const 下载链接 = ref('');
const 文件名 = ref('');
const 种类 = ref('订单表');

const 备份订单表 = () => {
  let json:any;
  if( 种类.value==='订单表') json = JSON.stringify(库.订单表, null, 2);
  if( 种类.value==='镜片表') json = JSON.stringify(库.镜片表, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  let date = new Date();
  let 年 = date.getFullYear() - 2000;
  let 月 = date.getMonth() + 1;
  let 日 = date.getDate();
  let 小时 = date.getHours();
  let 分钟 = date.getMinutes();
  文件名.value = `${种类.value}- ${年}年${月}月${日}日-${小时}点${分钟}备份.json`;
  下载链接.value = url;
}

</script>

<template>
  <div class="底部">
    <!-- 一个选项 -->

    <select v-if="库.当前登录用户类型==='助理'" v-model="种类">
      <option value="订单表">订单表</option>
      <option value="镜片表">镜片表</option>
    </select>
 
    <button v-if="库.当前登录用户类型==='助理'" @click="备份订单表()">备份{{ 种类 }}</button>
    <a v-if="下载链接" :href="下载链接" :download="文件名" @click="下载链接 = ''">点击下载</a>

  </div>
</template>


<style scoped>
.底部 {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr ;
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
