<script setup lang = "ts">
import { useRouter } from 'vue-router';
import { ref, toRefs, reactive, computed, watch } from 'vue';
import Icon from './icons/Icon.vue';
import { socket } from "../stores/socket链接";
import { pinia库, 镜片类 } from '../stores/pinia库';

let 库 = pinia库();

let 图标颜色 = ref("#666")
let 编辑记录附加页 = ref(false)
let 购买记录附加页 = ref(false)

let { 序号 } = defineProps(['序号'])
let 行数据 = 库.订单表[序号]
let 订单号分解 = 行数据.订单号.slice(2, 4) + "月" + 行数据.订单号.slice(4, 6) + "日 第" + 行数据.订单号.slice(6, 8) + "单"
let 改 = async (行数据: any) => {
  if (图标颜色.value == "#67C23A") {
    let 深拷贝行数据 = JSON.parse(JSON.stringify(行数据))
    delete 深拷贝行数据.编辑记录
    await 行数据.编辑记录.push(库.月日 + 库.当前登录用户 + '修改#' + JSON.stringify(深拷贝行数据))
    库.通讯('订单', "改", 行数据);
  }
  图标颜色.value = "#666"
}


let 删 = (行数据: any) => { console.log(行数据); 库.通讯('订单', "删", 行数据) }
let 编辑记录 = () => { 编辑记录附加页.value = !编辑记录附加页.value }

watch(() => 行数据, (值) => {
  图标颜色.value = "#67C23A"
  if (parseInt(值.右近视) > 1000) {
    console.log('右近视超过1000');
  }
  console.log('更改 ' + 值.订单号 + 值.旺旺名)
}, { deep: true })




let 镜片名判定 = () => {
  //console.log(""+库.镜片名选项.includes(行数据.镜片));
  return !库.镜片名选项.includes(行数据.镜片)
}
let 运单号判定 = () => {
  return 行数据.镜框运单号 == ''
}
let 旺旺号判定 = () => {
  行数据.购买记录 = []
  let 筛选过的订单表 = 库.订单表.filter((行: any) => {
    return 行.旺旺名 == 行数据.旺旺名
  })
  let 深拷贝的订单表 = JSON.parse(JSON.stringify(筛选过的订单表))
  for (let i in 深拷贝的订单表) {
    if (深拷贝的订单表[i].订单号 < 行数据.订单号) {
      delete 深拷贝的订单表[i].购买记录
      delete 深拷贝的订单表[i].编辑记录
      行数据.购买记录.push(JSON.stringify(深拷贝的订单表[i]))
    }
  }

}




</script>

<template>
  <div class="行整页">
    <div class="标识格">
      <div class="订单号">
        <div>订单号:{{ 行数据.订单号 }} </div>
        <div>{{ 订单号分解 }} </div>
      </div>
      <input class="标识" v-model.lazy="行数据.收件人" placeholder="收件人">
      <div class="旺旺名">
        <input @change="旺旺号判定()" v-model.lazy="行数据.旺旺名" placeholder="旺旺名">
        <div @click="购买记录附加页 = !购买记录附加页">
          {{ 行数据.购买记录.length + 1 == 1 ? '新' : 行数据.购买记录.length + 1 }}
        </div>
      </div>

    </div>

    <div class="镜片格">
      <input class="镜片" v-model.lazy="行数据.镜片下单日" placeholder="镜片下单日" list="日期">
      <input v-if="库.当前登录用户类型 == '助理'" class="镜片" v-model.lazy="行数据.镜片订货日" placeholder="镜片订货日" list="日期">
      <input v-if="库.当前登录用户类型 == '助理'" class="镜片" v-model.lazy="行数据.镜片备好日" placeholder="镜片备好日" list="日期">
      <div v-if="库.当前登录用户类型 == '客服'"  class="镜片" >{{ 行数据.镜片下单日?行数据.镜片下单日:"未定" }}</div>
      <div v-if="库.当前登录用户类型 == '客服'"  class="镜片" >{{ 行数据.镜片备好日?行数据.镜片备好日:"未备好" }}</div>     
      <input class="镜片 三列 " :class="{ 警告色: 镜片名判定() }" v-model.lazy="行数据.镜片" placeholder="镜片" list="镜片名">


      <div class="验光数据 三列">
        <input v-model.lazy="行数据.右近视" placeholder="右近视">
        <input v-model.lazy="行数据.右散光" placeholder="右散光">
        <input v-model.lazy="行数据.右轴向" placeholder="右轴向">
        <input v-model.lazy="行数据.右瞳距" placeholder="右瞳距">
        <input v-model.lazy="行数据.左近视" placeholder="左近视">
        <input v-model.lazy="行数据.左散光" placeholder="左散光">
        <input v-model.lazy="行数据.左轴向" placeholder="左轴向">
        <input v-model.lazy="行数据.左瞳距" placeholder="左瞳距">

      </div>
    </div>

    <div class="镜框格">
      <input v-model.lazy="行数据.镜框下单日" placeholder="镜框下单日" list="日期">
      <input v-model.lazy="行数据.镜框发货日" placeholder="镜框发货日" list="日期">
      <input v-model.lazy="行数据.镜框备好日" placeholder="镜框备好日" list="日期">
      <div class="镜框第一行">
        <div class="镜框选项">
          <input v-model=行数据.镜框选项 list="镜框选项" placeholder="镜框选项">
          <icon 图标名="lm-close-circle-fill" @click="行数据.镜框选项 = ''" 颜色="#666" font-size='20px' />
        </div>

        <input v-if="行数据.镜框选项 == '来框加工'" v-model.lazy="行数据.镜框运单号" :class="{ 警告色: 运单号判定() }" placeholder="请输入运单号">
        <div v-if="行数据.镜框选项 == '试戴镜框'" class="试戴镜框 滑条">
          <input v-for="i in [1, 2, 3, 4, 5, 6, 7, 8]" v-model.lazy="行数据.试戴镜框[i - 1]" class="" :placeholder="'试戴' + i">
        </div>
      </div>
      <input class="三列" v-model.lazy="行数据.备注" placeholder="备注">
    </div>


    <div class="图标格">
      <icon 图标名="lm-cloud-upload" @click="改(行数据);" :颜色=图标颜色 font-size='25px' />
      <icon 图标名="lm-setting" @click="编辑记录()" 颜色="#666" font-size='25px' />
      <icon 图标名="lm-delete" @click="删(行数据)" 颜色="#F56C6C" font-size='25px' />
    </div>
    <div class="图标格">
      <input v-model.lazy="行数据.订单进度" placeholder="订单进度">
      <input v-model.lazy="行数据.优惠" placeholder="优惠">
      <div>编辑数:{{ 行数据.编辑记录.length <= 1 ? '新建' : 行数据.编辑记录.length - 1 }}</div>
      </div>

    </div>
    <div v-if="编辑记录附加页">
      <div v-for="i in 行数据.编辑记录">
        <div class="编辑记录附加页 横向">
          {{ i.split('#')[0] }}
          <div> {{ JSON.parse(i.split('#')[1]).收件人 }}</div>
          <div>
            <div> {{ JSON.parse(i.split('#')[1]).旺旺名 }}</div>
            <div> {{ JSON.parse(i.split('#')[1]).镜片 }}</div>
          </div>
          <div class="光度数据 ">
            <div>右近视: {{ JSON.parse(i.split('#')[1]).右近视 }}</div>
            <div>右散光: {{ JSON.parse(i.split('#')[1]).右散光 }}</div>
            <div>右轴向: {{ JSON.parse(i.split('#')[1]).右轴向 }}</div>
            <div>右瞳距: {{ JSON.parse(i.split('#')[1]).右瞳距 }}</div>
            <div>左近视: {{ JSON.parse(i.split('#')[1]).左近视 }}</div>
            <div>左散光: {{ JSON.parse(i.split('#')[1]).左散光 }}</div>
            <div>左轴向: {{ JSON.parse(i.split('#')[1]).左轴向 }}</div>
            <div>左瞳距: {{ JSON.parse(i.split('#')[1]).左瞳距 }}</div>
          </div>
          <div> {{ JSON.parse(i.split('#')[1]).备注 }}</div>
        </div>
      </div>
    </div>
    <div v-if="购买记录附加页">
      <div v-for="i, k in 行数据.购买记录">
        <div class="购买记录附加页 横向">
          <div> {{ JSON.parse(i).订单号.slice(2, 4) + "月" + JSON.parse(i).订单号.slice(4, 6) + "日" }}</div>
          <div> 第{{ k + 1 }}次购买</div>
          <div>
            <div> {{ JSON.parse(i).旺旺名 }}</div>
            <div> {{ JSON.parse(i).镜片 }}</div>
          </div>
          <div class="光度数据 ">
            <div>右近视: {{ JSON.parse(i).右近视 }}</div>
            <div>右散光: {{ JSON.parse(i).右散光 }}</div>
            <div>右轴向: {{ JSON.parse(i).右轴向 }}</div>
            <div>右瞳距: {{ JSON.parse(i).右瞳距 }}</div>
            <div>左近视: {{ JSON.parse(i).左近视 }}</div>
            <div>左散光: {{ JSON.parse(i).左散光 }}</div>
            <div>左轴向: {{ JSON.parse(i).左轴向 }}</div>
            <div>左瞳距: {{ JSON.parse(i).左瞳距 }}</div>
          </div>

        </div>
      </div>
    </div>


    <!-- 选项 -->
    <datalist id="镜框选项">
      <option>来框加工</option>
      <option>试戴镜框</option>
      <option>直接加工</option>
    </datalist>
    <datalist id="日期">
      <option :value=库.月日>今天</option>
    </datalist>
    <datalist id="镜片名">
      <option v-for="i in 库.镜片名选项">{{ i }}</option>
    </datalist>
</template>


<style lang="scss" scoped>
.编辑记录附加页 {
  justify-content: start;
  grid-template-columns: 150px 100px 200px 1fr 300px;

  .光度数据 {
    grid-auto-flow: column;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

.购买记录附加页 {
  justify-content: start;
  grid-template-columns: 150px 100px 200px 1fr 300px;

  .光度数据 {
    grid-auto-flow: column;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

.警告色 {
  background-color: $正红
}

.行整页 {
  grid-template-columns: 300px 1fr 1fr 50px 100px;
  grid-template-rows: 1fr;
  background-color: #F0F2F5;
  border: 3px rgb(50, 216, 4);

  .标识格 {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    background-color: none;

    .订单号 {
      grid-template-rows: 1fr 1fr;
    }

    .旺旺名 {
      grid-template-columns: 1fr 50px;
      grid-template-rows: 1fr;
      grid-column: 1 / span 2;
      background-color: #b7c3d4;

      input {
        background-color: #b7c3d4;
        border: none;
      }

      div {
        background-color: #b7c3d4;
        border: none;
      }

      input:focus {
        outline: none;
        box-shadow: none;
        z-index: 99;
      }

    }

    .旺旺名:focus-within {
      box-shadow: 0px 0px 3px 1px rgb(50, 216, 4);
      z-index: 99;
    }

    .标识 {
      background-color: #b7c3d4;
    }
  }

  .镜片格 {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    background-color: #F0F2F5;

    .验光数据 {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-rows: 25px 25px;
      background-color: #F0F2F5;
    }

    .镜片 {
      background-color: #b8d4ff;
    }

    .警告色 {
      background-color: $正红
    }
  }

  .镜框格 {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;

    .镜框选项 {
      grid-template-columns: 1fr 50px;
      grid-template-rows: 1fr;
      //grid-column: 1 / span 2;
      background-color: #b7c3d4;

      input {
        background-color: #b7c3d4;
        border: none;
      }

      div {
        background-color: #b7c3d4;
        border: none;
      }

      input:focus {
        outline: none;
        box-shadow: none;
        z-index: 99;
      }
    }

    .镜框选项:focus-within {
      box-shadow: 0px 0px 3px 1px rgb(50, 216, 4);
      z-index: 99;
    }

    .镜框第一行 {
      grid-auto-flow: column;
      grid-column: 1 / span 3;
      grid-template-columns: 1fr 2fr;
      grid-template-rows: 1fr;
    }

    .试戴镜框 {
      height: 50px;
      align-content: start;
      grid-template-rows: repeat(auto-fit, minmax(20px, 1fr));
      grid-template-columns: 1fr;
    }


    .警告色 {
      background-color: $正红
    }
  }

  .图标格 {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }

}

.三列 {
  grid-auto-flow: rows;
  grid-column: 1 / span 3
}





div {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 0px solid rgb(225, 225, 225);
  border-radius: 5px;
  background-color: #F0F2F5;
}

input {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 0.5px solid rgb(225, 225, 225);
  text-align: center;
  border-radius: 5px;
  background-color: #F0F2F5;
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
</style>
