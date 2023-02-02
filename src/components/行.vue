<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, toRefs, reactive } from 'vue';
import Icon from './icons/Icon.vue';
import { socket } from "../stores/socket链接";
import { pinia数据中心 } from '../stores/pinia数据';

let pinia = pinia数据中心();
//接收参数
let { 行 } = defineProps({
  行: {
    type: Object,
    default: '空',
  }
})

let 显示开关 = ref(true)
let 修改开关 = ref(false)
let 新订单开关 = ref(false)
let 删除订单开关 = ref(false)
let 展开开关 = ref(false)


// 新订单初始化
if (行.类型 == '新订单') {
  行.订单号 = pinia.新订单初始化
  新订单开关.value = true
  显示开关.value = false
}
// 删除订单初始化
if (行.删除信息 !== '') {
  显示开关.value = false
  删除订单开关.value = true

}

let 修改订单 = (行: any) => {
  socket.emit('修改与添加订单', 行, (返回数据: any) => {
    console.log(返回数据)
  });
  修改开关.value = false
  显示开关.value = true
}


let 添加订单 = (行: any) => {
  socket.emit('修改与添加订单', 行, (返回数据: any) => {
    console.log(返回数据)
  });
  console.log('修改订单');
  pinia.新订单初始化
}

let 删除订单 = (行: any) => {
  行.删除信息 = pinia.当前登录用户 + ':' + pinia.日期 + "删除"
  socket.emit('修改与添加订单', 行, (返回数据: any) => {
    console.log(返回数据)
  });

}
let 彻底删除订单 = (行: any) => {
  行.删除信息 = pinia.当前登录用户 + ':' + pinia.日期 + '彻底删除'
  socket.emit('修改与添加订单', 行, (返回数据: any) => {
    console.log(返回数据)
  });

}
let 还原订单 = (行: any) => {
  行.删除信息 = ''
  socket.emit('修改与添加订单', 行, (返回数据: any) => {
    console.log(返回数据)
  });
}




</script>

<template>
  <!-- 默认显示的模块 -->
  <div v-if="显示开关" class="行">
    <div>{{行.订单号}}</div>
    <div>{{行.年}}</div>
    <div>{{行.月}}</div>
    <div>{{行.日}}</div>
    <div>{{行.镜片下单日}}</div>
    <div>{{行.旺旺名}}</div>
    <div>{{行.收件人}}</div>
    <div>{{行.镜片}}</div>
    <div>{{行.右近视}}</div>
    <div>{{行.右散光}}</div>
    <div>{{行.右轴向}}</div>
    <div>{{行.左近视}}</div>
    <div>{{行.左散光}}</div>
    <div>{{行.左轴向}}</div>
    <div>{{行.右瞳距}}+{{行.左瞳距}} </div>
    <div>{{行.类型}}</div>
    <icon @click="展开开关=!展开开关, 显示开关=!显示开关 " 图标名="icon-down" 颜色="#666" font-size='25px' />
    <icon @click="修改开关=true,显示开关=false" 图标名="icon-setting" 颜色="#666" font-size='25px' />
    <icon @click="删除订单(行)" 图标名="icon-delete" 颜色="#F56C6C" font-size='25px' />
  </div>
  <!-- 按修改之后显示的模块 -->
  <div v-if="修改开关" class="行">
    <div>{{行.订单号}}</div>
    <div>{{行.年}}</div>
    <div>{{行.月}}</div>
    <div>{{行.日}}</div>
    <input type="text" v-model.lazy="行.镜片下单日" >
    <input type="text" v-model.lazy="行.旺旺名" >
    <input type="text" v-model.lazy="行.收件人" >
    <input type="text" v-model.lazy="行.镜片">
    <input type="text" v-model.lazy="行.右近视">
    <input type="text" v-model.lazy="行.右散光">
    <input type="text" v-model.lazy="行.右轴向">
    <input type="text" v-model.lazy="行.左近视">
    <input type="text" v-model.lazy="行.左散光">
    <input type="text" v-model.lazy="行.左轴向">
    <input type="text" v-model.lazy="行.瞳距">
    <input type="text" v-model.lazy="行.备注">
    <icon @click="修改订单(行)" 图标名="icon-cloud-upload" 颜色="#666" font-size='25px' />
  </div>
  <!-- 新订单显示的模块 -->
  <div v-if="行.类型=='新订单'" class="行 ">
    <div>{{行.订单号}}</div>
    <div>{{行.年}}</div>
    <div>{{行.月}}</div>
    <div>{{行.日}}</div>
    <input type="text" v-model.lazy="行.镜片下单日" placeholder="镜片下单日">
    <input type="text" v-model.lazy="行.旺旺名" placeholder="旺旺名">
    <input type="text" v-model.lazy="行.收件人" placeholder="收件人">
    <input type="text" v-model.lazy="行.镜片" placeholder="镜片">
    <input type="text" v-model.lazy="行.右近视" placeholder="右近视">
    <input type="text" v-model.lazy="行.右散光" placeholder="右散光">
    <input type="text" v-model.lazy="行.右轴向" placeholder="右轴向">
    <input type="text" v-model.lazy="行.左近视" placeholder="左近视">
    <input type="text" v-model.lazy="行.左散光" placeholder="左散光">
    <input type="text" v-model.lazy="行.左轴向" placeholder="左轴向">
    <input type="text" v-model.lazy="行.瞳距" placeholder="瞳距">
    <input type="text" v-model.lazy="行.备注" placeholder="备注">
  </div>
  <!-- 删除订单页的行 -->
  <div v-if="删除订单开关" class="行">
    <div>{{行.订单号}}</div>
    <div>{{行.年}}</div>
    <div>{{行.月}}</div>
    <div>{{行.日}}</div>
    <div>{{行.镜片下单日}}</div>
    <div>{{行.旺旺名}}</div>
    <div>{{行.收件人}}</div>
    <div>{{行.镜片}}</div>
    <div>{{行.右近视}}</div>
    <div>{{行.右散光}}</div>
    <div>{{行.右轴向}}</div>
    <div>{{行.左近视}}</div>
    <div>{{行.左散光}}</div>
    <div>{{行.左轴向}}</div>
    <div>{{行.右瞳距}}+{{行.左瞳距}} </div>
    <div>{{行.删除信息}}</div>
    <icon @click="还原订单(行)" 图标名="icon-reload" 颜色="#67C23A" font-size='25px' />
    <icon @click="彻底删除订单(行)" 图标名="icon-delete" 颜色="#F56C6C" font-size='25px' />
  </div>

  <!-- 展开后的行 -->
  <div v-if="展开开关" class="行 高">
    <div>{{行.订单号}}</div>
    <div>{{行.年}}</div>
    <div>{{行.月}}</div>
    <div>{{行.日}}</div>
    <div>{{行.镜片下单日}}</div>
    <div>{{行.旺旺名}}</div>
    <div>{{行.收件人}}</div>
    <div>{{行.镜片}}</div>
    <div>{{行.右近视}}</div>
    <div>{{行.右散光}}</div>
    <div>{{行.右轴向}}</div>
    <div>{{行.左近视}}</div>
    <div>{{行.左散光}}</div>
    <div>{{行.左轴向}}</div>
    <div>{{行.右瞳距}}+{{行.左瞳距}} </div>
    <div>{{行.类型}}</div>
    <icon @click="展开开关=!展开开关,显示开关=!显示开关" 图标名="icon-up" 颜色="#666" font-size='25px' />
    <icon @click="修改开关=true,显示开关=false" 图标名="icon-setting" 颜色="#666" font-size='25px' />
    <icon @click="删除订单(行)" 图标名="icon-delete" 颜色="#F56C6C" font-size='25px' />
  </div>
</template>


<style scoped>

.行 {
  display: grid;
  width: 100%;
  grid-auto-flow: column;
  grid-template-columns: 100px repeat(3, 30px) 100px 200px 120px 170px repeat(6, 60px) 100px 1fr;
  grid-template-rows: 25px;
  align-content: flex-start;
  background-color: #F0F2F5
}

.高 {
  grid-template-rows: 150px;

}

input {

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 0.5px solid rgb(225, 225, 225);
  border-radius: 5px;
  background-color: #F0F2F5;
  margin: 0;
}

div {

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 0.5px solid rgb(225, 225, 225);
  border-radius: 5px;
  background-color: #F0F2F5;
  margin: 0;
}

input[type="text"] {
  text-align: center;
}

input:hover {
  box-sizing: border-box;
  border: 0.5px solid rgb(36, 168, 0);
}

input:focus {
  outline: none;
  box-shadow: 0px 0px 3px 1px rgb(50, 216, 4);
  z-index: 99;

}

.单元格 {
  position: relative;
}

.下滑菜单 {
  display: grid;
  gap: 5px;
  position: absolute;
  border-radius: 5px;
  background-color: #F0F2F5;
  box-shadow: 0px 0px 3px 1px rgb(50, 216, 4);
  height: auto;
  top: 35px;
  z-index: 5;
}

button {
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: repeat(auto-fit, minmax(30px, 1fr));
  box-sizing: border-box;
  border: 2px solid #67C23A;
  width: 100%;
  border-radius: 4px;
  padding: 4px 8px;
  font-family: Arial;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  height: 40px;
  overflow: hidden;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  background-color: #67C23A;
  transition: all 0.2s;
}

button:hover {
  background-color: #95d475;
  border: 5px solid #95d475;
}

button:active {
  background-color: #529b2e;
  border: 5px solid #67C23A;
}
</style>
