<script setup lang = "ts">
import { ref } from 'vue';


let props = defineProps({
  类型: {
    type: String,
    default: '',
  },
  提示: {
    type: String,
    default: '没啥提示',
  },
  颜色: {
    type: String,
    default: '默认',
  },
})
let 文字 = ref('')
let 显示提示 = ref(false)
let 上显示提示 = ref(false)
let 是否离开 = ref(false)
let 类型 = ref('按钮')


//如果没有写提示 就不显示提示
let 开提示 = (event: any) => 
{    
  if (props.提示 !== '没啥提示') 
  {
    是否离开.value = false;
    setTimeout(() => 
    {
      if (是否离开.value == false)
       {
        if (window.innerHeight - event.target.getBoundingClientRect().y - event.target.getBoundingClientRect().height > 50) 
        { 显示提示.value = true }
        else
         { 上显示提示.value = true }
         console.log(是否离开.value)
      }
    },1000);
  }
}


let 关提示 = (event: any) => {
  if (props.提示 !== '没啥提示') {
    是否离开.value = true;
    setTimeout(() => {
      if (window.innerHeight - event.target.getBoundingClientRect().y - event.target.getBoundingClientRect().height > 50) 
      { 显示提示.value = false }
      else { 上显示提示.value = false }
      console.log(是否离开.value)
    }, 1000);
  }
}

//如果类型为空 文字就显示默认按钮
if (props.类型 == '默认') {
  文字.value = '默认按钮'
}

let 打印位置 = (event: any) => {
  //底部距离
  console.log("距离底部" + (window.innerHeight - event.target.getBoundingClientRect().y - event.target.getBoundingClientRect().height))

}


</script>

<template>
  <button :class="[类型, props.颜色]" @mouseenter="开提示($event)" @mouseleave="关提示($event)">

    <!-- props 传进来的内容 -->
    {{ 文字 }}


    <!-- 插槽模块 -->
    <slot></slot>


    <!-- 提示模块 -->
    <!-- 向下显示 -->
    <Transition name="提示">
      <div class="提示" v-if="显示提示">
        <div class="尖角"></div>
        <div class="提示内容"> {{ props.提示 }}</div>
      </div>
    </Transition>
    <!-- 向上显示 -->
    <Transition name="上提示">
      <div class="上提示" v-if="上显示提示">
        <div class="上尖角"></div>
        <div class="上提示内容"> {{ props.提示 }}</div>
      </div>
    </Transition>
  </button>


</template>







<style scoped>
/* 默认样式 */
.按钮 {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 1fr;
  grid-template-columns: max-content;
  box-sizing: border-box;
  width: auto;
  height: 40px;
  border-radius: 4px;
  padding: 4px 8px;
  font-family: Arial;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  height: 30px;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  position: relative;
  transition: all 0.2s;
}

.默认 {
  background-color: #409EFF;
  border: 2px solid #409EFF;
}

.默认:hover {
  background-color: #79bbff;
  border: 2px solid #79bbff;
}

.默认:active {
  background-color: #337ecc;
  border: 2px solid #337ecc;
}

.绿色 {
  background-color: #67C23A;
  border: 2px solid #67C23A;
}

.绿色:hover {
  background-color: #85ce61;
  border: 2px solid #85ce61;
}

.绿色:active {
  background-color: #4e8e2f;
  border: 2px solid #4e8e2f;
}


.提示 {
  position: absolute;
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: 1fr;
  grid-template-columns: auto max-content;
  top: 40px;
  width: auto;
  height: auto;
  padding: 6px 15px;
  background-color: #4b4b4bbe;
  color: #fff;
  border-radius: 8px;
  font-size: 19px;
  font-weight: normal;
  text-align: center;
  z-index: 999;
}

.上提示 {
  position: absolute;
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: 1fr;
  grid-template-columns: auto max-content;
  top: -50px;
  width: auto;
  height: auto;
  padding: 6px 15px;
  background-color: #4b4b4bbe;
  color: #fff;
  border-radius: 8px;
  font-size: 19px;
  font-weight: normal;
  text-align: center;
  z-index: 999;
}

/* 说明在第二列   max-content   */
.提示内容 {
  grid-column: 2;
  grid-row: 1;
}

.上提示内容 {
  grid-column: 2;
  grid-row: 1;
}

.尖角 {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #4b4b4bbe;
  top: -10px;
  z-index: 99;
}

.上尖角 {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #4b4b4bbe;
  bottom: -10px;
  z-index: 99;
}

/* 提示生成的过度动画 */
.提示-enter-active,
.提示-leave-active {
  transition: all 0.8s ease;
}

/* 进入和离开时的状态 */
.提示-enter-from,
.提示-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

/* 提示生成的过度动画 */
.上提示-enter-active,
.上提示-leave-active {
  transition: all 0.8s ease;
}

/* 进入和离开时的状态 */
.上提示-enter-from,
.上提示-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
