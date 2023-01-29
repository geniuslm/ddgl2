<script setup lang = "ts">
import { pinia数据中心, 订单类 } from '../stores/pinia数据';
import { pinia库 } from '../stores/pinia库';
import lmInput from "@组件/十一页行.vue";
import lmh from "@组件/测试行.vue";
import lmSH from "@组件/首行.vue";
import lmButton from "@组件/按钮.vue";
import lmWin from "@组件/添加订单窗口.vue";
import { socket } from "../stores/socket链接";
import { onMounted, ref, toRef, computed, reactive } from 'vue';


let 库 = pinia库();
库.获取订单表11();

let 订单 = new (订单类)
let 测试=()=>{
    库.对比测试()
}
let 获取旧订单=()=>{
    库.获取旧订单()
}


</script>

<template>

    <div class="整页">


        <div class="第一行">         
            <h6>pinia数据:{{库.测试数据 }}</h6>
            
            <lmh v-for="(i,k) in 库.测试数据" v-model:行数据="库.测试数据[k] ">{{k}}</lmh >
        
        </div>
        <div>
            <h1>测试</h1>
            <lmButton @click="测试">对比测试</lmButton>
            <lmButton @click="获取旧订单">获取旧订单</lmButton>
        </div>






        <!-- 表格模块 -->
        <div class="表格外">
            <lmSH></lmSH>
            <div class="表格">
                <lmInput v-for="(i,k) in 库.订单表11" :行数据="库.订单表11[k]"></lmInput> 
                <!-- <lmInput v-for="(i,k) in 库.订单表11" v-model:行数据="库.订单表11[k]"></lmInput>  -->
                <!-- <lmInput v-model:行数据="库.订单表11[0]"></lmInput>  -->
                <!-- <lmh v-for="(i,k) in 库.订单表11" v-model:行数据="库.订单表11[k] "></lmh >      -->
            </div>

        </div>



    </div>

</template>


<style scoped>
.查找状态 {
    background-color: #337ecc;
}

.整页 {
    display: grid;
    width: 100%;
    grid-auto-flow: row;
    grid-template-rows: 50px 100px 1fr auto auto;
    grid-template-columns: 100%;
    align-content: start;
    align-items: start;
    background-color: #F0F2F5;
    position: relative;
    gap: 0px;
}

/* 滚动条整体 */
.表格::-webkit-scrollbar {
    height: 10px;
    width: 10px;
}

/* 两个滚动条交接处 -- x轴和y轴 */
.表格::-webkit-scrollbar-corner {
    background-color: transparent;
}

/* 滚动条滑块 */
.表格::-webkit-scrollbar-thumb {
    border-radius: 5px;
    box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.2);
    background: #535353;
}

/* 滚动条轨道 */
.表格::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.455);
}



.第一行 {
    display: grid;
    height: 50px;
    gap: 10px;
    grid-auto-flow: column;
    background-color: #F0F2F5
}

.表格 {
    display: grid;
    grid-template-columns: 1fr;
    height: 1fr;
    align-content: start;
    grid-auto-flow: row;
    overflow: auto;
    overflow-y: scroll;
}

.表格外 {
    display: grid;
    grid-template-columns: 1fr;
    align-content: start;
    grid-auto-flow: row;

    overflow: auto;
}

.添加订单 {
    display: grid;
    box-sizing: border-box;
    grid-template-columns: 1fr;
    align-content: start;
    grid-auto-flow: row;
    border: 5px solid #337ecc;
    border-radius: 10px;
    overflow: auto;
}


.分页整体 {
    gap: 2px;
    grid-auto-flow: row;
    grid-template-columns: 95px 1fr 95px;
}

.分页 {
    gap: 2px;
    grid-auto-flow: row;
    grid-template-columns: repeat(auto-fit, minmax(25px, 1fr));
}

.分页按钮 {
    height: 100%;
    width: 95px;
}
</style>
