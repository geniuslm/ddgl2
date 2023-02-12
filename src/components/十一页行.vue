<script setup lang = "ts">
import { useRouter } from 'vue-router';
import { ref, toRefs, reactive, computed, watch } from 'vue';
import Icon from './icons/Icon.vue';
import { socket } from "../stores/socket链接";
import { pinia数据中心 } from '../stores/pinia数据';
import { pinia库 } from '../stores/pinia库';

let 库 = pinia库();

let 镜框 = ref('')
let 图标颜色 = ref("#666")

let  {序号}  = defineProps(['序号'])
let  行数据  =  库.筛选过的订单[序号]
let  订单号分解  = 行数据.订单号.slice(2,4)+"月"+行数据.订单号.slice(2,4)+"日 第"+行数据.订单号.slice(2,4)+"单"
let 改 = (行数据: any) => { console.log(行数据); 库.通讯('订单', "改", 行数据); 图标颜色.value = "#666"}
let 删 = (行数据: any) => { console.log(行数据); 库.通讯('订单', "删", 行数据) }

watch(() => 行数据, (值) => {
  图标颜色.value = "#67C23A"
  console.log('更改 ' + JSON.stringify(值))
}, { deep: true })


</script>

<template>

  <!-- 默认显示的模块 -->
  <div class="页">
    <div class="第一行">
      <div class="标识格">
        <div class="订单号">
          <div>订单号:{{ 行数据.订单号 }} </div>
          <div>{{ 订单号分解 }} </div>
        </div>
        <input class="标识" v-model.lazy="行数据.收件人" placeholder="收件人">
        <input class="标识 两列" v-model.lazy="行数据.旺旺名" placeholder="旺旺名">
      </div>
      <div class="镜片格">
        <input class="镜片" v-model.lazy="行数据.镜片下单日" placeholder="镜片下单日" list="日期">
        <input class="镜片" v-model.lazy="行数据.镜片下单日" placeholder="镜片下单日" list="日期">
        <input class="镜片" v-model.lazy="行数据.镜片下单日" placeholder="镜片下单日" list="日期">
        <input class="镜片 三列" v-model.lazy="行数据.镜片" placeholder="镜片" list="镜片名">

        <div class="验光数据 三列">
          <input v-model.lazy="行数据.右近视" placeholder="右近视">
          <input v-model.lazy="行数据.右散光" placeholder="右散光">
          <input v-model.lazy="行数据.右轴向" placeholder="右轴向">
          <!-- <input v-model.lazy="行数据.右瞳距" placeholder="右瞳距"> -->
          <input v-model.lazy="行数据.左近视" placeholder="左近视">
          <input v-model.lazy="行数据.左散光" placeholder="左散光">
          <input v-model.lazy="行数据.左轴向" placeholder="左轴向">
          <!-- <input v-model.lazy="行数据.左瞳距" placeholder="左瞳距"> -->

        </div>
      </div>

      <div class="镜框格">
        <input placeholder="下单日" list="日期">
        <input placeholder="发货日" list="日期">
        <input placeholder="备好日" list="日期">
        <div class="镜框第一行">
          <input class="" :class="{ '': 镜框 == '直接加工' || 镜框 == '' }" v-model=镜框 list="镜框选项" placeholder="镜框选项"
            @focus="镜框 = ''">
          <input v-if="镜框 == '来框加工'" class="" placeholder="请输入运单号">
          <div class="试戴镜框">
            <input v-if="镜框 == '试戴镜框'" class="" placeholder="试戴1">
            <input v-if="镜框 == '试戴镜框'" class="" placeholder="试戴2">
            <input v-if="镜框 == '试戴镜框'" class="" placeholder="试戴3">
          </div>
        </div>

        <input class="三列" :placeholder=行数据._id>

      </div>


      <div class="图标格">
        <icon 图标名="lm-cloud-upload" @click="改(行数据)" :颜色=图标颜色 font-size='25px' />
        <icon 图标名="lm-setting" 颜色="#666" font-size='25px' />
        <icon 图标名="lm-delete" @click="删(行数据)" 颜色="#F56C6C" font-size='25px' />
      </div>
      <div class="图标格">
        已完成
      </div>
    </div>
  </div>
  <!-- 选项 -->
  <datalist id="镜框选项">
    <option>来框加工</option>
    <option>试戴镜框</option>
    <option>直接加工</option>
  </datalist>
  <datalist id="日期">
    <option :value=库.月日>今天</option>
  </datalist>
  <datalist id="镜片名">
      <option v-for="i in 库.镜片名选项">{{ i }}</option>
    </datalist>
  

</template>


<style lang="scss" scoped>
.页 {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}
.订单号{
  grid-template-rows: 1fr 1fr;
}

.第一行 {
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 300px 1fr 1fr 50px 100px;
  grid-template-rows: 1fr;
  background-color: #F0F2F5
}

.标识格 {
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  background-color: #F0F2F5;
}

.镜片格 {
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  background-color: #F0F2F5;

}

.镜框格 {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}

.镜框第一行 {
  grid-auto-flow: column;
  grid-column: 1 / span 3;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
}

.图标格 {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}

.试戴镜框 {
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;

}


.验光数据 {
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 25px 25px;
  background-color: #F0F2F5;
}

.三列 {

  grid-auto-flow: column;
  grid-column: 1 / span 3
}


.两列 {
  grid-column: 1 / span 2
}

.两行 {
  font-size: 25px;
  grid-row: 1 / span 2
}


.高 {
  grid-template-rows: 150px;
}

.镜片 {
  background-color: #b8d4ff;
}

.标识 {
  background-color: #b7c3d4;
}


input {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 0.5px solid rgb(225, 225, 225);
  text-align: center;
  border-radius: 5px;
  background-color: #F0F2F5;
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
