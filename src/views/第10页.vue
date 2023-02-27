<script setup lang="ts">
import { pinia数据中心, 镜片类, 用户蓝图, } from '../stores/pinia数据';
import { pinia库, 订单类 } from '../stores/pinia库';
import LRH from "@组件/利润行.vue";
import { socket } from '@/stores/socket链接';
import { onMounted, ref, reactive } from "vue";



let 库 = pinia库();
let 日期 = new Date()
let 年 = 日期.getFullYear().toString().slice(2)
let 月 = ("0" + (日期.getMonth() + 1)).slice(-2)
let 日 = ("0" + 日期.getDate()).slice(-2)

let 起始日期 = 年 + 月 + 日

let 每日利润 = reactive(['05','256'])
let 查年 = ref('')
let 查月 = ref('')
let 查日 = ref('')

let 本月利润 = reactive([])

for (let i = 0; i < parseInt(日); i++) {
    let a=("0" + i).slice(-2)
    本月利润.push(a)
}

</script>

<template>
    <div class="第十页  滑条">
        <h1>第十页 利润</h1>
        <input  v-model.lazy="查年" placeholder="年" >
        <input  v-model.lazy="查月" placeholder="月" >
        <input  v-model.lazy="查日" placeholder="日" >
        <!-- <LRH v-for="(i, k) in 库.筛选过的订单" :key="i._id" :序号="k"></LRH> -->
        <div v-for="i in 本月利润">{{ i+'日' }}</div>
    
    


    </div>
</template>


<style scoped lang="scss">
.第十页 {
    align-content: start;
}

</style>
