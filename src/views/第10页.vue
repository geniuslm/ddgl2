<script setup lang="ts">
import { pinia数据中心, 镜片类, 用户蓝图,  } from '../stores/pinia数据';
import { pinia库,订单类 } from '../stores/pinia库';
import lmH from "@组件/镜片行.vue";
import { socket } from '@/stores/socket链接';
//import { HubConnectionBuilder } from "@microsoft/signalr";
import { ref, reactive } from "vue";


let pinia = pinia数据中心();
let 库 = pinia库();



let 订单=new 订单类()

</script>

<template>

    <div class="第十页">
        <h1>第十页</h1>
        <el-button @click="" type="success"> 发送 参数 测试</el-button>
        <el-button  type="success"> 订单 {{ 订单 }}  </el-button>

    </div>

</template>


<style scoped lang="scss">
.第十页 {
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: auto;
    align-content: start;
    align-items: start;
    background-color: #F0F2F5;
    gap: 0px;
}
</style>
