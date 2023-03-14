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
let 光度范围开关 = ref(false)
let 图标颜色 = ref("#666")

let 行数据 = 库.排序过的镜片[序号]
let 光度列表 = reactive([])
let 显示块 = () => {
  for (let 球 = 0; 球 <= 1000; 球 += 25) {
    for (let 柱 = 0; 柱 <= 200; 柱 += 25) {
      //给光度列表添加新元素
      光度列表.push({ 球镜: 球, 柱镜: 柱 })
    }
  }
}
let 判定 = (i) => {
  if (i.球镜 == 0) return true
  else return false
}

watch(() => 行数据, (值) => {
  图标颜色.value = "#67C23A"
  //行数据.镜片名 = (行数据.品牌名 + 行数据.系列名 + 行数据.折射率 + 行数据.高散定制).trim()
  console.log('更改 ' + JSON.stringify(值.镜片名))

}, { deep: true })

let 改 = (行数据: any) => { 库.通讯('镜片', "改", 行数据); 图标颜色.value = "#666" }
let 删 = (行数据: any) => { 库.通讯('镜片', "删", 行数据); }
let 增 = (行数据: any) => {
  let 新数据: 镜片类 = JSON.parse(JSON.stringify(行数据))
  delete 新数据._id;
  库.通讯('镜片', "增", 新数据)
}

let 镜片名 = () => {
  行数据.镜片名 = (行数据.品牌名 + 行数据.系列名 +  行数据.高散定制 + 行数据.染色变色+行数据.折射率 ).trim()
}


</script>

<template>
  <!-- 默认显示的模块 -->
  <div class="">

    <div class="横向 镜片行 字体">
      <input v-model.lazy="行数据.镜片名" placeholder="镜片名" list="镜片名">
      <input @change="镜片名()" v-model.lazy="行数据.品牌名" placeholder="品牌名" list="品牌名">
      <input @change="镜片名()" v-model.lazy="行数据.系列名" placeholder="系列名" list="系列名">
      <input @change="镜片名()" v-model.lazy="行数据.折射率" placeholder="折射率" list="折射率">
      <input @change="镜片名()" v-model.lazy="行数据.高散定制" placeholder="高散定制" list="高散定制">
      <input @change="镜片名()" v-model.lazy="行数据.染色变色" placeholder="染色变色" list="染色变色">

     


      <input v-model.lazy="行数据.售价" placeholder="售价" list="售价">

      <input v-model.lazy="行数据.湖北和益" class="湖北和益" placeholder="湖北和益" list="湖北和益">
      <input v-model.lazy="行数据.山东臻视" class="山东臻视" placeholder="山东臻视" list="山东臻视">
      <input v-model.lazy="行数据.上海老周" class="上海老周" placeholder="上海老周" list="上海老周">
      <input v-model.lazy="行数据.湖北蔡司" class="湖北蔡司" placeholder="湖北蔡司" list="湖北蔡司">
      <input v-model.lazy="行数据.丹阳夏总" class="丹阳夏总" placeholder="丹阳夏总" list="丹阳夏总">
    
      <div class="横向 平均行">
        <icon @click=改(行数据) 图标名="lm-cloud-upload" font-size='30px' :颜色=图标颜色 />
        <icon @click=增(行数据) 图标名="lm-copy1" font-size='30px' 颜色="#67C23A" />
        <icon @click=删(行数据) 图标名="lm-delete" font-size='30px' 颜色=#F56C6C />
        <icon @click="光度范围开关 = !光度范围开关" 图标名="lm-setting" font-size='30px' />
      </div>
      <div v-if="光度范围开关" class="光度范围 滑条">
        <div class="第一行"> {{ 行数据.镜片名 }}
          <button @click="显示块()">显示块</button>
        </div>
        <div class="光度">
          <div :class="{ 蓝色块: 判定(i) }" class="块" v-for="i in 光度列表">
            {{ i.球镜 }}
            {{ i.柱镜 }}
          </div>
        </div>


      </div>



    </div>

    <datalist id="镜片名">
      <option v-for="i in 库.镜片名选项">{{ i }}</option>
    </datalist>
    <datalist id="品牌名">
      <option v-for="i in 库.品牌名选项">{{ i }}</option>
    </datalist>
    <datalist id="系列名">
      <option v-for="i in 库.系列名选项">{{ i }}</option>
    </datalist>
    <datalist id="折射率">
      <option v-for="i in 库.折射率选项">{{ i }}</option>
    </datalist>
    <datalist id="高散定制">
      <option>高散</option>
      <option>定制</option>
    </datalist>
    <datalist id="染色变色">
      <option>变色</option>
      <option>染色</option>
    </datalist>



    <datalist id="日期">
      <option :value=库.月日>今天</option>
    </datalist>
  </div>
</template>


<style lang="scss" scoped>
.字体 {
  font-size: larger;
  font-weight: bolder;
}

.光度范围 {
  position: fixed;
  z-index: 9;
  top: 50px;
  width: 800px;
  height: 900px;
  background-color: $背景;
  border: 3px solid $深灰;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 1fr;
  align-content: start;

  .第一行 {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;

  }

  .光度 {

    gap: 2px;
    align-content: start;
    grid-template-columns: repeat(9, 70px);
    grid-template-rows: repeat(auto-fit, minmax(5px, 1fr));

    .块 {
      font-size: 8px;
      background-color: $浅黄;
    }
    .蓝色块 {
      font-size: 8px;
      background-color: $浅蓝;
    }

  }
}



input {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 0.5px solid rgb(225, 225, 225);
  text-align: center;
  border-radius: 5px;
  background-color: #CCCCCC;
  font-size: 14px;
  font-weight: bolder;
}
input::placeholder {
  color: rgba(0, 0, 0, 0.25);

}
.湖北和益{
  background: $正黄;
}
.山东臻视{
  background: $正蓝;
}
.上海老周{
  background: $正红;
}
.湖北蔡司{
  background: $正绿;
}
.丹阳夏总{
  background: $暗黄;
}
</style>
