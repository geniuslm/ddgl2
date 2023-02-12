<script setup lang="ts">
import { pinia数据中心, 镜片类, 用户蓝图, } from '../stores/pinia数据';
import { pinia库, 订单类 } from '../stores/pinia库';
import lmH from "@组件/镜片行.vue";
import { socket } from '@/stores/socket链接';
//import { HubConnectionBuilder } from "@microsoft/signalr";
import { onMounted, ref, reactive } from "vue";



let 库 = pinia库();





let 利润=ref("0")
let 旧镜片名=ref("")
let 新镜片名=ref("")
let 测试 = () => {
    let 订单 
    let 镜片 
    for (订单 in 库.订单表){      
        for(镜片 in 库.镜片表){
            console.log(库.订单表[订单].镜片+"和"+库.镜片表[镜片].镜片名 );
            if(库.订单表[订单].镜片.trim()==旧镜片名.value){ 
               库.订单表[订单].镜片 = 新镜片名.value
               库.通讯("订单","改",库.订单表[订单])
            }
        }
 
    }
}


</script>

<template>

    <div class="第十页  滑条">
        <h1>第十页 测试</h1>
        <div class="横向 平均">
            <el-button @click="测试" type="success"> 改镜片名字</el-button>
            <input v-model.lazy="旧镜片名" placeholder="旧镜片名"  >
            <input v-model.lazy="新镜片名" placeholder="新镜片名"  >
            <el-button @click="测试" type="success"> 测试</el-button>
            <el-button @click="测试" type="success"> 测试</el-button>
        </div>
       
        <div v-for="(i, k) in 库.订单表" >{{ 库.订单表[k].镜片}} </div>


    </div>

</template>


<style scoped lang="scss">
.第十页 {

    align-content: start;


}

.平均 {
    grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
}
</style>
