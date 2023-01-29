<script setup lang="ts">
import { pinia数据中心 } from '../stores/pinia数据';
import lmInput from "@组件/行.vue";
import lmSH from "@组件/首行.vue";
import lmButton from "@组件/新版按钮.vue";
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia'


let pinia = pinia数据中心();
pinia.获取旧订单();

let 滑块 = ref(0)
let Event = ref(0)



</script>

<template>

    <div class="第五页">
        <div class="第一行">
            <h1>第六页</h1>
        </div>
        <lmButton 类型="默认" 提示='没啥事写点提示'></lmButton>
        <lmButton 提示='按钮内容写插件里面吧'> 王八蛋按钮</lmButton>
        <input type="text" placeholder="占位符">
        <lmButton     提示='按钮内容写插件里面吧'> 位置按钮</lmButton>
        <input type="search" placeholder="占位符">
        <input type="number" min="0" max="1000" step="25">
        <input type="range" min="-600" max="2000" step="25" v-model=滑块>
        {{ 滑块 }}
        {{Event}}
        <input type="text" name="myFruit" id="myFruit" list="mySuggestion">
        <datalist id="mySuggestion">
            <option v-for="订单 in pinia.旧订单 ">{{订单.镜片}}</option>
   
        </datalist>
        <input type="text"   list="mySuggestion">
        <lmButton     提示='按钮内容写插件里面吧'> 位置按钮</lmButton>
     
   
     






    </div>

</template>


<style scoped>
.第五页 {
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: start;
    background-color: #F0F2F5;
    gap: 20px;
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
    height: 1fr;
    grid-auto-flow: row;
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
