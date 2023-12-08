<script setup lang = "ts">
import { pinia库, 订单类 } from '@仓库/pinia库';
import { socket } from "@仓库/socket链接";
import { ref } from 'vue';

let 库 = pinia库();

let 说明 = ref("文件说明");
const 文件上传处理函数= (event) => {
  const file = event.target.files[0];
  // 在这里你可以处理你的文件上传，比如发送到服务器等
  说明.value = `文件名称: ${file.name}，文件类型: ${file.type}，文件大小: ${file.size} 字节`;
  socket.emit('订单json', file, (返回数据: any) => { console.log(返回数据) });
};





</script>

<template>
  <div>
    <div>{{说明}}</div>
    <input type="file" @change="文件上传处理函数">

  </div>

</template>



<style  lang="scss" scoped>

</style>