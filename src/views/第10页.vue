<script setup lang="ts">
import { pinia数据中心, 镜片类, 用户蓝图, } from '../stores/pinia数据';
import { pinia库, 订单类 } from '../stores/pinia库';
import LRH from "@组件/利润行.vue";
import { socket } from '@/stores/socket链接';
import { onMounted, ref, reactive, computed } from "vue";


let 库 = pinia库();
let 日期 = new Date()
let 月 = (日期.getMonth() + 1)



let 选择年 = ref('23')

let 显示月份 = computed(() => {
    let 月份 = []
    if (选择年.value == '23') {
       // for (let i = 1; i <= 月; i++) {     
        for (let i = 月; i >=1; i--) {     
            月份.push(("0" + i).slice(-2))
        }
    }
    if (选择年.value != '23') {
        for (let i = 12; i >=1; i--) {
            月份.push(("0" + i).slice(-2))
        }
    }
    return 月份
})



//计算属性

let 利润计算属性 = computed(() => {
    let 每日利润 = {}
    let 每月利润 = {}
    for (let i = 1; i <= 12; i++) {
        let 每月 = ("0" + i).slice(-2)
        每日利润[每月] = {}
        每月利润[每月 + '月总计'] = { 利润: 0, 订单数量: 0, 奖金: 0 }
        for (let j = 1; j <= 31; j++) {
            let 日期 = 选择年.value + ("0" + i).slice(-2) + ("0" + j).slice(-2)
            每日利润[每月][日期] = { 利润: 0, 订单数量: 0, 奖金: 0 }
        }

    }
    if (库.订单表) {
        for (let i in 库.订单表) {
            if (库.订单表[i].镜片利润&&库.订单表[i].镜片下单日) {
                // 改成镜片下单日
                // let 每月 = 库.订单表[i].订单号.slice(2, 4)
                // let 日期 = 库.订单表[i].订单号.slice(0, 6)
                let 每月 = 库.订单表[i].镜片下单日.slice(0, 2)
                let 日期 = 库.订单表[i].订单号.slice(0, 2)+每月+库.订单表[i].镜片下单日.slice(-2)
                if (每日利润[每月][日期]) {
                    每日利润[每月][日期].利润 += 库.订单表[i].镜片利润
                    每日利润[每月][日期].利润 = parseFloat(每日利润[每月][日期].利润.toFixed(2))
                    每日利润[每月][日期].订单数量 += 1
                    if (每日利润[每月][日期].订单数量 >= 3) { 每日利润[每月][日期].奖金 = 10 }
                    if (每日利润[每月][日期].订单数量 >= 5) { 每日利润[每月][日期].奖金 = 30 }
                    if (每日利润[每月][日期].订单数量 >= 7) { 每日利润[每月][日期].奖金 = 50 }
                    if (每日利润[每月][日期].订单数量 >= 9) { 每日利润[每月][日期].奖金 = 100 }
                    if (每日利润[每月][日期].订单数量 >= 11) { 每日利润[每月][日期].奖金 = 150 }
                    if (每日利润[每月][日期].订单数量 >= 13) { 每日利润[每月][日期].奖金 = 200 }
                    if (每日利润[每月][日期].订单数量 >= 15) { 每日利润[每月][日期].奖金 = 260 }
                    if (每日利润[每月][日期].订单数量 >= 17) { 每日利润[每月][日期].奖金 = 320 }
                    if (每日利润[每月][日期].订单数量 >= 20) { 每日利润[每月][日期].奖金 = 400 }
                    每月利润[每月 + '月总计'].利润 += 库.订单表[i].镜片利润
                    每月利润[每月 + '月总计'].订单数量 += 1
                }

            }
        }
    }
    for (let i in 每日利润) {
        for (let j in 每日利润[i]) {
            每月利润[i + '月总计'].奖金 += 每日利润[i][j].奖金
        }
        每月利润[i + '月总计']['利润'] = parseFloat(每月利润[i + '月总计']['利润'].toFixed(2))
    }
    //每日利润 排序

  
    
    return { 每日利润: 每日利润, 每月利润: 每月利润 }
})










</script>

<template>
    <div class="第十页 滑条">
        <div class="首行">
            <div>20{{ 选择年 }}年利润</div>
            <select v-model="选择年">
                <option disabled value="">请选择</option>
                <option value="22">2022年</option>
                <option value="23">2023年</option>
                <option value="24">2024年</option>
            </select>
        </div>
        <div class="年 滑条">
            <div v-for="k in 显示月份" :key="k">

                <div class="月总">
                    <div>20{{ 选择年 }}年 {{ k }}月 利润</div>
                    <div>利润 {{ 利润计算属性['每月利润'][k + '月总计']['利润'] }} </div>
                    <div>订单数量 {{ 利润计算属性['每月利润'][k + '月总计']['订单数量'] }} </div>
                    <div>奖金 {{ 利润计算属性['每月利润'][k + '月总计']['奖金'] }} </div>
                </div>
                <div class="月">
                    <div class="日" v-for="j, a in 利润计算属性['每日利润'][k]">
                        <div>{{ String(a).slice(2, 4) }}月{{ String(a).slice(4, 6) }}</div>
                        <div> {{ j['利润'] }}元 </div>
                        <div> 共{{ j['订单数量'] }}单 奖金{{ j['奖金'] }}</div>
                     
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.第十页 {
    align-content: start;
    font-size: 14px;
    font-weight: bold;
    grid-template-columns: 1fr;
    grid-template-rows: 50px 1fr;
    gap: 10px;

    .首行 {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        border-radius: 10px;
        background: $正绿;
        font-size: 30px;
        color: $深灰;
    }

    .年 {
        gap: 30px;
        align-content: start;
    }

    .月 {
        gap: 5px;
        background: $正绿;
        grid-template-columns: repeat(10, 1fr);
        grid-template-rows: 1fr 1fr 1fr;


        .日 {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            background: $浅绿;
            height: 60px;
            width: 100;
        }
    }

    .月总 {
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr;
        background: $正绿;
        font-size: 20px;
        font-weight: bold;
        color: $深灰;
        height: 50px;
        width: 100;
    }


    select {
        width: 200px;
        height: 40px;
        font-size: 25px;
        font-weight: bold;
        color: #333;
        border: none;
        border-radius: 4px;
        background-color: $浅绿;
        text-align: center;
        cursor: pointer;
    }

    select:hover {
        border: none;
    }

    select:focus {
        outline: none;
        border: none;
        box-shadow: 0 0 0 2px $暗绿(0, 102, 255, 0.3);
    }

    select option {
        font-size: 20px;
        font-weight: bold;
        color: $深灰;
        text-align: center;
    }
}
</style>
