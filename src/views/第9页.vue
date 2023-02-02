<script setup lang="ts">
import { pinia数据中心,订单类,镜片类 } from '../stores/pinia数据';

import lmH from "@组件/镜片行.vue";


let pinia = pinia数据中心();
pinia.获取旧订单();
let 镜片A= new 镜片类()
镜片A=pinia.镜片数据[0]
</script>

<template>

    <div class="第九页">
        <h1>第九页</h1>
        <h3>{{镜片A}}</h3>
      
        <h2 v-for="i,k in 镜片A" :key="k" > {{k}}-----{{镜片A[k]}}   </h2>


        <div> pinia数据-----------------{{pinia.镜片数据}}</div>
    <div>
    <div></div>
        <lmH v-for="行, k in pinia.镜片数据" :key="行._id"  v-model:行=pinia.镜片数据[k]></lmH>
    </div>
    </div>

</template>


<style scoped lang="scss">
.第九页 {
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: auto;
    align-content: start;
    align-items: start;
    background-color: #F0F2F5;
    gap: 0px;
}

</style>
