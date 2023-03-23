<script setup lang = "ts">
import { pinia数据中心, 镜片类 } from '../stores/pinia数据';
import { pinia库, 订单类 } from '../stores/pinia库';
import lmInput from "@/components/订单行.vue";
import lmh from "@/components/菜单客服.vue";
import lmSH from "@组件/首行.vue";
import lmButton from "@组件/按钮.vue";
import lmWin from "@组件/添加订单窗口.vue";
import { socket } from "../stores/socket链接";
import { onMounted, onUpdated, ref, toRef, computed, reactive, watch } from 'vue';

let 库 = pinia库();
onMounted(() => {

})


let 湖北和益订单表 = computed(() => {
  let 湖北和益订单表 = 库.订单表.filter((行: any) => {
    return (行.右镜片供应商 == "湖北和益" || 行.左镜片供应商 == "湖北和益") && 行.订单进度 != '已完成'
  })
  湖北和益订单表 = 湖北和益订单表.sort((前一个值: any, 后一个值: any) => {
    return (前一个值['镜片下单日'] >= 后一个值['镜片下单日'] ? 1 : -1)
  })
  return 湖北和益订单表
}
)
let 山东臻视订单表 = computed(() => {
  let 山东臻视订单表 = 库.订单表.filter((行: any) => {
    return (行.右镜片供应商 == "山东臻视" || 行.左镜片供应商 == "山东臻视") && 行.订单进度 != '已完成'
  })
  山东臻视订单表 = 山东臻视订单表.sort((前一个值: any, 后一个值: any) => {
    return (前一个值['镜片下单日'] >= 后一个值['镜片下单日'] ? 1 : -1)
  })
  return 山东臻视订单表
}
)
let 上海老周订单表 = computed(() => {
  let 上海老周订单表 = 库.订单表.filter((行: any) => {
    return (行.右镜片供应商 == "上海老周" || 行.左镜片供应商 == "上海老周") && 行.订单进度 != '已完成'
  })
  上海老周订单表 = 上海老周订单表.sort((前一个值: any, 后一个值: any) => {
    return (前一个值['镜片下单日'] >= 后一个值['镜片下单日'] ? 1 : -1)
  })
  return 上海老周订单表
}
)
let 湖北蔡司订单表 = computed(() => {
  let 湖北蔡司订单表 = 库.订单表.filter((行: any) => {
    return (行.右镜片供应商 == "湖北蔡司" || 行.左镜片供应商 == "湖北蔡司")&& 行.订单进度 != '已完成'
  })
  湖北蔡司订单表 = 湖北蔡司订单表.sort((前一个值: any, 后一个值: any) => {
    return (前一个值['镜片下单日'] >= 后一个值['镜片下单日'] ? 1 : -1)
  })
  return 湖北蔡司订单表
}
)
let 丹阳夏总订单表 = computed(() => {
  let 丹阳夏总订单表 = 库.订单表.filter((行: any) => {
    return (行.右镜片供应商 == "丹阳夏总" || 行.左镜片供应商 == "丹阳夏总") && 行.订单进度 != '已完成'
  })
  丹阳夏总订单表 = 丹阳夏总订单表.sort((前一个值: any, 后一个值: any) => {
    return (前一个值['镜片下单日'] >= 后一个值['镜片下单日'] ? 1 : -1)
  })
  return 丹阳夏总订单表
}
)






let 改右 = async (行数据: any) => {
  if (行数据.右镜片备好日 == "") { 行数据.右镜片备好日 = 库.月 + '月' + 库.日 }
  else { 行数据.右镜片备好日 = "" }
  库.通讯('订单', "改", 行数据);
}
let 改左 = async (行数据: any) => {
  if (行数据.左镜片备好日 == "") { 行数据.左镜片备好日 = 库.月 + '月' + 库.日 }
  else { 行数据.左镜片备好日 = "" }
  库.通讯('订单', "改", 行数据);
}





let 湖北和益日期显示判定 = (k) => {
  if (k > 0) {

    if (湖北和益订单表.value[k].右镜片订货日 == 湖北和益订单表.value[k - 1].左镜片订货日)
      return false
    else return true
  }
  return true
}
let 山东臻视日期显示判定 = (k) => {
  if (k > 0) {

    if (山东臻视订单表.value[k].右镜片订货日 == 山东臻视订单表.value[k - 1].左镜片订货日)
      return false
    else return true
  }
  return true
}
let 上海老周日期显示判定 = (k) => {
  if (k > 0) {

    if (上海老周订单表.value[k].右镜片订货日 == 上海老周订单表.value[k - 1].左镜片订货日)
      return false
    else return true
  }
  return true
}
let 湖北蔡司日期显示判定 = (k) => {
  if (k > 0) {

    if (湖北蔡司订单表.value[k].右镜片订货日 == 湖北蔡司订单表.value[k - 1].左镜片订货日)
      return false
    else return true
  }
  return true
}
let 丹阳夏总日期显示判定 = (k) => {
  if (k > 0) {

    if (丹阳夏总订单表.value[k].右镜片订货日 == 丹阳夏总订单表.value[k - 1].左镜片订货日)
      return false
    else return true
  }
  return true
}








</script>

<template>
  <div class="整页 ">

    <div class="顶部 ">

     订货表

    </div>
    <!-- 表格模块 -->
    <div class="主体 滑条 ">
      <div class="湖北和益  ">
        <h1>湖北和益</h1>
        <div class="订单行  " v-for=" i, k in 湖北和益订单表">
          <div class="日期行">
            <div v-if="湖北和益日期显示判定(k)"> 订货日{{ 湖北和益订单表[k].右镜片订货日 }}</div>
          </div>
          <div v-if="(湖北和益订单表[k].右近视 || 湖北和益订单表[k].右散光) && 湖北和益订单表[k].右镜片供应商 == '湖北和益'" class="光度行">
            <div>{{ 湖北和益订单表[k].订单号 }}</div>
            <div>{{ 湖北和益订单表[k].镜片 }}</div>
            <div>{{ 湖北和益订单表[k].右近视 }}</div>
            <div>{{ 湖北和益订单表[k].右散光 }}</div>
            <div :class="{ 警示: 湖北和益订单表[k].右镜片备好日 == '', 按钮: true }" @click="改右(湖北和益订单表[k])">
              {{ 湖北和益订单表[k].右镜片备好日 != '' ? 湖北和益订单表[k].右镜片备好日 : "未收到" }}
            </div>
          </div>
          <div class="日期行">
            <div v-if="湖北和益订单表[k].左镜片订货日 != 湖北和益订单表[k].右镜片订货日"> 订货日{{ 湖北和益订单表[k].左镜片订货日 }}</div>
          </div>
          <div v-if="(湖北和益订单表[k].左近视 || 湖北和益订单表[k].左散光) && 湖北和益订单表[k].左镜片供应商 == '湖北和益'" class="光度行">
            <div>{{ 湖北和益订单表[k].订单号 }}</div>
            <div>{{ 湖北和益订单表[k].镜片 }}</div>
            <div>{{ 湖北和益订单表[k].左近视 }}</div>
            <div>{{ 湖北和益订单表[k].左散光 }}</div>
            <div :class="{ 警示: 湖北和益订单表[k].左镜片备好日 == '', 按钮: true }" @click="改左(湖北和益订单表[k])">
              {{ 湖北和益订单表[k].左镜片备好日 != '' ? 湖北和益订单表[k].左镜片备好日 : "未收到" }}
            </div>

          </div>
        </div>
      </div>
      <div class="山东臻视 滑条 ">
        <h1>山东臻视</h1>
        <div class="订单行 " v-for=" i, k in 山东臻视订单表">
          <div class="日期行">
            <div v-if="山东臻视日期显示判定(k)"> 订货日{{ 山东臻视订单表[k].右镜片订货日 }}</div>
          </div>
          <div v-if="(山东臻视订单表[k].右近视 || 山东臻视订单表[k].右散光) && 山东臻视订单表[k].右镜片供应商 == '山东臻视'" class="光度行">
            <div>{{ 山东臻视订单表[k].订单号 }}</div>
            <div>{{ 山东臻视订单表[k].镜片 }}</div>
            <div>{{ 山东臻视订单表[k].右近视 }}</div>
            <div>{{ 山东臻视订单表[k].右散光 }}</div>
            <div :class="{ 警示: 山东臻视订单表[k].右镜片备好日 == '', 按钮: true }" @click="改右(山东臻视订单表[k])">
              {{ 山东臻视订单表[k].右镜片备好日 != '' ? 山东臻视订单表[k].右镜片备好日 : "未收到" }}
            </div>
          </div>
          <div class="日期行">
            <div v-if="山东臻视订单表[k].左镜片订货日 != 山东臻视订单表[k].右镜片订货日"> 订货日{{ 山东臻视订单表[k].左镜片订货日 }}</div>
          </div>
          <div v-if="(山东臻视订单表[k].左近视 || 山东臻视订单表[k].左散光) && 山东臻视订单表[k].左镜片供应商 == '山东臻视'" class="光度行">
            <div>{{ 山东臻视订单表[k].订单号 }}</div>
            <div>{{ 山东臻视订单表[k].镜片 }}</div>
            <div>{{ 山东臻视订单表[k].左近视 }}</div>
            <div>{{ 山东臻视订单表[k].左散光 }}</div>
            <div :class="{ 警示: 山东臻视订单表[k].左镜片备好日 == '', 按钮: true }" @click="改左(山东臻视订单表[k])">
              {{ 山东臻视订单表[k].左镜片备好日 != '' ? 山东臻视订单表[k].左镜片备好日 : "未收到" }}
            </div>

          </div>
        </div>
      </div>

      <div class="上海老周 滑条 ">
        <h1>上海老周</h1>
        <div class="订单行 " v-for=" i, k in 上海老周订单表">
          <div class="日期行">
            <div v-if="上海老周日期显示判定(k)"> 订货日{{ 上海老周订单表[k].右镜片订货日 }}</div>
          </div>
          <div v-if="(上海老周订单表[k].右近视 || 上海老周订单表[k].右散光) && 上海老周订单表[k].右镜片供应商 == '上海老周'" class="光度行">
            <div>{{ 上海老周订单表[k].订单号 }}</div>
            <div>{{ 上海老周订单表[k].镜片 }}</div>
            <div>{{ 上海老周订单表[k].右近视 }}</div>
            <div>{{ 上海老周订单表[k].右散光 }}</div>
            <div :class="{ 警示: 上海老周订单表[k].右镜片备好日 == '', 按钮: true }" @click="改右(上海老周订单表[k])">
              {{ 上海老周订单表[k].右镜片备好日 != '' ? 上海老周订单表[k].右镜片备好日 : "未收到" }}
            </div>
          </div>
          <div class="日期行">
            <div v-if="上海老周订单表[k].左镜片订货日 != 上海老周订单表[k].右镜片订货日"> 订货日{{ 上海老周订单表[k].左镜片订货日 }}</div>
          </div>
          <div v-if="(上海老周订单表[k].左近视 || 上海老周订单表[k].左散光) && 上海老周订单表[k].左镜片供应商 == '上海老周'" class="光度行">
            <div>{{ 上海老周订单表[k].订单号 }}</div>
            <div>{{ 上海老周订单表[k].镜片 }}</div>
            <div>{{ 上海老周订单表[k].左近视 }}</div>
            <div>{{ 上海老周订单表[k].左散光 }}</div>
            <div :class="{ 警示: 上海老周订单表[k].左镜片备好日 == '', 按钮: true }" @click="改左(上海老周订单表[k])">
              {{ 上海老周订单表[k].左镜片备好日 != '' ? 上海老周订单表[k].左镜片备好日 : "未收到" }}
            </div>
          </div>
        </div>
      </div>
      <div class="湖北蔡司 滑条 ">
        <h1>湖北蔡司</h1>
        <div class="订单行 " v-for=" i, k in 湖北蔡司订单表">
          <!-- <input class="两列" v-model.lazy="湖北蔡司订单表[k].镜片订货日" placeholder="镜片订货日" list="日期"> -->
          <div class="日期行">
            <div v-if="湖北蔡司日期显示判定(k)"> 订货日{{ 湖北蔡司订单表[k].右镜片订货日 }}</div>
          </div>
          <div v-if="(湖北蔡司订单表[k].右近视 || 湖北蔡司订单表[k].右散光) && 湖北蔡司订单表[k].右镜片供应商 == '湖北蔡司'" class=" 光度行 蔡司光度行">
            <div>{{ 湖北蔡司订单表[k].订单号 }}</div>
            <div>{{ 湖北蔡司订单表[k].镜片 }}</div>
            <div>{{ 湖北蔡司订单表[k].右近视 }}</div>
            <div>{{ 湖北蔡司订单表[k].右散光 }}</div>
            <div :class="{ 警示: 湖北蔡司订单表[k].右镜片备好日 == '', 按钮: true }" @click="改右(湖北蔡司订单表[k])">
              {{ 湖北蔡司订单表[k].右镜片备好日 != '' ? 湖北蔡司订单表[k].右镜片备好日 + '送蔡司' : "未收到" }}
            </div>
          </div>
          <div class="日期行">
            <div v-if="湖北蔡司订单表[k].左镜片订货日 != 湖北蔡司订单表[k].右镜片订货日"> 订货日{{ 湖北蔡司订单表[k].左镜片订货日 }}</div>
          </div>
          <div v-if="(湖北蔡司订单表[k].左近视 || 湖北蔡司订单表[k].左散光) && 湖北蔡司订单表[k].左镜片供应商 == '湖北蔡司'" class="光度行 蔡司光度行">
            <div>{{ 湖北蔡司订单表[k].订单号 }}</div>
            <div>{{ 湖北蔡司订单表[k].镜片 }}</div>
            <div>{{ 湖北蔡司订单表[k].左近视 }}</div>
            <div>{{ 湖北蔡司订单表[k].左散光 }}</div>
            <div :class="{ 警示: 湖北蔡司订单表[k].左镜片备好日 == '', 按钮: true }" @click="改左(湖北蔡司订单表[k])">
              {{ 湖北蔡司订单表[k].左镜片备好日 != '' ? 湖北蔡司订单表[k].左镜片备好日 + '送蔡司' : "未收到" }}
            </div>
          </div>
        </div>
      </div>
      <div class="丹阳夏总 滑条 ">
        <h1>丹阳夏总</h1>
        <div class="订单行 " v-for=" i, k in 丹阳夏总订单表">
          <!-- <input class="两列" v-model.lazy="丹阳夏总订单表[k].镜片订货日" placeholder="镜片订货日" list="日期"> -->
          <div class="日期行">
            <div v-if="丹阳夏总日期显示判定(k)"> 订货日{{ 丹阳夏总订单表[k].右镜片订货日 }}</div>
          </div>
          <div v-if="(丹阳夏总订单表[k].右近视 || 丹阳夏总订单表[k].右散光) && 丹阳夏总订单表[k].右镜片供应商 == '丹阳夏总'" class="光度行">
            <div>{{ 丹阳夏总订单表[k].订单号 }}</div>
            <div>{{ 丹阳夏总订单表[k].镜片 }}</div>
            <div>{{ 丹阳夏总订单表[k].右近视 }}</div>
            <div>{{ 丹阳夏总订单表[k].右散光 }}</div>
            <div :class="{ 警示: 丹阳夏总订单表[k].右镜片备好日 == '', 按钮: true }" @click="改右(丹阳夏总订单表[k])">
              {{ 丹阳夏总订单表[k].右镜片备好日 != '' ? 丹阳夏总订单表[k].右镜片备好日 : "未收到" }}
            </div>
          </div>
          <div class="日期行">
            <div v-if="丹阳夏总订单表[k].左镜片订货日 != 丹阳夏总订单表[k].右镜片订货日"> 订货日{{ 丹阳夏总订单表[k].左镜片订货日 }}</div>
          </div>
          <div v-if="(丹阳夏总订单表[k].左近视 || 丹阳夏总订单表[k].左散光) && 丹阳夏总订单表[k].左镜片供应商 == '丹阳夏总'" class="光度行">
            <div>{{ 丹阳夏总订单表[k].订单号 }}</div>
            <div>{{ 丹阳夏总订单表[k].镜片 }}</div>
            <div>{{ 丹阳夏总订单表[k].左近视 }}</div>
            <div>{{ 丹阳夏总订单表[k].左散光 }}</div>
            <div :class="{ 警示: 丹阳夏总订单表[k].左镜片备好日 == '', 按钮: true }" @click="改左(丹阳夏总订单表[k])">
              {{ 丹阳夏总订单表[k].左镜片备好日 != '' ? 丹阳夏总订单表[k].左镜片备好日 : "未收到" }}
            </div>
          </div>
        </div>
      </div>



    </div>

  </div>
  <datalist id="日期">
    <option :value=库.月日>今天收到</option>
  </datalist>
</template>



<style  lang="scss" scoped>
.整页 {
  overflow: auto;
  gap: 3px;
  grid-template-rows: 30px 1fr;
  grid-template-columns: 1fr;

  .主体 {
    gap: 3px;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-content: start;

    .订单行 {
      height: auto;
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      border-radius: 5px;
      font-size: small;
      font-weight: bold;
      color: $纯黑;
      cursor: pointer;
      transition: all 0.3s;

      .光度行 {
        background-color: #ff990050;
        grid-template-rows: 1fr;
        grid-template-columns: 65px 2.5fr 50px 50px 60px;
        border-top: 2px solid #fff;
      }

      .蔡司光度行 {
        grid-template-columns: 65px 2.5fr 50px 50px 90px;
      }
    }


    .湖北和益 {
      align-content: start;
      border: 3px solid $正黄;
    }

    .山东臻视 {
      align-content: start;
      border: 3px solid $正蓝;
    }

    .上海老周 {
      align-content: start;
      border: 3px solid $正红;
    }

    .湖北蔡司 {
      align-content: start;
      border: 3px solid $正绿;
    }

    .丹阳夏总 {
      align-content: start;
      border: 3px solid $暗黄;
    }
  }

  .按钮 {
    background: $正绿;
  }

  .警示 {
    background: $正红;
  }



  .按钮:hover {
    background: $暗绿;
  }


}
</style>