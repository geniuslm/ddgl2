<script setup lang = "ts">
import { useRouter } from 'vue-router';
import { ref, toRefs, reactive, computed, watch, toRaw } from 'vue';
import Icon from './icons/Icon.vue';
import { socket } from "../stores/socket链接";
import { pinia数据中心 } from '../stores/pinia数据';
import { pinia库, 镜片类 } from '../stores/pinia库';

let 库 = pinia库();
let { 序号 } = defineProps(['序号'])



let 镜框 = ref('')
let 图标颜色 = ref("#666")

let 行数据 = 库.排序过的镜片[序号]


watch(() => 行数据, (值) => {
  图标颜色.value = "#67C23A"
  console.log('更改 ' + JSON.stringify(值.镜片名))
}, { deep: true })

let 改 = (行数据: any) => { 库.通讯('镜片', "改", 行数据); 图标颜色.value = "#666" }
let 删 = (行数据: any) => { 库.通讯('镜片', "删", 行数据); }
let 增 = (行数据: any) => {
  let 数据 = toRaw(行数据)
  let 新数据: 镜片类 = new 镜片类
  Object.assign(新数据, 数据);
  delete 新数据._id;
  库.通讯('镜片', "增", 新数据)
}

let 镜片名= ()=>{
  行数据.镜片名=(行数据.品牌名+行数据.系列名+行数据.折射率+行数据.高散车房).trim()
}

</script>

<template>

  <!-- 默认显示的模块 -->
  <div class="">

    <div class="横向 镜片行 页">
      <input v-model.lazy="行数据.镜片名" placeholder="镜片名" list="镜片名">
      <input @change="镜片名()" v-model.lazy="行数据.品牌名" placeholder="品牌名" list="品牌名">
      <input @change="镜片名()" v-model.lazy="行数据.系列名" placeholder="系列名" list="系列名">
      <input @change="镜片名()" v-model.lazy="行数据.折射率" placeholder="折射率" list="折射率">
      <input @change="镜片名()" v-model.lazy="行数据.高散车房" placeholder="高散车房" list="高散车房">
      <input @change="镜片名()" v-model.lazy="行数据.染色变色" placeholder="染色变色" list="染色变色">
     
      <input @change="镜片名()" v-model.lazy="行数据.最高近视光度" placeholder="最高近视光度" list="最高近视光度">
      <input @change="镜片名()" v-model.lazy="行数据.最高散光光度" placeholder="最高散光光度" list="最高散光光度">
      <input @change="镜片名()" v-model.lazy="行数据.最高联合光度" placeholder="最高联合光度" list="最高联合光度">
      <input @change="镜片名()" v-model.lazy="行数据.最高远视光度" placeholder="最高远视光度" list="最高远视光度">
      <input @change="镜片名()" v-model.lazy="行数据.最高远视散光" placeholder="最高远视散光" list="最高远视散光">

      <input @change="镜片名()" v-model.lazy="行数据.供应商   " placeholder="供应商   " list="供应商   ">
      <input @change="镜片名()" v-model.lazy="行数据.售价    " placeholder="售价    " list="售价    ">
      <input @change="镜片名()" v-model.lazy="行数据.进货价   " placeholder="进货价   " list="进货价   ">
      <input @change="镜片名()" v-model.lazy="行数据.湖北和益  " placeholder="湖北和益  " list="湖北和益  ">
      <input @change="镜片名()" v-model.lazy="行数据.湖北蔡司  " placeholder="湖北蔡司  " list="湖北蔡司  ">
      <input @change="镜片名()" v-model.lazy="行数据.上海老周  " placeholder="上海老周  " list="上海老周  ">
      <input @change="镜片名()" v-model.lazy="行数据.丹阳臻视  " placeholder="丹阳臻视  " list="丹阳臻视  ">
      <div class="横向 平均行">
        <icon @click=改(行数据) 图标名="lm-cloud-upload" font-size='30px' :颜色=图标颜色 />
        <icon @click=增(行数据) 图标名="lm-copy1" font-size='30px' 颜色="#67C23A" />
        <icon @click=删(行数据) 图标名="lm-delete" font-size='30px' 颜色=#F56C6C />
      </div>


    </div>

    <datalist id="镜片名">
      <option v-for="i in 库.镜片名选项">{{ i }}</option>
    </datalist>
    <datalist id="品牌名">
      <option v-for="i in 库.品牌名选项">{{ i }}</option>
    </datalist>



    <datalist id="日期">
      <option :value=库.月日>今天</option>
    </datalist>
  </div>
</template>


<style lang="scss" scoped>


input {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 0.5px solid rgb(225, 225, 225);
  text-align: center;
  border-radius: 5px;
  background-color: #CCCCCC;
}
</style>
