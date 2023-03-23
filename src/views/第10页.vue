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

let 每日利润 = reactive(['05', '256'])
let 查年 = ref('')
let 查月 = ref('')
let 查日 = ref('')

let 本月利润 = reactive([])

for (let i = 0; i <= parseInt(日); i++) {
    let a = ("0" + i).slice(-2)
    本月利润.push(a)
}

let 日利润计算 = (年: string, 月: string, 日: string) => {
    let 本日利润 = 0
    let 本日订单数量 = 0
    for (let i in 库.订单表) {
     
        if (库.订单表[i].镜片下单日 ==  月 +'月'+ 日&&库.订单表[i].订单号.slice(0, 2) == '23') {
            
            if (库.订单表[i].镜片利润) { 
                本日利润 += Math.floor(库.订单表[i].镜片利润 )
                本日订单数量 += 1
             
                
            }
        }

    }
    return 日 + '日 '+本日订单数量+'单 利润 ' + 本日利润
}
let 月利润计算 = (年: string, 月: string,) => {
    let 本月利润 = 0
    for (let i in 库.订单表) {
        if (库.订单表[i].订单号.slice(0, 4) == 年 + 月) {
            if (库.订单表[i].镜片利润) 本月利润 += 库.订单表[i].镜片利润
        }

    }
    return 月 + '月 利润 ' + Math.floor(本月利润)
}

</script>

<template>
    <div class="第十页 ">
        <h1>第十页 利润</h1>

        <!-- <LRH v-for="(i, k) in 库.筛选过的订单" :key="i._id" :序号="k"></LRH> -->
        <div class="月">
            <div class="日" v-for="i in 本月利润">{{ 日利润计算("23", '03', i) }}</div>


        </div>
        <div class="月总">{{ 月利润计算("23", '03') }}</div>

    </div>
</template>


<style scoped lang="scss">
.第十页 {
    align-content: start;

    .月 {
        gap: 1px;
        background: $暗黄;
        grid-template-columns: repeat(10, 1fr);
        grid-template-rows: 1fr 1fr 1fr;


        .日 {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            background: $正黄;
            height: 100px;
            width: 100;
        }
    }
}
</style>
