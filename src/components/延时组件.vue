<script setup lang="ts">
import {onMounted, ref} from 'vue'
import { socket } from "@仓库/socket链接";


let 延时 = ref(0)
//计算连接到socket 服务器的延迟函数
let 计算延时 = () => {
  let 开始时间 = Date.now()
  socket.emit('测试', '查','',() => {
    let 结束时间 = Date.now()
    延时.value = 结束时间 - 开始时间
  })
}

onMounted(() => {
  计算延时()
})

</script>

<template>

  <div >
    <div @click="计算延时" class="延时">{{ 延时 }}ms</div>
  </div>

</template>


<style lang="scss" scoped>
.延时 {
  &:hover {
    cursor: default;
    color: $暗绿;
  }
  font: 18px/1.5 "Microsoft YaHei";
  font-weight: bold;
  color: $正绿;
}
</style>
