<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, toRefs, reactive,computed } from 'vue';
import Icon from './icons/Icon.vue';
import { socket } from "../stores/socket链接";
import { pinia数据中心 } from '../stores/pinia数据';

//let pinia = pinia数据中心();
//接收参数
//子组件


const props = defineProps(['行数据'])
const emit = defineEmits(['update:行数据'])

const 数据 = computed({
  get() {
    return props.行数据
  },
  set(value) {
    emit('update:行数据', value)
  }
})



</script>

<template>
  <!-- 默认显示的模块 -->
  
  <h6>组件内数据:{{数据}}</h6>
  <input v-model="数据" >
   
 
  


 
</template>


<style scoped>

.行 {
  display: grid;
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
