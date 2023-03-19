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


let 湖北和益订单表 = computed(() => 库.订单表.filter((行: any) => { return 行.镜片供应商 == "湖北和益" && 行.订单进度 != '已完成' }))
let 山东臻视订单表 = computed(() => 库.订单表.filter((行: any) => { return 行.镜片供应商 == "山东臻视" && 行.订单进度 != '已完成' }))
let 上海老周订单表 = computed(() => 库.订单表.filter((行: any) => { return 行.镜片供应商 == "上海老周" && 行.订单进度 != '已完成' }))
let 湖北蔡司订单表 = computed(() => 库.订单表.filter((行: any) => { return 行.镜片供应商 == "湖北蔡司" && 行.订单进度 != '已完成' }))
let 丹阳夏总订单表 = computed(() => 库.订单表.filter((行: any) => { return 行.镜片供应商 == "丹阳夏总" && 行.订单进度 != '已完成' }))




let 改 = async (行数据: any) => {
  if (行数据.镜片备好日 == "") { 行数据.镜片备好日 = 库.月日+'收到' }
  else { 行数据.镜片备好日 = "" }
  库.通讯('订单', "改", 行数据);
}

let 改蔡司 = async (行数据: any) => {
  if (行数据.镜片备好日 == "") { 行数据.镜片备好日 = 库.月日+"送蔡司" }
  else { 行数据.镜片备好日 = "" }
  库.通讯('订单', "改", 行数据);
}


let 和益日期显示判定 = (k) => {
  if (k > 0) {

    if (湖北和益订单表.value[k].镜片订货日 == 湖北和益订单表.value[k - 1].镜片订货日)
      return false
    else return true
  }
  return true
}
let 臻视日期显示判定 = (k) => {
  if (k > 0) {

    if (山东臻视订单表.value[k].镜片订货日 == 山东臻视订单表.value[k - 1].镜片订货日)
      return false
    else return true
  }
  return true
}
let 老周日期显示判定 = (k) => {
  if (k > 0) {

    if (上海老周订单表.value[k].镜片订货日 == 上海老周订单表.value[k - 1].镜片订货日)
      return false
    else return true
  }
  return true
}
let 蔡司日期显示判定 = (k) => {
  if (k > 0) {

    if (湖北蔡司订单表.value[k].镜片订货日 == 湖北蔡司订单表.value[k - 1].镜片订货日)
      return false
    else return true
  }
  return true
}
let 夏总日期显示判定 = (k) => {
  if (k > 0) {

    if (丹阳夏总订单表.value[k].镜片订货日 == 丹阳夏总订单表.value[k - 1].镜片订货日)
      return false
    else return true
  }
  return true
}








</script>

<template>
  <div class="整页 ">

    <div class="顶部 ">

      哈哈订单

    </div>
    <!-- 表格模块 -->
    <div class="主体 ">
      <div class="湖北和益">
        <h1>湖北和益</h1>
        <div class="订单行" v-for=" i, k in 湖北和益订单表">
          <!-- <input class="两列" v-model.lazy="湖北和益订单表[k].镜片订货日" placeholder="镜片订货日" list="日期"> -->
          <div class="整行">
            <div v-if="和益日期显示判定(k)"> {{ 湖北和益订单表[k].镜片订货日 }}</div>
          </div>

          <div class="订单行内部1">
            <div>{{ 湖北和益订单表[k].镜片 }}</div>
            <div>{{ 湖北和益订单表[k].镜片 }}</div>
          </div>
          <div class="订单行内部2">
            <div v-if="湖北和益订单表[k].右近视 || 湖北和益订单表[k].右散光">
              <div>近{{ 湖北和益订单表[k].右近视 }}</div>
              <div>散{{ 湖北和益订单表[k].右散光 }}</div>
            </div>
            <div v-if="湖北和益订单表[k].左近视 || 湖北和益订单表[k].左散光">
              <div> 近{{ 湖北和益订单表[k].左近视 }}</div>
              <div> 散{{ 湖北和益订单表[k].左散光 }}</div>
            </div>
          </div>
          <div class="订单行内部3">
            <!-- <input @change="改(湖北和益订单表[k])" :class="{}" v-model.lazy="湖北和益订单表[k].镜片备好日" placeholder="镜片备好日" list="日期"> -->
            <div :class="{ 警示: 湖北和益订单表[k].镜片备好日 == '', 按钮: true }" @click="改(湖北和益订单表[k])">
              {{ 湖北和益订单表[k].镜片备好日 != '' ? 湖北和益订单表[k].镜片备好日  : "未收到" }}
            </div>
          </div>

        </div>
      </div>
      <div class="山东臻视">
        <h1>山东臻视</h1>
        <div class="订单行" v-for=" i, k in 山东臻视订单表">
          <!-- <input class="两列" v-model.lazy="湖北和益订单表[k].镜片订货日" placeholder="镜片订货日" list="日期"> -->
          <div class="整行">
            <div v-if="臻视日期显示判定(k)"> {{ 山东臻视订单表[k].镜片订货日 }}</div>
          </div>

          <div class="订单行内部1">
            <div>{{ 山东臻视订单表[k].镜片 }}</div>
            <div>{{ 山东臻视订单表[k].镜片 }}</div>
          </div>
          <div class="订单行内部2">
            <div v-if="山东臻视订单表[k].右近视">
              <div>近{{ 山东臻视订单表[k].右近视 }}</div>
              <div>散{{ 山东臻视订单表[k].右散光 }}</div>
            </div>
            <div v-if="山东臻视订单表[k].左近视">
              <div> 近{{ 山东臻视订单表[k].左近视 }}</div>
              <div> 散{{ 山东臻视订单表[k].左散光 }}</div>
            </div>
          </div>
          <div class="订单行内部3">
            <!-- <input @change="改(山东臻视订单表[k])" :class="{}" v-model.lazy="山东臻视订单表[k].镜片备好日" placeholder="镜片备好日" list="日期"> -->

            <div :class="{ 警示: 山东臻视订单表[k].镜片备好日 == '', 按钮: true }" @click="改(山东臻视订单表[k])">
              {{ 山东臻视订单表[k].镜片备好日 != '' ? 山东臻视订单表[k].镜片备好日 : "未收到" }}
            </div>
          </div>
        </div>
      </div>
      <div class="上海老周">
        <h1>上海老周</h1>
        <div class="订单行" v-for=" i, k in 上海老周订单表">
          <!-- <input class="两列" v-model.lazy="湖北和益订单表[k].镜片订货日" placeholder="镜片订货日" list="日期"> -->
          <div class="整行">
            <div v-if="老周日期显示判定(k)"> {{ 上海老周订单表[k].镜片订货日 }}</div>
          </div>

          <div class="订单行内部1">
            <div>{{ 上海老周订单表[k].镜片 }}</div>
            <div>{{ 上海老周订单表[k].镜片 }}</div>
          </div>
          <div class="订单行内部2">
            <div v-if="上海老周订单表[k].右近视">
              <div>近{{ 上海老周订单表[k].右近视 }}</div>
              <div>散{{ 上海老周订单表[k].右散光 }}</div>
            </div>
            <div v-if="上海老周订单表[k].左近视">
              <div> 近{{ 上海老周订单表[k].左近视 }}</div>
              <div> 散{{ 上海老周订单表[k].左散光 }}</div>
            </div>
          </div>
          <div class="订单行内部3">
            <!-- <input @change="改(上海老周订单表[k])" :class="{}" v-model.lazy="上海老周订单表[k].镜片备好日" placeholder="镜片备好日" list="日期"> -->
            <div :class="{ 警示: 上海老周订单表[k].镜片备好日 == '', 按钮: true }" @click="改(上海老周订单表[k])">
              {{ 上海老周订单表[k].镜片备好日 != '' ? 上海老周订单表[k].镜片备好日 : "未收到" }}
            </div>
          </div>
        </div>

      </div>
      <div class="湖北蔡司">
        <h1>湖北蔡司</h1>
        <div class="订单行" v-for=" i, k in 湖北蔡司订单表">
          <!-- <input class="两列" v-model.lazy="湖北和益订单表[k].镜片订货日" placeholder="镜片订货日" list="日期"> -->
          <div class="整行">
            <div v-if="蔡司日期显示判定(k)"> {{ 湖北蔡司订单表[k].镜片订货日 }}</div>
          </div>

          <div class="订单行内部1">
            <div>{{ 湖北蔡司订单表[k].镜片 }}</div>
            <div>{{ 湖北蔡司订单表[k].镜片 }}</div>
          </div>
          <div class="订单行内部2">
            <div v-if="湖北蔡司订单表[k].右近视">
              <div>近{{ 湖北蔡司订单表[k].右近视 }}</div>
              <div>散{{ 湖北蔡司订单表[k].右散光 }}</div>
            </div>
            <div v-if="湖北蔡司订单表[k].左近视">
              <div> 近{{ 湖北蔡司订单表[k].左近视 }}</div>
              <div> 散{{ 湖北蔡司订单表[k].左散光 }}</div>
            </div>
          </div>
          <div class="订单行内部3">
            <!-- <input @change="改(湖北蔡司订单表[k])" :class="{}" v-model.lazy="湖北蔡司订单表[k].镜片备好日" placeholder="镜片备好日" list="日期"> -->
            <div :class="{ 警示: 湖北蔡司订单表[k].镜片备好日 == '', 按钮: true }" @click="改蔡司(湖北蔡司订单表[k])">
              {{ 湖北蔡司订单表[k].镜片备好日 != '' ? 湖北蔡司订单表[k].镜片备好日 : "未收到" }}
            </div>

          </div>
        </div>
      </div>
      <div class="丹阳夏总">
        <h1>丹阳夏总</h1>
        <div class="订单行" v-for=" i, k in 丹阳夏总订单表">
          <!-- <input class="两列" v-model.lazy="湖北和益订单表[k].镜片订货日" placeholder="镜片订货日" list="日期"> -->
          <div class="整行">
            <div v-if="夏总日期显示判定(k)"> {{ 丹阳夏总订单表[k].镜片订货日 }}</div>
          </div>

          <div class="订单行内部1">
            <div>{{ 丹阳夏总订单表[k].镜片 }}</div>
            <div>{{ 丹阳夏总订单表[k].镜片 }}</div>
          </div>
          <div class="订单行内部2">
            <div v-if="丹阳夏总订单表[k].右近视">
              <div>近{{ 丹阳夏总订单表[k].右近视 }}</div>
              <div>散{{ 丹阳夏总订单表[k].右散光 }}</div>
            </div>
            <div v-if="丹阳夏总订单表[k].左近视">
              <div> 近{{ 丹阳夏总订单表[k].左近视 }}</div>
              <div> 散{{ 丹阳夏总订单表[k].左散光 }}</div>
            </div>
          </div>
          <div class="订单行内部3">
            <!-- <input @change="改(丹阳夏总订单表[k])" :class="{}" v-model.lazy="丹阳夏总订单表[k].镜片备好日" placeholder="镜片备好日" list="日期"> -->
            <div :class="{ 警示: 丹阳夏总订单表[k].镜片备好日 == '', 按钮: true }" @click="改(丹阳夏总订单表[k])">
              {{ 丹阳夏总订单表[k].镜片备好日 != '' ? 丹阳夏总订单表[k].镜片备好日 : "未收到" }}
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
input {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 0.5px solid rgb(225, 225, 225);
  text-align: center;
  border-radius: 5px;
  background-color: #F0F2F5;
  font-weight: bolder;
}

.整页 {
  overflow: auto;
  gap: 3px;
  grid-template-rows: 30px 1fr;
  grid-template-columns: 1fr;

  .顶部 {
    gap: 10px;
    grid-template-columns: 80px 300px 200px 45px 1fr 150px 150px;

    .按钮组 {
      gap: 1px;
      background: $浅灰;
      border-radius: 5px;
      grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
      grid-template-rows: 1fr;

      .按钮 {
        background-color: $浅灰;
        color: $纯白;
        font-weight: bold;
        grid-auto-flow: column;

        cursor: pointer;
        transition: all 0.3s;

        &:first-child {
          border-radius: 5px 0px 0px 5px;
        }

        &:last-child {
          border-radius: 0px 5px 5px 0px;
        }

        &:hover {
          background-color: $正绿;
        }
      }

      .选中按钮 {
        background-color: $正绿;
      }

    }

    .筛选数字 {
      font-size: large;
      color: $浅灰;
      font-weight: bold;
      border-radius: 5px;

    }

    .搜索 {
      background-color: $正绿;
      color: $纯白;
      font-weight: bold;
      grid-template-rows: 1fr;
      grid-template-columns: 1fr 30px 30px;
      border-radius: 5px;

      .搜索框 {
        border: none;
        height: 100%;
        width: 100%;
        color: $纯白;
        font-weight: bold;
        background-color: $正绿;
        border-radius: 5px;
        text-align: center;

      }

    }


  }

  .主体 {
    gap: 3px;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

    .订单行 {
      height: auto;
      grid-template-columns: 1fr 120px 55px;
      grid-template-rows: 1fr;
      border-radius: 5px;
      font-size: small;
      font-weight: bold;
      color: $纯黑;
      cursor: pointer;
      transition: all 0.3s;

      .整行 {
        grid-column: 1 / span 3
      }

      .订单行内部1 {
        gap: 3px;
        grid-template-rows: 1fr 1fr;

        div {
          background-color: #ff990050;
        }

      }

      .订单行内部2 {
        gap: 3px;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr;
        border-radius: 5px;


        div {
          background-color: #ff990020;
          grid-template-rows: 1fr;
          grid-template-columns: 1fr 1fr;


          div {
            justify-items: start;
            grid-template-rows: 1fr;
            grid-template-columns: 1fr;
          }
        }
      }

      .订单行内部3 {
        grid-template-rows: 1fr;
        grid-template-columns: 1fr;
      }
    }


    .湖北和益 {
      align-content: start;
      gap: 3px;
      border: 3px solid $正黄;
    }

    .山东臻视 {
      align-content: start;
      gap: 3px;
      border: 3px solid $正蓝;
    }

    .上海老周 {
      align-content: start;
      gap: 3px;
      border: 3px solid $正红;
    }

    .湖北蔡司 {
      align-content: start;
      gap: 3px;
      border: 3px solid $正绿;
    }

    .丹阳夏总 {
      align-content: start;
      gap: 3px;
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