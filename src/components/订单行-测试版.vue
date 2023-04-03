<script setup lang = "ts">
import { useRouter } from 'vue-router';
import { ref, toRefs, reactive, computed, watch, onMounted } from 'vue';
import Icon from './icons/Icon.vue';
import { socket } from "../stores/socket链接";
import { pinia库, 镜片类, 订单类 } from '../stores/pinia库';
import JsBarcode from "jsbarcode";
import { values } from 'lodash';
import lmPrint from "@组件/订单行-打印附加页.vue";



let 库 = pinia库();
let { 行数据 } = defineProps(['行数据'])
//let 行数据:订单类 = 库.订单表[序号]


let 保存图标颜色 = ref("#666")
let 打印图标颜色 = ref("#666")
let 编辑记录附加页 = ref(false)
let 购买记录附加页 = ref(false)
let 打印范围附加页 = ref(false)
let 删除附加页 = ref(false)
let 镜片供应商 = ref('镜片供应商')
let 镜片备好日 = ref('镜片备好日')
let 湖北和益进价 = ref(0)
let 山东臻视进价 = ref(0)
let 上海老周进价 = ref(0)
let 湖北蔡司进价 = ref(0)
let 丹阳夏总进价 = ref(0)


let 订单号分解 = 行数据.订单号.slice(2, 4) + "月" + 行数据.订单号.slice(4, 6) + " " + 行数据.订单号.slice(6, 8) + "单"
let 发货 = () => {
  if (行数据.订单完成日 == '') {
    //镜框表的库存减1
    if (库.镜框表.find((行: any) => 行.镜框名 == 行数据.选定镜框)) {
      console.log('镜框表的库存减1');
      let 镜框 = 库.镜框表.find((行: any) => 行.镜框名 == 行数据.选定镜框)
      镜框.库存数量 = 镜框.库存数量 - 1
      镜框.库存变更记录.push({
        变更日期: new Date().toLocaleDateString(),
        变更数量: -1,
        变更后库存: 镜框.库存数量,
        变更原因: '销售' + 行数据.订单号,
      });
      socket.emit('镜框', '改', 镜框, (返回数据: any) => { console.log(返回数据) });
    }
    行数据.订单完成日 = 库.月日
  }
  else {
    行数据.订单完成日 = ''
  }
}

let 改 = async (行数据: any) => {
  if (保存图标颜色.value == "#67C23A") {
    //添加编辑记录
    let 深拷贝行数据 = JSON.parse(JSON.stringify(行数据))
    delete 深拷贝行数据.编辑记录
    await 行数据.编辑记录.push(库.月日 + 库.当前登录用户 + '修改#' + JSON.stringify(深拷贝行数据))
    库.通讯('订单', "改", 行数据);
    保存图标颜色.value = "#666"
  }
  else {
    console.log(行数据.订单号 + 行数据.旺旺名 + "没有变化")
  }
}
let 删 = (行数据: any) => {
  库.通讯('订单', "删", 行数据)
  库.订单表.splice(库.订单表.findIndex((行: any) => 行._id == 行数据._id), 1)
}





let 近视光度警告 = (值) => {
  return 值 % 25 != 0 || 值 == "" || 值 == undefined
}
let 散光光度警告 = (值) => {
  return 值 % 25 != 0 || 值 == "" || 值 == undefined
}
let 轴向光度警告 = (值) => {
  return 值 > 180 || 值 < 0 || 值 == "" || 值 == undefined
}
let 瞳距光度警告 = (值) => {

  return 值 > 60 || 值 < 20 || 值 == "" || 值 == undefined
}



watch(() => 行数据, (值) => {
  保存图标颜色.value = "#67C23A"
  console.log('侦听器工作');
  库.通讯('订单', "改", 行数据);
}, { deep: true })

watch(() => 行数据.选定镜框, (值) => {
  if (库.镜框表.find((行: any) => 行.镜框名 == 值)) {
    let 镜框 = 库.镜框表.find((行: any) => 行.镜框名 == 值)
    行数据.镜框进货价 = 镜框.进货价格
    行数据.镜框售价 = 镜框.售价
    行数据.镜框利润 = 行数据.镜框售价 - 行数据.镜框进货价
    行数据.总利润 = 行数据.镜框利润 + 行数据.镜片利润

    alert('镜框表的库存减1 从'+镜框.库存数量+'到'+(镜框.库存数量 - 1));
    镜框.库存数量 = 镜框.库存数量 - 1
    镜框.库存变更记录.push({
      变更日期: new Date().toLocaleDateString(),
      变更数量: -1,
      变更后库存: 镜框.库存数量,
      变更原因: '销售' + 行数据.订单号,
    });
    socket.emit('镜框', '改', 镜框, (返回数据: any) => { console.log(返回数据) });

  } else {
    //警告
    alert('就没这个镜框 再找找');
  }
})

//计算属性
let 订单进度 = computed(() => {

  if (行数据.订单完成日 != '') { 行数据.订单进度 = '已完成'; return '已完成' }
  else if (行数据.镜片备好日 != '' && 行数据.镜框备好日 != '') { 行数据.订单进度 = '待加工'; return '待加工' }
  else if (行数据.镜片备好日 != '' && 行数据.镜框选项 == '直接加工') { 行数据.订单进度 = '待加工'; return '待加工' }
  else if (行数据.镜片备好日 != '') { 行数据.订单进度 = '镜片已备好'; return '镜片已备好' }
  else if (行数据.镜片订货日 != '') { 行数据.订单进度 = '镜片已订货'; return '镜片已订货' }
  else if (行数据.镜片下单日 != '') { 行数据.订单进度 = '镜片已下单'; return '镜片已下单' }

  else { 行数据.订单进度 = '新建订单'; return '新建订单' }
})

let 镜片名警告 = computed(() => {
  return !库.镜片名选项.includes(行数据.镜片)
})



//作用是 通过供应商判断利润
let 订镜片判定 = () => {
  if (行数据.镜片 == '') { alert('订镜片判定') }
  console.log('右镜片供应商', 行数据);
  for (let obj of 库.镜片表) {
    if (obj.镜片名 == 行数据.镜片) {
      let 右镜片利润 = 0
      let 左镜片利润 = 0
      let 右镜片进货价 = 0
      let 左镜片进货价 = 0
      if (行数据.右镜片供应商) {
        行数据.右镜片订货日 = 库.月 + '月' + 库.日
        右镜片进货价 = obj[行数据.右镜片供应商] / 2
        右镜片利润 = obj.售价 / 2 - 右镜片进货价
      }
      if (行数据.左镜片供应商) {
        行数据.左镜片订货日 = 库.月 + '月' + 库.日
        左镜片进货价 = obj[行数据.左镜片供应商] / 2
        左镜片利润 = obj.售价 / 2 - 左镜片进货价
      }
      行数据.镜片进货价 = 右镜片进货价 + 左镜片进货价
      行数据.镜片利润 = 右镜片利润 + 左镜片利润
    }
  }
}
//作用是 添加这个顾客的镜片的售价
let 镜片判定 = () => {
  console.log('镜片判定');
  行数据.镜片下单日 = 库.月 + '月' + 库.日
  console.log(行数据.镜片下单日);
  for (let obj of 库.镜片表) {
    if (obj.镜片名 == 行数据.镜片) {
      行数据.镜片售价 = obj.售价
      行数据.镜片进货价 = 0
      行数据.镜片利润 = 0
      湖北和益进价.value = obj.湖北和益
      山东臻视进价.value = obj.山东臻视
      上海老周进价.value = obj.上海老周
      湖北蔡司进价.value = obj.湖北蔡司
      丹阳夏总进价.value = obj.丹阳夏总

    }
  }
}


let 镜片售价选项 = (镜片名: string) => {
  for (let obj of 库.镜片表) {
    if (obj.镜片名 == 镜片名) {

      return obj.售价
    }
  }
}



//作用是 查询这个顾客的购买记录并添加
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



let 优惠判定 = () => {
  for (let obj of 库.镜片表) {
    if (obj.镜片名 == 行数据.镜片) {
      行数据.镜片利润 = obj.售价 - obj[行数据.镜片供应商] - 行数据.优惠
      行数据.镜片售价 = 行数据.镜片售价 - 行数据.优惠
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
          <div :class="{ 镜框选项: true, 警告色: !行数据.镜框选项 }">
            <input :class="{ 警告色: !行数据.镜框选项 }" v-model=行数据.镜框选项 list="镜框选项" placeholder="镜框选项">
            <icon 图标名="lm-close-circle-fill" @click="行数据.镜框选项 = ''" 颜色="#999" font-size='25px' />
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

      <div class="镜片第二行">
        <div class="镜片带按钮">
          <input @change="镜片判定()" :class="{ 镜片: true, 警告色: !库.镜片名选项.includes(行数据.镜片) }" v-model.lazy="行数据.镜片"
            placeholder="镜片" list="镜片名">
          <icon :class="{ 图标: true, 警告色: 镜片名警告 }" 图标名="lm-close-circle-fill"
            @click="行数据.镜片 = '', 行数据.镜片下单日 = '', 行数据.镜片售价 = 0" 颜色="#999" font-size='26px' />
        </div>
        <div :class="{ 警告色: 行数据.镜片下单日 == '' }">{{ 行数据.镜片下单日 ? 行数据.镜片下单日 : '未订片' }}</div>
        <input @change="优惠判定()" v-model.lazy="行数据.优惠" placeholder="无优惠">
      </div>
      <div class="验光数据 ">
        <div :class="{ 光度: true, 客服光度: 库.当前登录用户类型 == '客服' }">
          <input :class="{ 警告色: 近视光度警告(行数据.右近视) }" v-model.lazy="行数据.右近视" placeholder="右近视">
          <input :class="{ 警告色: 散光光度警告(行数据.右散光) }" v-model.lazy="行数据.右散光" placeholder="右散光">
          <input :class="{ 警告色: 轴向光度警告(行数据.右轴向) }" v-model.lazy="行数据.右轴向" placeholder="右轴向">
          <input :class="{ 警告色: 瞳距光度警告(行数据.右瞳距) }" v-model.lazy="行数据.右瞳距" placeholder="右瞳距">
          <div :class="{ 警告色: 行数据.右镜片订货日 == '' }">{{ 行数据.右镜片订货日 ? 行数据.右镜片订货日 + '订' : '未订货' }}</div>
          <div :class="{ 警告色: 行数据.右镜片备好日 == '' }">{{ 行数据.右镜片备好日 ? 行数据.右镜片备好日 + '备好' : '未备好' }}</div>

          <div v-if="库.当前登录用户类型 == '助理'" class="镜片带按钮">
            <input :class="{ 警告色: !行数据.右镜片供应商, 镜片: true, }" v-model.lazy="行数据.右镜片供应商" @change="订镜片判定()" placeholder='右订片'
              list="镜片供应商">
            <icon :class="{ 警告色: !行数据.右镜片供应商, 图标: true, }" 图标名="lm-close-circle-fill"
              @click="行数据.右镜片供应商 = '', 行数据.右镜片订货日 = '', 行数据.右镜片备好日 = '', 订镜片判定()" 颜色="#999" font-size='25px' />
          </div>
        </div>
        <div :class="{ 光度: true, 客服光度: 库.当前登录用户类型 == '客服' }">
          <input :class="{ 警告色: 近视光度警告(行数据.左近视) }" v-model.lazy="行数据.左近视" placeholder="左近视">
          <input :class="{ 警告色: 散光光度警告(行数据.左散光) }" v-model.lazy="行数据.左散光" placeholder="左散光">
          <input :class="{ 警告色: 轴向光度警告(行数据.左轴向) }" v-model.lazy="行数据.左轴向" placeholder="左轴向">
          <input :class="{ 警告色: 瞳距光度警告(行数据.左瞳距) }" v-model.lazy="行数据.左瞳距" placeholder="左瞳距">
          <div :class="{ 警告色: 行数据.左镜片订货日 == '' }">{{ 行数据.左镜片订货日 ? 行数据.左镜片订货日 + '订' : '未订货' }}</div>
          <div :class="{ 警告色: 行数据.左镜片备好日 == '' }">{{ 行数据.左镜片备好日 ? 行数据.左镜片备好日 + '备好' : '未备好' }}</div>

          <div v-if="库.当前登录用户类型 == '助理'" class="镜片带按钮">
            <input :class="{ 警告色: !行数据.左镜片供应商, 镜片: true, }" v-model.lazy="行数据.左镜片供应商" @change="订镜片判定()" placeholder='左订片'
              list="镜片供应商">
            <icon :class="{ 警告色: !行数据.左镜片供应商, 图标: true, }" 图标名="lm-close-circle-fill"
              @click="行数据.左镜片供应商 = '', 行数据.左镜片订货日 = '', 行数据.左镜片备好日 = '', 订镜片判定()" 颜色="#999" font-size='25px' />
          </div>
        </div>
      </div>
    </div>

    <div v-if="行数据.镜框选项 == null || 行数据.镜框选项 == ''" class="镜框格"> 未选择 镜框选项 </div>
    <div v-if="行数据.镜框选项 == '试戴镜框'" class="试戴镜框格">
      <div class="镜框第一行">
        <input v-model.lazy="行数据.镜框下单日" :class="{ 警告色: 行数据.镜框下单日 == '' }" placeholder="镜框下单日" list="日期">
        <input v-model.lazy="行数据.镜框发货日" :class="{ 警告色: 行数据.镜框发货日 == '' }" placeholder="镜框发货日" list="日期">
        <input v-model.lazy="行数据.镜框备好日" :class="{ 警告色: 行数据.镜框备好日 == '' }" placeholder="镜框收到日" list="日期">
      </div>



      <div class="镜框第三行 ">
        <input v-model.lazy="行数据.选定镜框" class="" placeholder="选定镜框" list="镜框名">
        <input v-for="i in [0, 1]" v-model.lazy="行数据.试戴镜框[i]" class="" :placeholder="'试戴' + (i + 1)">
      </div>
      <div class="镜框第三行 ">
        <input v-for="i in [2, 3, 4]" v-model.lazy="行数据.试戴镜框[i]" class="" :placeholder="'试戴' + (i + 1)">
      </div>


      <input v-model.lazy="行数据.备注" placeholder="备注">

    </div>

    <div v-if="行数据.镜框选项 == '直接加工'" class="直接加工镜框格">
      <div class="直接加工">直接加工</div>
      <input v-model.lazy="行数据.选定镜框" placeholder="选定镜框" list="镜框名">
      <input v-model.lazy="行数据.备注" placeholder="备注">
    </div>

    <div v-if="行数据.镜框选项 == '来框加工'" class="来框镜框格">
      <input v-model.lazy="行数据.镜框备好日" :class="{ 警告色: 行数据.镜框备好日 == '' }" placeholder="镜框收到日" list="日期">
      <input v-model.lazy="行数据.镜框运单号" :class="{ 警告色: 行数据.镜框运单号 == '' }" placeholder="请输入返回运单号">
      <input v-model.lazy="行数据.备注" placeholder="备注">
    </div>


    <div class="图标格">
      <div :class="{ 纯白: true }">
        <icon 图标名="lm-save" @click="改(行数据);" :颜色=保存图标颜色 font-size='25px' />
      </div>
      <div :class="{ 纯白: !编辑记录附加页, 绿色: 编辑记录附加页 }">
        <icon 图标名="lm-reloadtime" @click="编辑记录附加页 = !编辑记录附加页" 颜色="#666" font-size='25px' />
      </div>
      <div :class="{ 纯白: true }">
        <icon 图标名="lm-delete" @click="删除附加页 = !删除附加页" 颜色="#F56C6C" font-size='25px' />
      </div>
      <div :class="{ 纯白: !打印范围附加页, 绿色: 打印范围附加页 }">
        <icon 图标名="lm-printer" @click="打印范围附加页 = !打印范围附加页" :颜色=打印图标颜色 font-size='25px' />
      </div>

    </div>

    <div class="进度格">
      <div :class="{ 白色: true }">{{ 订单进度 }}</div>
      <div :class="{ 白色: true }"> {{ 行数据.编辑记录.length <= 1 ? '修改记录' : '修改记录' + (行数据.编辑记录.length - 1) }} </div>


          <div v-if="库.当前登录用户类型 == '助理'" :class="{ 绿色: 行数据.订单完成日 == '' }" @click="发货()">
            {{ 行数据.订单完成日 ? 行数据.订单完成日 : '发货' }}
          </div>
      </div>

    </div>

    <div v-if="库.当前登录用户类型 == '助理'"> 镜片利润{{ 行数据.镜片利润 }} 镜片进货价{{ 行数据.镜片进货价 }} 镜片售价{{ 行数据.镜片售价 }}</div>
    <div v-if="库.当前登录用户类型 == '助理'"> 镜框利润{{ 行数据.镜框利润 }} 镜框进货价{{ 行数据.镜框进货价 }} 镜框售价{{ 行数据.镜框售价 }} 总利润{{ 行数据.总利润 }}</div>


    <Transition>
      <lmPrint v-if="打印范围附加页" :行数据="行数据"></lmPrint>
    </Transition>
    <Transition>
      <div class="购买记录附加页" v-if="购买记录附加页">
        <div v-for="i, k in 行数据.购买记录" class="购买记录">
          <div :class="{ 第1块: true, 未完成: JSON.parse(i).订单进度 != '已完成' }">
            <div>{{ JSON.parse(i).订单进度 != '已完成' ? '未完成' : '已完成' }}</div>
            {{ JSON.parse(i).订单号.slice(2, 4) + "月" + JSON.parse(i).订单号.slice(4, 6) + "日" }}
          </div>
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
    <div class="删除附加页" v-if="删除附加页">
      <div class="第一行">
        <div></div>
        <icon 图标名="lm-close-circle-fill" @click="删除附加页 = !删除附加页" 颜色="#666" font-size='25px' />
      </div>
      <div>
        <div> 是否删除{{ 行数据.订单号 }}订单?</div>
        <div> {{ 行数据.旺旺名 }}</div>
        <div> {{ 行数据.收件人 }}</div>
      </div>
      <div class="第三行">

        <icon 图标名="lm-delete" @click="删(行数据)" 颜色="#F56C6C" font-size='65px' />

      </div>
    </div>
    <!-- 选项 -->
    <datalist id="镜框选项">
      <option>试戴镜框</option>
      <option>来框加工</option>
      <option>直接加工</option>
    </datalist>
    <datalist id="镜片供应商">
      <option value="湖北和益"> 湖北和益</option>
      <option value="山东臻视"> 山东臻视</option>
      <option value="上海老周"> 上海老周</option>
      <option value="湖北蔡司"> 湖北蔡司</option>
      <option value="丹阳夏总"> 丹阳夏总</option>
      <option value="库存">库存</option>
    </datalist>
    <datalist id="日期">
      <option :value=库.月日>今天</option>
    </datalist>
    <datalist id="镜片名">
      <option v-for="i in 库.镜片名选项" :value=i>售价 {{ 镜片售价选项(i) }}</option>
    </datalist>
    <datalist id="镜框名">
      <option v-for="i,k in 库.镜框表" :value=库.镜框表[k].镜框名 >{{ 库.镜框表[k].镜框名 }}当前库存{{ 库.镜框表[k].库存数量 }}</option>
    </datalist>
</template>


<style lang = "scss" scoped>
.删除附加页 {
  position: absolute;
  height: 180px;
  width: 300px;
  background: $背景;
  border: 5px solid $深灰;
  z-index: 999;
  grid-template-rows: 0.3fr 1fr 1fr;
  grid-template-columns: 1fr;

  .第一行 {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 30px;
  }

  .第三行 {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;


  }

}

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

    .未完成 {
      border-radius: 20px 0px 0px 20px;

      background: $正红;
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
  //  position: absolute ;
  z-index: 9;
  box-sizing: border-box;
  // top: 50px;
  width: 400px;
  height: 299px;
  background-color: $背景;
  border: 1px solid $深灰;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr;

  div {
    font-size: 20px;
    border-radius: 0px;
    border: 1px solid $深灰;
  }

  .第一行 {
    grid-template-rows: 1fr;
    grid-template-columns: 120px 1fr;
  }

  .第二行 {
    grid-template-rows: 1fr;
    grid-template-columns: 120px 1fr;
  }

  .第三行 {
    grid-template-rows: 1fr;
    grid-template-columns: 120px 1fr;

    .条形码 {
      //  position: relative ;

      grid-template-rows: 1fr;
      grid-template-columns: 1fr;
    }
  }

  .最后行 {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 30px;

  }

  .光度行 {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr
  }
}



.行整页 {
  grid-template-columns: 210px 1.5fr 1fr 50px 100px;
  grid-template-rows: 1fr;
  background-color: $背景;
  border: 2px solid $浅灰;
  gap: 5px;

  .标识格 {
    grid-template-columns: 1fr;
    grid-template-rows: 2fr 1fr;
    background-color: none;
    gap: 2px;


    .第一行 {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;

      .第一行1 {
        grid-template-rows: 1fr 1fr;
        font-size: 14px;

        .订单号 {
          font-size: 18px;
          color: $深灰;
        }
      }

      .第一行2 {
        grid-template-rows: 1fr 1fr;

        .镜框选项 {
          grid-template-columns: 1fr 25px;
          grid-template-rows: 1fr;
          background: $纯白;



          input {
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
      gap: 3px;

      input {
        border: none;
      }

      div {
        background-color: $纯白;
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
    grid-template-rows: 1fr 2fr;
    background-color: #F0F2F5;
    gap: 2px;

    .镜片第一行 {
      grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
      grid-template-rows: 1fr;
      font-size: 10px;
      gap: 2px;
    }

    .镜片第二行 {
      grid-template-columns: 1fr 100px 100px;
      grid-template-rows: 1fr;
      gap: 2px;

      div {
        background: $纯白;
        font-size: 8px;
        height: 1fr;
      }

      .警告色 {
        background-color: $正红;
      }


      .镜片带按钮 {
        grid-template-columns: 1fr auto;
        grid-template-rows: 1fr;


        .图标 {
          background: $纯白;

        }

        .镜片 {
          border: none;
        }

      }

    }

    .验光数据 {
      gap: 1px;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;



      .光度 {
        gap: 1px;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1.5fr;

        div {
          background: $纯白;
          font-size: 10px;
        }

        .警告色 {
          background-color: $正红;
        }

        input {
          border: none;
        }

        .镜片带按钮 {
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;

          .图标 {
            background: $纯白;

          }

          .镜片 {
            border: none;
          }
        }

      }

      .客服光度 {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
      }





    }




  }

  .镜框格 {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    font-size: 32px;
    color: $浅灰;
    background: $纯白;
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
      grid-template-columns: repeat(3, minmax(20px, 1fr));
    }


  }

  .直接加工镜框格 {
    grid-template-columns: 1fr;
    grid-template-rows: 2fr 1fr 1fr;
    font-size: 32px;
    color: $浅灰;
  }

  .来框镜框格 {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 2fr;


  }

  .图标格 {
    background: $背景;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 1px;

  }

  .进度格 {
    background: $背景;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 2px;

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
  font-weight: bolder;

}

input {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 0.5px solid rgb(225, 225, 225);
  text-align: center;
  border-radius: 5px;

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

.纯白 {
  background: $纯白;
}

.白色 {
  background: $纯白;
}

.纯白:hover {
  background: $浅灰;
}

.警告色 {
  background: $正红;
}

.绿色 {
  background: $正绿;
}

.绿色:hover {
  background: $暗绿;
}
</style>
