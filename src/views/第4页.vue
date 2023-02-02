<script setup lang = "ts">
import { pinia数据中心 } from '../stores/pinia数据';
import lmInput from "@组件/行.vue";
import lmSH from "@组件/首行.vue";
import lmButton from "@组件/按钮.vue";
import lmWin from "@组件/添加订单窗口.vue";
import { socket } from "../stores/socket链接";
import { onMounted, ref, toRef } from 'vue';




let pinia = pinia数据中心();
pinia.获取旧订单();


let 添加订单窗口开关 = ref(false)
let 添加订单按钮 = () => {
  pinia.添加订单窗口开关 = !pinia.添加订单窗口开关
  console.log('添加订单');
}






let 创建订单 = (行: any) => {
  socket.emit('创建订单', 行, (返回数据: any) => {
    console.log(返回数据)
  });
  console.log('创建订单');
  pinia.获取旧订单();
  pinia.旧订单当前页 = pinia.旧订单页数
}



</script>

<template>

  <div class="第四页 滑条">

    <div class="横向">
      <!--   <div class = "弹窗" v-if = "添加订单窗口开关"> <lmButton @click = "添加订单窗口开关=false">关闭窗口</lmButton></div> -->
      <lmWin v-if="pinia.添加订单窗口开关"></lmWin>
      <h1>这是第四页{{ pinia.日期 }}</h1>
      <input type="text" v-model="pinia.要全局搜索的值">
      <lmButton @click="pinia.获取旧订单">获取旧订单</lmButton>
      <input v-model.lazy="pinia.旧订单每页显示的数量">
      <lmButton>一共有 {{ pinia.通过筛选的数量 }} 条数据通过筛选</lmButton>
      <lmButton>当前显示 {{ pinia.筛选过的旧订单.length }} 条数据</lmButton>
      <lmButton @click="添加订单按钮">添加订单按钮</lmButton>
    </div>


    <!-- 表格模块 -->
    <div class=" 滑条">
      <lmSH></lmSH>
      <div class=" 滑条">
        <lmInput v-for="行 in pinia.筛选过的旧订单" :行=行></lmInput>
      </div>

    </div>

    <!-- 分页模块 -->
    <div class="分页 横向">
      <lmButton class="分页按钮"> 这是第{{ pinia.旧订单当前页 }}页</lmButton>
      <!--      <button v-for = "(页, index) in pinia.页数" :key = "页" @click = 'pinia.当前页=pinia.页数[index]'>{{ 页 + 1 }}</button> -->
      <!-- v-for 循环数组必须有 index 且必须使用 不然循环不了  而且index不能用中文名 -->
      <div class="分页内 横向">
        <lmButton class="" :class="{ 查找状态: pinia.旧订单当前页 == 页 }" v-for="(页, index) in pinia.旧订单页数"
          @click="pinia.旧订单当前页 = index + 1">
          {{ 页 }}
        </lmButton>
      </div>
      <lmButton class="分页按钮">一共有{{ pinia.旧订单页数 }}页</lmButton>
    </div>

    <!-- 添加新订单模块 -->
    <div class="添加订单">
      <lmInput :行=pinia.新订单模板></lmInput>
      <lmButton @click="创建订单(pinia.新订单模板)">
        <icon 图标名="icon-plus-circle-fill" 颜色="#fff" font-size='20px' />
        <p>添加订单</p>
      </lmButton>
    </div>


  </div>

</template>


<style lang="scss" scoped>
.查找状态 {
  background-color: #337ecc;
}

.第四页 {
  grid-template-rows: 50px 1fr 80px 80px;
}

.分页 {
  gap: 5px;
  width: auto;
  grid-template-columns: 1fr 1fr 1fr;
  .分页内 {
    gap: 1px;
    grid-template-columns: repeat(auto-fit, minmax(10px, 1fr));
  }
}
</style>
