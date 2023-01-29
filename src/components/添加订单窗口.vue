<script setup lang = "ts">
import { pinia数据中心 } from '../stores/pinia数据';
import lmInput from "@组件/行.vue";
import lmSH from "@组件/首行.vue";
import lmButton from "@组件/按钮.vue";
import { onMounted, ref, reactive } from 'vue';
import { socket } from '@/stores/socket链接';





let pinia = pinia数据中心();

// pinia.$subscribe((args: any) => {
//   if (args.events.key !== "旧订单") {
//     console.log('id', args.events.target._id)
//     console.log('key', args.events.key)
//     console.log('新值', args.events.newValue)
//     console.log('旧值', args.events.oldValue)
//   }
// }, { detached: true })

let 添加订单 = () => {

    console.log('添加订单');
}
let 修改与添加订单 = (行: any) => {
    socket.emit('修修改与添加订单', 行, (返回数据: any) => {
        console.log(返回数据)
        pinia.获取用户()
    });
}

let date  = new Date()                                                                //获取日期与时间
let 日期    = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()   //获取日期与时间
let 时间    = ref(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds())  //获取日期与时间
let month = ("0"+ (date.getMonth() + 1)).slice(-2)

pinia.新订单模板.订单号 = date.getFullYear().toString().slice(-2) +("0"+ (date.getMonth() + 1)).slice(-2) 



</script>
    
<template >

    <div class = "背景">

        <div class = "弹窗">
        <div class = "弹窗头">
                <div>{{ 日期 }} {{ 时间 }} {{ pinia.新订单模板 }}</div>
                <el-button @click = "pinia.添加订单窗口开关 = false" type = "danger">

                    <icon 图标名 = "icon-close-circle" 颜色 = "#FFFFFF" font-size = '30px' />
                </el-button>

            </div>
            <div class = "弹窗内部">
                <div>
                    <input type = "text" placeholder = "ID" v-model    = "pinia.新订单模板.订单号">
                    <input type = "text" placeholder = "收件人" v-model   = "pinia.新订单模板.收件人">
                    <input type = "text" placeholder = "旺旺名" v-model   = "pinia.新订单模板.旺旺名">
                    <input type = "text" placeholder = "镜片下单日" v-model = "pinia.新订单模板.镜片下单日">

                   
                    <input type = "text" placeholder = "备注" v-model = "pinia.新订单模板.备注">


                </div>
                <div>
                    <div class = "度数组">

                        <input type = "text"  v-model = "pinia.新订单模板.右近视" placeholder = "右近视" class = "度数组内部">
                        <input type = "text" v-model  = "pinia.新订单模板.右散光" placeholder = "右散光" class = "度数组内部">
                        <input type = "text" v-model  = "pinia.新订单模板.右轴向" placeholder = "右轴向" class = "度数组内部">
           

                    </div>
                    <div   class = "度数组">
                    <input type  = "text" v-model = "pinia.新订单模板.左近视" placeholder = "左近视" class = "度数组内部">
                    <input type  = "text" v-model = "pinia.新订单模板.左散光" placeholder = "左散光" class = "度数组内部">
                    <input type  = "text" v-model = "pinia.新订单模板.左轴向" placeholder = "左轴向" class = "度数组内部">
                  
                  





                    </div>

                </div>




                <!--  <el-button @click = "修改与添加订单(新订单)" type    = "danger">
                <icon 图标名               = "icon-close-circle" 颜色 = "#FFFFFF" font-size = '30px' />
                </el-button> -->

            </div>
        </div>
    </div>

</template>
    
    
<style scoped>
.背景 {
    position: absolute;
    /* position: fixed; */
    top             : 0;
    left            : 0;
    width           : 100%;
    height          : 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index         : 100;
}

.弹窗 {
    position        : absolute;
    top             : 50%;
    left            : 50%;
    width           : 50%;
    height          : 50%;
    transform       : translate(-50%, -50%);
    background-color: #dedfe0;
    border-radius   : 8px;
    z-index         : 1;

    display              : grid;
    grid-template-rows   : 30px 1fr;
    grid-template-columns: 1fr;

    
}

.弹窗头 {
    display              : grid;
    grid-auto-flow       : row;
    grid-template-rows   : 1fr;
    grid-template-columns: 1fr auto;
}

.弹窗内部 {
    display              : grid;
    grid-auto-flow       : row;
    grid-template-rows   : 1fr;
    grid-template-columns: 1fr 1fr;
}

.度数组 {
    display              : grid;
    grid-auto-flow       : row;
    grid-template-rows   : 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}

.度数组内部:nth-last-child(1) {
    border-radius: 0 10px 10px 0;
}

.度数组内部:nth-child(1) {
    border-radius: 10px 0 0 10px;
}



.关闭按钮 {
    background-color: #F56C6C;
}




input {
    box-sizing: border-box;

    border: 0.5px solid #409EFF;



    width : 180px;
    height: 50px;
    /* border-radius: 10px; */

    background-color: #dedfe0;
    text-align      : center;
    font-size       : 20px;
    font-weight     : bold;
}
</style>
