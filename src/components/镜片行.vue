<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, toRefs, reactive, computed } from 'vue';
import Icon from './icons/Icon.vue';
import { socket } from "../stores/socket链接";
import { pinia数据中心, 镜片类 } from '../stores/pinia数据';

let pinia = pinia数据中心();
//接收参数  并绑定
const props = defineProps(['行'])
const emit = defineEmits(['update:行'])
const 行数据 = computed({
  get() {
    return props.行
  },
  set(value) {
    emit('update:行', value)
  }
})
/////////////////////

let 修改镜片: any = (行: 镜片类) => {
  socket.emit('修改与添加镜片', 行, (返回数据: 镜片类) => {
    console.log(返回数据)
  });
}

let 删除镜片: any = (行: any) => {
  socket.emit('删除镜片', 行, (返回数据: any) => {
    console.log(返回数据)
  });
}





</script>

<template>


  <!-- 按修改之后显示的模块 -->
  <div class="一行">
    <div>{{行数据.镜片名}}</div>
    <input v-model="行数据.品牌名">
    <input v-model="行数据.系列名">
    <input v-model="行数据.折射率">
    <input v-model="行数据.染色变色">
    <input v-model="行数据.高散车房">
    <input v-model="行数据.最高近视光度">
    <input v-model="行数据.最高散光光度">
    <input v-model="行数据.最高联合光度">
    <input v-model="行数据.最高远视光度">
    <input v-model="行数据.最高远视散光">
    <input v-model="行数据.供应商">
    <input v-model="行数据.售价">
    <input v-model="行数据.进货价">
    <input v-model="行数据.湖北和益">
    <input v-model="行数据.湖北蔡司">
    <input v-model="行数据.上海老周">
    <input v-model="行数据.丹阳臻视">
    <p>
      <icon @click="修改镜片(行数据)" 图标名="icon-cloud-upload" 颜色="#666" font-size='25px' />
      <icon @click="删除镜片(行数据)" 图标名="icon-delete" 颜色="#F56C6C" font-size='25px' />
    </p>

  </div>

</template>


<style scoped>
.一行 {
  display: grid;
  grid-auto-flow: column;
  /* grid-template-columns: repeat(19, 1fr) 80px; */
  grid-template-columns: 1fr; 
  grid-template-rows: 25px;
  align-content: flex-start;
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
</style>
