<script setup lang = "ts">
import { useRouter } from 'vue-router';
import { ref, toRefs, reactive, computed, watch ,toRaw} from 'vue';
import Icon from './icons/Icon.vue';
import { socket } from "../stores/socket链接";
import { pinia数据中心 } from '../stores/pinia数据';
import { pinia库, 用户类 } from '../stores/pinia库';

let 库 = pinia库();
let { 序号 } = defineProps(['序号'])



let 镜框 = ref('')
let 图标颜色 = ref("#666")

let 行数据 = 库.用户表[序号]


watch(() => 行数据, (值) => {
  图标颜色.value = "#67C23A"
  console.log('更改 ' + JSON.stringify(值.用户名))
}, { deep: true })

let 改 = (行数据: any) => { 库.通讯('用户', "改", 行数据); 图标颜色.value = "#666" }
let 删 = (行数据: any) => { 库.通讯('用户', "删", 行数据); }
let 增 = (行数据: any) => { 
  let 数据 =toRaw(行数据) 
  let 新数据:用户类=new 用户类
  Object.assign(新数据, 数据);
  delete 新数据._id; 
  库.通讯('用户', "增",新数据) 
}

</script>

<template>

  <!-- 默认显示的模块 -->
  <div class="页">

    <div class="横向 平均行 页">

      <input v-model.lazy="行数据._id" placeholder="_id">
      <input v-model.lazy="行数据.用户名" placeholder="用户名">
      <input v-model.lazy="行数据.密码" placeholder="密码">
      <input v-model.lazy="行数据.类型" placeholder="类型" list="类型选项">
      <div class="横向 平均行">
        <icon @click=改(行数据) 图标名="lm-cloud-upload" font-size='30px' :颜色=图标颜色 />
        <icon @click=增(行数据) 图标名="lm-copy1" font-size='30px' 颜色="#67C23A" />
        <icon @click=删(行数据) 图标名="lm-delete" font-size='30px' 颜色=#F56C6C />
      </div>


    </div>

    <datalist id="类型选项">
      <option>客服</option>
      <option>助理</option>
    </datalist>
    <datalist id="日期">
      <option :value=库.月日>今天</option>

    </datalist>
  </div>
</template>


<style lang="scss" scoped>
.页 {
  gap: 5px;
}

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
