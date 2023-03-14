<script setup lang = "ts">
import { useRouter } from 'vue-router';
import { ref, toRefs, reactive, computed, watch } from 'vue';
import Icon from './icons/Icon.vue';
import { socket } from "../stores/socket链接";
import { pinia库, 镜片类 } from '../stores/pinia库';

let 库 = pinia库();
let { 序号 } = defineProps(['序号'])
let 行数据 = 库.筛选过的订单[序号]


let 图标颜色 = ref("#666")
let 编辑记录附加页 = ref(false)
let 购买记录附加页 = ref(false)
let 打印范围附加页 = ref(false)
let 镜片供应商 = ref('镜片供应商')
let 镜片备好日 = ref('镜片备好日')
let 订单号分解 = 行数据.订单号.slice(2, 4) + "月" + 行数据.订单号.slice(4, 6) + " " + 行数据.订单号.slice(6, 8) + "单"


let 改 = async (行数据: any) => {
  if (图标颜色.value == "#67C23A") {
    //添加编辑记录
    let 深拷贝行数据 = JSON.parse(JSON.stringify(行数据))
    delete 深拷贝行数据.编辑记录
    await 行数据.编辑记录.push(库.月日 + 库.当前登录用户 + '修改#' + JSON.stringify(深拷贝行数据))
    库.通讯('订单', "改", 行数据);
    //库.订单表.splice(库.订单表.findIndex((行: any) => 行.订单号 == 行数据.订单号), 1)
    图标颜色.value = "#666"
  }
  else {
    console.log(行数据.订单号 + 行数据.旺旺名 + "没有变化")
  }
}
let 删 = (行数据: any) => {
  库.通讯('订单', "删", 行数据)
  //删除本地
  
}
let 编辑记录 = () => { 编辑记录附加页.value = !编辑记录附加页.value }


let 镜片备好日样式 = reactive({ 镜片: true, 警告色: false, 占位: '哈哈' })
let 运单号样式 = reactive({ 镜片: true, 警告色: false, 占位: '请输入退货返回运单号' })
let 右近视样式 = reactive({ 镜片: true, 警告色: false })
let 右散光样式 = reactive({ 镜片: true, 警告色: false })
let 右轴向样式 = reactive({ 镜片: true, 警告色: false })
let 右瞳距样式 = reactive({ 镜片: true, 警告色: false })
let 左近视样式 = reactive({ 镜片: true, 警告色: false })
let 左散光样式 = reactive({ 镜片: true, 警告色: false })
let 左轴向样式 = reactive({ 镜片: true, 警告色: false })
let 左瞳距样式 = reactive({ 镜片: true, 警告色: false })

watch(() => 行数据, (值) => {
  图标颜色.value = "#67C23A"
  if (!值.镜片备好日&&值.镜片订货日) 镜片备好日样式.警告色 = true
  else 镜片备好日样式.警告色 = false

  if (值.镜框发货日) 运单号样式.警告色 = true
  else 运单号样式.警告色 = false

  if (parseInt(值.右近视) % 25) 右近视样式.警告色 = true
  else 右近视样式.警告色 = false

  if (parseInt(值.右散光) % 25) 右散光样式.警告色 = true
  else 右散光样式.警告色 = false

  if (parseInt(值.右轴向) > 180 || parseInt(值.右轴向) < 0) 右轴向样式.警告色 = true
  else 右轴向样式.警告色 = false

  if (parseInt(值.右瞳距) > 60 || parseInt(值.右瞳距) < 20) 右瞳距样式.警告色 = true
  else 右瞳距样式.警告色 = false

  if (parseInt(值.左近视) % 25) 左近视样式.警告色 = true
  else 左近视样式.警告色 = false

  if (parseInt(值.左散光) % 25) 左散光样式.警告色 = true
  else 左散光样式.警告色 = false

  if (parseInt(值.左轴向) > 180 || parseInt(值.左轴向) < 0) 左轴向样式.警告色 = true
  else 左轴向样式.警告色 = false

  if (parseInt(值.左瞳距) > 60 || parseInt(值.左瞳距) < 20) 左瞳距样式.警告色 = true
  else 左瞳距样式.警告色 = false

  库.通讯('订单', "改", 行数据);
}, { deep: true })

//计算属性
let 订单进度 = computed(() => {
  if (行数据.订单进度)
    return 行数据.订单进度
  else if (行数据.镜片备好日)
    return '镜片已备好'
  else if (行数据.镜片订货日)
    return '镜片已订货'
  else if (行数据.镜片下单日)
    return '镜片已下单'

})


let 镜片名判定 = () => {
  //console.log(""+库.镜片名选项.includes(行数据.镜片));
  return !库.镜片名选项.includes(行数据.镜片)
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


let 镜片判定 = () => {
  行数据.镜片下单日 = 库.月日
  镜片供应商.value = '未订片'
  for (let obj of 库.镜片表) {
    if (obj.镜片名 == 行数据.镜片) {
      行数据.镜片进货价 = obj[行数据.镜片供应商]
      行数据.镜片售价 = obj.售价
      if (行数据.镜片供应商) {
        镜片供应商.value = '镜片供应商'
        镜片备好日.value = '未到'
        行数据.镜片订货日 = 库.月日
        行数据.镜片利润 = obj.售价 - obj[行数据.镜片供应商]
      }
    }
  }
}
let 优惠判定 = () => {
  for (let obj of 库.镜片表) {
    if (obj.镜片名 == 行数据.镜片) {
      行数据.镜片利润 = obj.售价 - obj[行数据.镜片供应商] - 行数据.优惠
    }
  }
}

</script>

<template>
  <div class="行整页">
    <div class="标识格">
      <div class="第一行">
        <div class="第一行1">
          <div class="订单号">{{ 行数据.订单号 }} </div>
          <div>{{ 订单号分解 }} </div>
        </div>
        <div class="第一行2">
          <input class="标识" v-model.lazy="行数据.收件人" placeholder="收件人">
          <div class="镜框选项">
            <input v-model=行数据.镜框选项 list="镜框选项" placeholder="镜框选项">
            <icon 图标名="lm-close-circle-fill" @click="行数据.镜框选项 = ''" 颜色="#666" font-size='20px' />
          </div>
        </div>
      </div>
      <div class="第二行">
        <input @change="旺旺号判定()" v-model.lazy="行数据.旺旺名" placeholder="旺旺名">
        <div @click="购买记录附加页 = !购买记录附加页">
          {{ 行数据.购买记录.length + 1 == 1 ? '新' : 行数据.购买记录.length + 1 }}
        </div>
      </div>
    </div>

    <div class="镜片格">
      <div v-if="库.当前登录用户类型 == '助理'" class="镜片第一行">
        <input :class="{ 警告色: 行数据.镜片下单日 == undefined }" class="镜片" v-model.lazy="行数据.镜片下单日" placeholder="镜片下单日" list="日期">
        <input :class="{ 警告色: 镜片供应商 == '未订片' }" class="镜片" @change="镜片判定()" v-model.lazy="行数据.镜片供应商" :placeholder=镜片供应商
          list="镜片供应商">
        <input class="镜片" v-model.lazy="行数据.镜片订货日" placeholder="镜片订货日" list="日期">
        <input :class=镜片备好日样式 v-model.lazy="行数据.镜片备好日" :placeholder=镜片备好日样式.占位 list="日期">
      </div>

      <input @change="镜片判定()" :class="{ 绿色: 行数据.镜片备好日, 镜片: true, 警告色: 镜片名判定() }" v-model.lazy="行数据.镜片" placeholder="镜片"
        list="镜片名">

      <div class="验光数据 ">
        <input :class=右近视样式 v-model.lazy="行数据.右近视" placeholder="右近视">
        <input :class=右散光样式 v-model.lazy="行数据.右散光" placeholder="右散光">
        <input :class=右轴向样式 v-model.lazy="行数据.右轴向" placeholder="右轴向">
        <input :class=右瞳距样式 v-model.lazy="行数据.右瞳距" placeholder="右瞳距">
        <input :class=左近视样式 v-model.lazy="行数据.左近视" placeholder="左近视">
        <input :class=左散光样式 v-model.lazy="行数据.左散光" placeholder="左散光">
        <input :class=左轴向样式 v-model.lazy="行数据.左轴向" placeholder="左轴向">
        <input :class=左瞳距样式 v-model.lazy="行数据.左瞳距" placeholder="左瞳距">
      </div>
    </div>

    <div v-if="行数据.镜框选项 == null || 行数据.镜框选项 == ''" class="镜框格"></div>
    <div v-if="行数据.镜框选项 == '试戴镜框'" class="试戴镜框格">
      <div class="镜框第一行">
        <input v-model.lazy="行数据.镜框下单日" placeholder="镜框下单日" list="日期">
        <input v-model.lazy="行数据.镜框发货日" placeholder="镜框发货日" list="日期">
        <input v-model.lazy="行数据.镜框备好日" placeholder="镜框备好日" list="日期">
      </div>

      <input v-model.lazy="行数据.镜框运单号" :class=运单号样式 :placeholder=运单号样式.占位>

      <div class="镜框第三行 ">
        <input v-for="i in [1, 2, 3]" v-model.lazy="行数据.试戴镜框[i - 1]" class="" :placeholder="'试戴' + i">
      </div>


      <input v-model.lazy="行数据.备注" placeholder="备注">

    </div>

    <div v-if="行数据.镜框选项 == '直接加工'" class="直接加工镜框格">
      <div class="直接加工">直接加工</div>
      <input v-model.lazy="行数据.备注" placeholder="备注">
    </div>

    <div v-if="行数据.镜框选项 == '来框加工'" class="来框镜框格">
      <input v-model.lazy="行数据.镜框备好日" placeholder="镜框收到日" list="日期">
      <input v-model.lazy="行数据.镜框运单号" :class=运单号样式 :placeholder=运单号样式.占位>
      <input v-model.lazy="行数据.备注" placeholder="备注">
    </div>


    <div class="图标格">
      <icon 图标名="lm-cloud-upload" @click="改(行数据);" :颜色=图标颜色 font-size='25px' />
      <icon 图标名="lm-setting" @click="编辑记录()" 颜色="#666" font-size='25px' />
      <icon 图标名="lm-delete" @click="删(行数据)" 颜色="#F56C6C" font-size='25px' />
      <icon 图标名="lm-printer" @click="打印范围附加页 = true" 颜色="#F56C6C" font-size='25px' />
    </div>

    <div class="图标格">
      <input v-model.lazy="行数据.订单进度" placeholder="订单进度">
      <input v-model.lazy="行数据.订单完成日" placeholder="完成日期" list="日期">
      <input @change="优惠判定()" v-model.lazy="行数据.优惠" placeholder="优惠">
      <button>{{ 行数据.编辑记录.length <= 1 ? '新建' : 行数据.编辑记录.length - 1 }} </button>
    </div>



    <!-- 选项 -->
    <datalist id="镜框选项">
      <option>试戴镜框</option>
      <option>来框加工</option>
      <option>直接加工</option>
    </datalist>
    <datalist id="镜片供应商">
      <option>湖北和益</option>
      <option>山东臻视</option>
      <option>上海老周</option>
      <option>湖北蔡司</option>
      <option>丹阳夏总</option>
    </datalist>
    <datalist id="日期">
      <option :value=库.月日>今天</option>
    </datalist>
    <datalist id="镜片名">
      <option v-for="i in 库.镜片名选项">{{ i }}</option>
    </datalist>




  </div>
  <div> 利润{{ 行数据.镜片利润 }} 进货价{{ 行数据.镜片进货价 }} 售价{{ 行数据.镜片售价 }}</div>

  <div v-if="打印范围附加页" id="打印范围">

    <icon 图标名="lm-printer" v-print="'#打印范围'" 颜色="#F56C6C" font-size='25px' />
    <icon 图标名="lm-delete" @click="打印范围附加页 = false" 颜色="#F56C6C" font-size='25px' />
  </div>
  <Transition>
    <div class="购买记录附加页" v-if="购买记录附加页">
      <div v-for="i, k in 行数据.购买记录" class="购买记录">
        <div class="第1块"> {{ JSON.parse(i).订单号.slice(2, 4) + "月" + JSON.parse(i).订单号.slice(4, 6) + "日" }}</div>
        <div class="第2块"> 第{{ k + 1 }}次购买</div>
        <div class="第3块">
          <div> {{ JSON.parse(i).旺旺名 }}</div>
          <div> {{ JSON.parse(i).镜片 }}</div>
        </div>
        <div class="第4块">
          <div>右近视: {{ JSON.parse(i).右近视 }}</div>
          <div>右散光: {{ JSON.parse(i).右散光 }}</div>
          <div>右轴向: {{ JSON.parse(i).右轴向 }}</div>
          <div>右瞳距: {{ JSON.parse(i).右瞳距 }}</div>
          <div>左近视: {{ JSON.parse(i).左近视 }}</div>
          <div>左散光: {{ JSON.parse(i).左散光 }}</div>
          <div>左轴向: {{ JSON.parse(i).左轴向 }}</div>
          <div>左瞳距: {{ JSON.parse(i).左瞳距 }}</div>
        </div>
        <div class="第5块">
          优惠: {{ JSON.parse(i).优惠 }}

        </div>

      </div>
    </div>
  </Transition>
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
</template>


<style lang = "scss" scoped>
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
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  background: $浅黄;
  border-radius: 20px;
  gap: 5px;

  .购买记录 {
    //justify-content: start;
    grid-template-columns: 150px 25px 200px 1fr 300px;
    gap: 2px;
    background: $纯白;
    box-sizing: border-box;
    //border: 1px  solid $浅灰;
    border-radius: 20px;

    .第1块 {
      border-radius: 20px 0px 0px 20px;

      background: $浅灰;
    }

    .第3块 {
      gap: 2px;
      grid-template-rows: 1fr 1fr;
      grid-template-columns: 1fr;
      background: $纯白;
    }

    .第4块 {

      gap: 2px;
      grid-auto-flow: row;
      grid-template-rows: 1fr 1fr;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      background: $纯白;
    }

    .第5块 {

      border-radius: 0px 20px 20px 0px;
      grid-auto-flow: row;
      grid-template-rows: 1fr 1fr;
      grid-template-columns: 1fr 1fr 1fr 1fr;

    }
  }
}

#打印范围 {
  position: fixed;
  z-index: 9;
  top: 50px;
  width: 800px;
  height: 900px;
  background-color: $背景;
  border: 3px solid $深灰;
}



.行整页 {
  grid-template-columns: 280px 1fr 1fr 50px 100px;
  grid-template-rows: 1fr;
  background-color: $浅灰;
  border: 2px solid $浅灰;

  .标识格 {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    background-color: none;


    .第一行 {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;

      .第一行1 {
        grid-template-rows: 1fr 1fr;

        .订单号 {
          font-size: large;
          color: $深灰;
        }
      }

      .第一行2 {
        grid-template-rows: 1fr 1fr;

        .镜框选项 {
          grid-template-columns: 1fr 50px;
          grid-template-rows: 1fr;
          background-color: $浅黄;

          input {
            background-color: $浅黄;
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
      }
    }

    .第二行 {
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


  }

  .镜片格 {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 2fr;
    background-color: #F0F2F5;

    .镜片第一行 {
      grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
      grid-template-rows: 1fr;
    }

    .验光数据 {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    }

    .镜片 {
      background-color: #b8d4ff;
    }

    .绿色 {
      background-color: $正绿
    }

    .警告色 {
      background-color: $正红
    }
  }

  .试戴镜框格 {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;

    .镜框第一行 {
      grid-template-rows: 1fr;
      grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
    }



    .镜框第三行 {
      align-content: start;
      grid-template-rows: 1fr;
      grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
    }


    .警告色 {
      background-color: $正红
    }
  }

  .直接加工镜框格 {
    grid-template-columns: 1fr;
    grid-template-rows: 3fr 1fr;
    font-size: 40px;
    color: $浅灰;
  }

  .来框镜框格 {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 2fr;

    .警告色 {
      background-color: $正红
    }
  }

  .图标格 {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
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
  font-weight: bolder;
}

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

input:hover {
  box-sizing: border-box;
  border: 0.5px solid $深灰;
}

input:focus {
  outline: none;
  box-shadow: 0px 0px 3px 1px $深灰;
  z-index: 99;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
