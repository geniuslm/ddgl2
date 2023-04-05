<script setup lang="ts">
import { pinia库, 订单类 } from '@仓库/pinia库';
import lmB from "@组件/按钮.vue";
import { 获取Cookie, 删除Cookie, 设置Cookie } from "@仓库/cookie";
import { ref, onMounted, reactive, computed, watch } from 'vue';
import html2canvas from 'html2canvas';
import DDH from "@组件/订单行.vue";



let 库 = pinia库();

let 近视起点 = ref(300)
let 近视终点 = ref(1000)

//let 尼德克单光174 = 库.镜片表.find(镜片 => 镜片.镜片名 === "尼德克单光1.74")
let 尼德克单光174 = computed(() => {
  if (库.镜片表.find(镜片 => 镜片.镜片名 === "尼德克单光1.74")) {
    return 库.镜片表.find(镜片 => 镜片.镜片名 === "尼德克单光1.74")
  }
  else {
    return {}
  }
}
)
let 尼德克单光174库存 = computed(() => {
  if (库.镜片表.find(镜片 => 镜片.镜片名 === "尼德克单光1.74")) {
    return 库.镜片表.find(镜片 => 镜片.镜片名 === "尼德克单光1.74").库存
  }
  else {
    return {}
  }
}
)
let data = computed(() => {
  let data = []
  for (let 近 = 近视起点.value; 近 <= 近视终点.value; 近 = 近 + 25) {
    //大于1000度的近视必须被50整除
    if (近 > 1000) {
      if (近 % 50 === 0) {
        for (let 散 = 0; 散 <= 200; 散 = 散 + 25) {
          if (散 !== 25) {
            data.push(`近${近}散${散}`)
          }
        }
      }
    }
    else {
      for (let 散 = 0; 散 <= 200; 散 = 散 + 25) {
        if (散 !== 25) {
          data.push(`近${近}散${散}`)
        }
      }
    }
  }
  return data
})


let 测试 = () => {
  console.log(尼德克单光174.value)
  console.log(尼德克单光174.value['库存'])
  库.通讯('镜片', "改", 尼德克单光174.value);
}

let 改变 = (i) => {
  console.log(尼德克单光174库存.value[i])
  console.log(i)
  库.通讯('镜片', "改", 尼德克单光174.value);
}

</script>

<template>
  <div class="第三页 滑条">
    <h1>保存</h1>
    <div class="首行">
      <input type="number" v-model="近视起点">
      <input type="number" v-model="近视终点">
    </div>
    <lmB @click="测试()">测试</lmB>
    <div>{{ 尼德克单光174库存 }}</div>
    <div class="镜片表 滑条">
      <div v-for="i in data" class="镜片块">
        <div> {{ i }}</div>
        <input @change="改变(i)" type="number" v-model="尼德克单光174库存[i]">
      </div>
    </div>



  </div>
</template>

<style scoped lang="scss">
.列表 {
  height: 200px;
}

.第三页 {
  grid-template-columns: 1fr;
  grid-template-rows: 40px 40px 40px auto auto;
  gap: 2px;
  align-content: start;
  background-color: $背景;

  .首行 {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }

  .镜片表 {
    gap: 2px;
    align-content: start;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(40px);
    background-color: $暗绿;

    .镜片块 {
      grid-template-columns: 1fr 30px;
      grid-template-rows: 1fr;
      background-color: $浅绿;

      input {
        color: #fff;
        font-weight: bold;
        text-align: center;
        font-size: 15px;
        border: none;
        width: 100%;
        height: 100%;
        background-color: $浅绿;
      }
    }

  }

}
</style>
