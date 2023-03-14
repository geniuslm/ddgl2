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
  console.log(库.订单表[0]);
   库.初始化()
  供应商表初始化()
})
let 输入文字 = ref("")


watch(() => 库.订单表, (值) => {
  console.log('订单表更改');

}, { deep: true })

let 湖北和益订单表 = reactive([])
let 山东臻视订单表 = reactive([])
let 上海老周订单表 = reactive([])
let 湖北蔡司订单表 = reactive([])
let 丹阳夏总订单表 = reactive([])
let 供应商表初始化 = () => {
  for (let i in 库.订单表) {
    let 行 = 库.订单表[i]
    if (行.镜片供应商 == "湖北和益" && 行.订单进度 != "未完成") {
      湖北和益订单表.push(行)
    }
    if (行.镜片供应商 == "山东臻视" && 行.订单进度 != "未完成") {
      山东臻视订单表.push(行)
    }
    if (行.镜片供应商 == "上海老周" && 行.订单进度 != "未完成") {
      上海老周订单表.push(行)
    }
    if (行.镜片供应商 == "湖北蔡司" && 行.订单进度 != "未完成") {
      湖北蔡司订单表.push(行)
    }
    if (行.镜片供应商 == "丹阳夏总" && 行.订单进度 != "未完成") {
      丹阳夏总订单表.push(行)
    }
  }
}



let 改 = async (行数据: any) => {
  console.log("更改备好日");

  if (行数据.镜片备好日 == "没备好") { 行数据.镜片备好日 = 库.月日 }
  else { 行数据.镜片备好日 = '没备好' }
  console.log(行数据);
  库.通讯('订单', "改", 行数据);

}


let 日期显示判定 = (k) => {
  if (k > 0) {
    if (湖北和益订单表[k].镜片订货日 == 湖北和益订单表[k - 1].镜片订货日)
      return false
    else return true
  }
  return true
}


</script>

<template>
  <div class="整页 ">

    <div class="顶部 ">
      <div class="按钮组">
        <div @click="库.订单正逆序 = 1" :class="{ 选中按钮: 库.订单正逆序 == 1 }" class="按钮">
          <icon 图标名="lm-arrowdown" 颜色="#FFF" font-size='20px' />
        </div>
        <div @click="库.订单正逆序 = 1" :class="{ 选中按钮: 库.订单正逆序 == 1 }" class="按钮">
          <icon 图标名="lm-arrowdown" 颜色="#FFF" font-size='20px' />
        </div>
        <div @click="供应商表初始化()" class="按钮">
          <icon 图标名="lm-arrowup" 颜色="#FFF" font-size='20px' />
        </div>
      </div>
      <div class="按钮组">
        <div @click="库.订单分类[0] = '全部', 库.当前页 = 1" :class="{ 选中按钮: 库.订单分类[0] == '全部' }" class="按钮">全部{{ }}
        </div>
        <div @click="库.订单分类[0] = '本年', 库.当前页 = 1" :class="{ 选中按钮: 库.订单分类[0] == '本年' }" class="按钮">本年{{ }}
        </div>
        <div @click="库.订单分类[0] = '本月', 库.当前页 = 1" :class="{ 选中按钮: 库.订单分类[0] == '本月' }" class="按钮">本月{{ }}
        </div>
        <div @click="库.订单分类[0] = '本日', 库.当前页 = 1" :class="{ 选中按钮: 库.订单分类[0] == '本日' }" class="按钮">本日{{ }}
        </div>
      </div>
      <div class="按钮组">
        <div @click="库.订单分类[1] = '已完成', 库.当前页 = 1" :class="{ 选中按钮: 库.订单分类[1] == '已完成' }" class="按钮">已完成{{ }}
        </div>
        <div @click="库.订单分类[1] = '未完成', 库.当前页 = 1" :class="{ 选中按钮: 库.订单分类[1] == '未完成' }" class="按钮">未完成{{ }}
        </div>
      </div>
      <div class="筛选数字">{{ 湖北和益订单表.length }}</div>


      <div></div>
      <div class="搜索">
        <input class="搜索框" v-model.lazy="输入文字" placeholder="输入文字">
        <icon 图标名="lm-close-circle-fill" @click="库.订单全局搜索值 = ''" 颜色="#FFF" font-size='20px' />
        <div v-show="库.订单全局搜索值 != ''" class="搜索数量" 通过筛选数量> {{ 库.通过筛选的数量 }}</div>
      </div>
      <lmButton>添加新订单
        <icon 图标名="lm-plus-circle-fill" @click="库.订单全局搜索值 = ''" 颜色="#fff" font-size='20px' />
      </lmButton>




    </div>
    <!-- 表格模块 -->
    <div class="主体 ">
      <div class="湖北和益">
        <div class="订单行" v-for=" i, k in 湖北和益订单表">
          <!-- <input class="两列" v-model.lazy="湖北和益订单表[k].镜片订货日" placeholder="镜片订货日" list="日期"> -->
          <div class="整行">
            <div v-if="日期显示判定(k)"> {{ 湖北和益订单表[k].镜片订货日 }}</div>
          </div>

          <div class="订单行内部1">
            <div>{{ 湖北和益订单表[k].镜片 }}</div>
            <div>{{ 湖北和益订单表[k].镜片 }}</div>
          </div>
          <div class="订单行内部2">
            <div v-if="湖北和益订单表[k].右近视">
              <div>近{{ 湖北和益订单表[k].右近视 }}</div>
              <div>散{{ 湖北和益订单表[k].右散光 }}</div>
            </div>
            <div v-if="湖北和益订单表[k].左近视">
              <div> 近{{ 湖北和益订单表[k].左近视 }}</div>
              <div> 散{{ 湖北和益订单表[k].左散光 }}</div>
            </div>
          </div>
          <div class="订单行内部3">
            <!-- <input @change="改(湖北和益订单表[k])" :class="{}" v-model.lazy="湖北和益订单表[k].镜片备好日" placeholder="镜片备好日" list="日期"> -->
            <div :class="{ 按钮: 湖北和益订单表[k].镜片备好日, 警示: true }" @click="改(湖北和益订单表[k])">{{ 湖北和益订单表[k].镜片备好日 ? 湖北和益订单表[k].镜片备好日
              :
              "未收到" }}
            </div>
          </div>

        </div>
      </div>
      <div class="山东臻视">
        <div class="订单行" v-for=" i, k in 湖北和益订单表">
          <!-- <input class="两列" v-model.lazy="湖北和益订单表[k].镜片订货日" placeholder="镜片订货日" list="日期"> -->
          <div class="整行">
            <div v-if="日期显示判定(k)"> {{ 湖北和益订单表[k].镜片订货日 }}</div>
          </div>

          <div class="订单行内部1">
            <div>{{ 湖北和益订单表[k].镜片 }}</div>
            <div>{{ 湖北和益订单表[k].镜片 }}</div>
          </div>
          <div class="订单行内部2">
            <div v-if="湖北和益订单表[k].右近视">
              <input v-model="湖北和益订单表[k].右近视">
              <div>散{{ 湖北和益订单表[k].右散光 }}</div>
            </div>
            <div v-if="湖北和益订单表[k].左近视">
              <div> 近{{ 湖北和益订单表[k].左近视 }}</div>
              <div> 散{{ 湖北和益订单表[k].左散光 }}</div>
            </div>
          </div>
          <div class="订单行内部3">
            <!-- <input @change="改(湖北和益订单表[k])" :class="{}" v-model.lazy="湖北和益订单表[k].镜片备好日" placeholder="镜片备好日" list="日期"> -->
            <div class="按钮" @click="改(湖北和益订单表[k])">{{ 湖北和益订单表[k].镜片备好日 ? 湖北和益订单表[k].镜片备好日 : "收到" }}</div>
          </div>

        </div>
      </div>
      <div class="上海老周">上海老周</div>
      <div class="湖北蔡司">湖北蔡司</div>
      <div class="丹阳夏总">丹阳夏总</div>

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
      grid-template-columns: 1fr 120px 50px;
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

  .警示 {
    background: $正红;
  }

  .按钮 {
    background: $正绿;
  }

  .按钮:hover {
    background: $暗绿;
  }


}
</style>