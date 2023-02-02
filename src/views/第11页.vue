<script setup lang = "ts">
import { pinia数据中心,  镜片类 } from '../stores/pinia数据';
import { pinia库,订单类} from '../stores/pinia库';
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
let alert2=()=>{
    let 订单=new 订单类
    订单.旺旺名='哈哈'
    alert(JSON.stringify(订单))
}


</script>

<template>

    <div >

        <div class="顶部 ">
            <el-button type="primary">Primary</el-button>
        
         
            <lmButton @click="测试">对比测试</lmButton>
            <lmButton @click="获取旧订单">获取旧订单</lmButton>
            <lmButton @click="alert2">alert</lmButton>
        </div>


        <!-- 表格模块 -->
        <div class="">
            <lmSH></lmSH>
            <div class="">
                <lmInput v-for="(i,k) in 库.订单表11" :行数据="库.订单表11[k]"></lmInput> 
                <!-- <lmInput v-for="(i,k) in 库.订单表11" v-model:行数据="库.订单表11[k]"></lmInput>  -->
                <!-- <lmInput v-model:行数据="库.订单表11[0]"></lmInput>  -->
                <!-- <lmh v-for="(i,k) in 库.订单表11" v-model:行数据="库.订单表11[k] "></lmh >      -->
            </div>

        </div>



    </div>

</template>



<style  lang="scss" scoped>
.顶部{

 grid-template-columns: repeat(auto-fit,minmax(1px, 1fr))   ;
}
</style>