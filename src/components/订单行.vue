<script setup lang="ts">
import {reactive, computed, watch} from 'vue';
import Icon from './icons/Icon.vue';
import {socket} from "@仓库/socket链接";
import {pinia库, 订单类, 镜片订单类} from '@仓库/pinia库';
import lmPrint from "@组件/订单行-打印附加页.vue";


let 库 = pinia库();
//let { 行数据 } = defineProps(['行数据'])
let props1 = defineProps(['行数据'])

let 行数据: 订单类 = props1.行数据


let 状态 = reactive({
  保存图标颜色: "#666",
  打印图标颜色: "#666",
  编辑记录附加页: false,
  购买记录附加页: false,
  打印范围附加页: false,
  删除附加页: false,
})


//let 订单号分解 = 行数据.订单号.slice(2, 4) + "月" + 行数据.订单号.slice(4, 6) + " " + 行数据.订单号.slice(6, 8) + "单"
let 订单号分解 = 行数据.订单号 ? 行数据.订单号.slice(2, 4) + "月" + 行数据.订单号.slice(4, 6) + " " + 行数据.订单号.slice(6, 8) + "单" : '无订单号';

let 镜片收货 = (镜片订单) => {
  if (行数据[`${镜片订单.slice(8, 9)}镜片订货日`]!='') {

    行数据[`${镜片订单.slice(8, 9)}镜片备好日`] = `${库.月}月${库.日}`
    let 镜片订单数据 = 库.镜片订单表.find(订单 => 订单.订单号 === 镜片订单)
    镜片订单数据.镜片收到日 = new Date().toLocaleString('zh-CN')

    socket.emit('镜片订单', "改", 镜片订单数据);
    alert(`${镜片订单}的 ${行数据.镜片}  收货成功`)
  }
  else 
    alert('请先订货')
}

let 改 = async (行数据: any) => {
  if (状态.保存图标颜色 == "#67C23A") {
    //添加编辑记录
    let 深拷贝行数据 = JSON.parse(JSON.stringify(行数据))
    delete 深拷贝行数据.编辑记录
    await 行数据.编辑记录.push(库.月日 + 库.当前登录用户 + '修改#' + JSON.stringify(深拷贝行数据))
    await 库.通讯('订单', "改", 行数据);
    状态.保存图标颜色 = "#666"
  } else {
    console.log(行数据.订单号 + 行数据.旺旺名 + "没有变化")
  }
}
let 删 = (行数据: any) => {
  库.通讯('订单', "删", 行数据)
  库.订单表.splice(库.订单表.findIndex((行: any) => 行._id == 行数据._id), 1)
}
//给选项添加说明
let 镜片售价选项 = (镜片名: string) => {
  for (let obj of 库.镜片表) {
    if (obj.镜片名 == 镜片名) {

      return obj.售价
    }
  }
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


watch(() => 行数据, () => {
  状态.保存图标颜色 = "#67C23A"
  console.log('侦听器工作');
  库.通讯('订单', "改", 行数据);
}, {deep: true})


let 镜片名警告 = computed(() => {
  return !库.镜片名选项.includes(行数据.镜片)
})


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

let 总利润计算 = () => {
  console.log('总利润计算');
  if (行数据.镜片) {
    const 找到的镜片 = 库.镜片表.find(item => item.镜片名 === 行数据.镜片);
    if (找到的镜片) {
      //右镜片
      let 右镜片售价 = 行数据.右镜片供应商 ? 找到的镜片.售价 / 2 : 0
      let 右镜片进货价 = 行数据.右镜片供应商 ? 找到的镜片[行数据.右镜片供应商] / 2 : 0
      let 右镜片利润 = 右镜片售价 - 右镜片进货价
      //左镜片
      let 左镜片售价 = 行数据.左镜片供应商 ? 找到的镜片.售价 / 2 : 0
      let 左镜片进货价 = 行数据.左镜片供应商 ? 找到的镜片[行数据.左镜片供应商] / 2 : 0
      let 左镜片利润 = 左镜片售价 - 左镜片进货价
      //赋值
      行数据.镜片售价 = 右镜片售价 + 左镜片售价
      行数据.镜片进货价 = 右镜片进货价 + 左镜片进货价
      行数据.镜片利润 = 右镜片利润 + 左镜片利润
    } else {
      行数据.镜片售价 = 0
      行数据.镜片进货价 = 0
      行数据.镜片利润 = 0
      alert('镜片表里没这个镜片')
    }

  } else {
    行数据.镜片售价 = 0
    行数据.镜片进货价 = 0
    行数据.镜片利润 = 0
  }
  //镜框赋值
  if (行数据.选定镜框) {
    const 找到的镜框 = 库.镜框表.find(item => item.镜框名 === 行数据.选定镜框);
    if (找到的镜框) {
      行数据.镜框售价 = 找到的镜框.售价
      行数据.镜框进货价 = 找到的镜框.进货价格
      行数据.镜框利润 = 行数据.镜框售价 - 行数据.镜框进货价
    } else {
      行数据.镜框售价 = 0
      行数据.镜框进货价 = 0
      行数据.镜框利润 = 0
      alert('镜框表里没这个镜框')
    }
  } else {
    行数据.镜框售价 = 0
    行数据.镜框进货价 = 0
    行数据.镜框利润 = 0
  }
  if (行数据.总利润 === null) {
    行数据.总利润 = 0
  }
  行数据.总利润 = 行数据.镜框利润 + 行数据.镜片利润 - 行数据.优惠
}

let 镜框减库存并计算总利润 = () => {
  总利润计算()
  const 找到的镜框 = 库.镜框表.find(item => item.镜框名 === 行数据.选定镜框);
  if (找到的镜框) {
    alert('镜框表的库存减1 从' + 找到的镜框.库存数量 + '到' + (找到的镜框.库存数量 - 1));
    找到的镜框.库存数量 = 找到的镜框.库存数量 - 1
    找到的镜框.库存变更记录.push({
      变更日期: new Date().toLocaleDateString(),
      变更数量: -1,
      变更后库存: 找到的镜框.库存数量,
      变更原因: '销售' + 行数据.订单号,
    });
    socket.emit('镜框', '改', 找到的镜框, (返回数据: any) => {
      console.log(返回数据)
    });
  }
}

let 右镜片订货日并计算总利润 = () => {
  总利润计算()

  if (行数据.右镜片供应商) {
    //创建镜片订单 
    let 找到的镜片 = 库.镜片表.find(item => item.镜片名 === 行数据.镜片);
    let 新镜片订单 = new 镜片订单类()
    新镜片订单.订单日期 = new Date().toLocaleString('zh-CN')
    新镜片订单.镜片名 = 行数据.镜片;
    新镜片订单.近视 = 行数据.右近视
    新镜片订单.散光 = 行数据.右散光
    新镜片订单.进货价格 = 找到的镜片[行数据.右镜片供应商] / 2;
    新镜片订单.供货商 = 行数据.右镜片供应商;
    新镜片订单.订单类型 = '销售';
    新镜片订单.订单号 = 行数据.订单号 + '右';
    新镜片订单.镜片收到日 = '未收到';
    //添加到 镜片订单表 如果已经存在就修改
    if (库.镜片订单表.find(item => item.订单号 === 行数据.订单号 + '右')) {
      alert('右镜片订单已存在 将修改')
      新镜片订单._id = 库.镜片订单表.find(item => item.订单号 === 行数据.订单号 + '右')._id
      socket.emit('镜片订单', '改', 新镜片订单, (返回数据: any) => {
        库.镜片订单表.push(返回数据);
        console.log(返回数据)
        行数据.右镜片订货日 = 库.月 + '月' + 库.日
        socket.emit('订单', '改', 行数据, (返回数据: any) => {
          console.log(返回数据)
        });
      });
    } else {
      alert('右镜片添加到镜片订单表')
      socket.emit('镜片订单', '增', 新镜片订单, (返回数据: any) => {
        库.镜片订单表.push(返回数据);
        console.log(返回数据)
        行数据.右镜片订货日 = 库.月 + '月' + 库.日
        socket.emit('订单', '改', 行数据, (返回数据: any) => {
          console.log(返回数据)
        });
      });
    }

  }
}

let 右镜片库存判断 = computed(() => {
  let 找到的镜片 = 库.镜片表.find(item => item.镜片名 === 行数据.镜片);
  let 右镜片近视 = 行数据.右近视
  let 右镜片散光 = 行数据.右散光
  if (找到的镜片) {
    return 找到的镜片.库存[`近${右镜片近视}散${右镜片散光}`] ? 找到的镜片.库存[`近${右镜片近视}散${右镜片散光}`] : 0
  } else
    return 0
})

let 左镜片订货日并计算总利润 = () => {
  总利润计算()
  //行数据.左镜片订货日 = 库.月 + '月' + 库.日
  if (行数据.左镜片供应商) {
    //创建镜片订单 
    let 找到的镜片 = 库.镜片表.find(item => item.镜片名 === 行数据.镜片);
    let 新镜片订单 = new 镜片订单类()
    新镜片订单.订单日期 = new Date().toLocaleString('zh-CN')
    新镜片订单.镜片名 = 行数据.镜片;
    新镜片订单.近视 = 行数据.左近视
    新镜片订单.散光 = 行数据.左散光
    新镜片订单.进货价格 = 找到的镜片[行数据.左镜片供应商] / 2;
    新镜片订单.供货商 = 行数据.左镜片供应商;
    新镜片订单.订单类型 = '销售';
    新镜片订单.订单号 = 行数据.订单号 + '左';
    新镜片订单.镜片收到日 = '未收到';
    //添加到 镜片订单表 如果已经存在就修改
    if (库.镜片订单表.find(item => item.订单号 === 行数据.订单号 + '左')) {
      alert('左镜片订单已存在 将修改')
      新镜片订单._id = 库.镜片订单表.find(item => item.订单号 === 行数据.订单号 + '左')._id
      socket.emit('镜片订单', '改', 新镜片订单, (返回数据: any) => {
        库.镜片订单表.push(返回数据);
        console.log(返回数据)
        行数据.左镜片订货日 = 库.月 + '月' + 库.日
        socket.emit('订单', '改', 行数据, (返回数据: any) => {
          console.log(返回数据)
        });
      });
    } else {
      alert('左镜片添加到镜片订单表')
      socket.emit('镜片订单', '增', 新镜片订单, (返回数据: any) => {
        库.镜片订单表.push(返回数据);
        console.log(返回数据)
        行数据.左镜片订货日 = 库.月 + '月' + 库.日
        socket.emit('订单', '改', 行数据, (返回数据: any) => {
          console.log(返回数据)
        });
      });
    }

  }

}
let 左镜片库存判断 = computed(() => {
  let 找到的镜片 = 库.镜片表.find(item => item.镜片名 === 行数据.镜片);
  let 左镜片近视 = 行数据.左近视
  let 左镜片散光 = 行数据.左散光
  if (找到的镜片) {
    return 找到的镜片.库存[`近${左镜片近视}散${左镜片散光}`] ? 找到的镜片.库存[`近${左镜片近视}散${左镜片散光}`] : 0
  } else
    return 0
})
let 镜片下单日并计算总利润 = () => {
  总利润计算()
  行数据.镜片下单日 = 库.月 + '月' + 库.日
}

watch(() => 行数据.镜片, 镜片下单日并计算总利润)
watch(() => 行数据.右镜片供应商, 右镜片订货日并计算总利润)
watch(() => 行数据.左镜片供应商, 左镜片订货日并计算总利润)
watch(() => 行数据.选定镜框, 镜框减库存并计算总利润)
watch(() => 行数据.试戴镜框, () => {
  行数据.镜框下单日 = 库.月 + '月' + 库.日
}, {deep: true})
watch(() => 行数据.优惠, 总利润计算)

let 退货 = () => {
  行数据.订单完成日 = '退货'
  行数据.订单进度 = '已完成'
  库.通讯('订单', "改", 行数据);
}

let 发货 = () => {
  if (行数据.订单完成日 == '') {
    行数据.订单完成日 = 库.月日
    行数据.订单进度 = '已完成'
    库.通讯('订单', "改", 行数据);
  } else {
    行数据.订单完成日 = ''
    行数据.订单进度 = '未完成'
    库.通讯('订单', "改", 行数据);
  }
}
</script>

<template>
  <div class="行整页">
    <div class="标识格">
      <div class="第一行">
        <div class="第一行1">
          <div class="订单号">{{ 行数据.订单号 }}</div>
          <div>{{ 订单号分解 }}</div>
        </div>
        <div class="第一行2">
          <input class="标识" v-model.lazy="行数据.收件人" placeholder="收件人">
          <div :class="{ 镜框选项: true, 警告色: !行数据.镜框选项 }">
            <input :class="{ 警告色: !行数据.镜框选项 }" v-model=行数据.镜框选项 list="镜框选项" placeholder="镜框选项">
            <icon 图标名="lm-close-circle-fill" @click="行数据.镜框选项 = ''" 颜色="#999" font-size='25px'/>
          </div>
        </div>
      </div>
      <div class="第二行">
        <input @change="旺旺号判定()" v-model.lazy="行数据.旺旺名" placeholder="旺旺名">
        <div @click="状态.购买记录附加页 = !状态.购买记录附加页">
          {{ 行数据.购买记录.length + 1 == 1 ? '新' : 行数据.购买记录.length + 1 }}
        </div>
      </div>
    </div>

    <div v-if="行数据.镜框选项 !== '只买镜框'" class="镜片格">

      <div class="镜片第二行">
        <div class="镜片带按钮">
          <input :class="{ 镜片: true, 警告色: !库.镜片名选项.includes(行数据.镜片) }" v-model.lazy="行数据.镜片"
                 placeholder="镜片" list="镜片名">
          <icon :class="{ 图标: true, 警告色: 镜片名警告 }" 图标名="lm-close-circle-fill"
                @click="行数据.镜片 = ''; 行数据.镜片下单日 = ''"
                颜色="#999" font-size='26px'/>
        </div>
        <div :class="{ 警告色: 行数据.镜片下单日 == '' }">{{ 行数据.镜片下单日 ? 行数据.镜片下单日 : '未订片' }}</div>
        <input v-model.lazy="行数据.优惠" placeholder="无优惠">
      </div>
      <div class="验光数据 ">
        <div :class="{ 光度: true, 客服光度: 库.当前登录用户类型 == '客服' }">
          <input :class="{ 警告色: 近视光度警告(行数据.右近视) }" v-model.lazy="行数据.右近视" placeholder="右近视">
          <input :class="{ 警告色: 散光光度警告(行数据.右散光) }" v-model.lazy="行数据.右散光" placeholder="右散光">
          <input :class="{ 警告色: 轴向光度警告(行数据.右轴向) }" v-model.lazy="行数据.右轴向" placeholder="右轴向">
          <input :class="{ 警告色: 瞳距光度警告(行数据.右瞳距) }" v-model.lazy="行数据.右瞳距" placeholder="右瞳距">
          <div>{{ 右镜片库存判断 }}库存</div>
          <div :class="{ 警告色: 行数据.右镜片订货日 == '' }">
            {{ 行数据.右镜片订货日 ? 行数据.右镜片订货日 + '订' : '未订货' }}
          </div>
          <div :class="{ 警告色: 行数据.右镜片备好日 == '' }" @click=" 镜片收货(行数据.订单号+'右')">
            {{ 行数据.右镜片备好日 ? 行数据.右镜片备好日 + '备好' : '未备好' }}
          </div>

          <div v-if="库.当前登录用户类型 == '助理'" class="镜片带按钮">
            <input @change="库.通讯('订单', '改', 行数据)" :class="{ 警告色: !行数据.右镜片供应商, 镜片: true, }"
                   v-model.lazy="行数据.右镜片供应商"
                   placeholder='右订片' list="镜片供应商">
            <icon :class="{ 警告色: !行数据.右镜片供应商, 图标: true, }" 图标名="lm-close-circle-fill"
                  @click="行数据.右镜片供应商 = ''; 行数据.右镜片订货日 = ''; 行数据.右镜片备好日 = ''" 颜色="#999"
                  font-size='25px'/>
          </div>
        </div>
        <div :class="{ 光度: true, 客服光度: 库.当前登录用户类型 == '客服' }">
          <input :class="{ 警告色: 近视光度警告(行数据.左近视) }" v-model.lazy="行数据.左近视" placeholder="左近视">
          <input :class="{ 警告色: 散光光度警告(行数据.左散光) }" v-model.lazy="行数据.左散光" placeholder="左散光">
          <input :class="{ 警告色: 轴向光度警告(行数据.左轴向) }" v-model.lazy="行数据.左轴向" placeholder="左轴向">
          <input :class="{ 警告色: 瞳距光度警告(行数据.左瞳距) }" v-model.lazy="行数据.左瞳距" placeholder="左瞳距">
          <div>{{ 左镜片库存判断 }}库存</div>
          <div :class="{ 警告色: 行数据.左镜片订货日 == '' }">
            {{ 行数据.左镜片订货日 ? 行数据.左镜片订货日 + '订' : '未订货' }}
          </div>
          <div :class="{ 警告色: 行数据.左镜片备好日 == '' }" @click=" 镜片收货(行数据.订单号+'左')">
            {{ 行数据.左镜片备好日 ? 行数据.左镜片备好日 + '备好' : '未备好' }}
          </div>

          <div v-if="库.当前登录用户类型 == '助理'" class="镜片带按钮">
            <input @change="库.通讯('订单', '改', 行数据)" :class="{ 警告色: !行数据.左镜片供应商, 镜片: true, }"
                   v-model.lazy="行数据.左镜片供应商"
                   placeholder='左订片' list="镜片供应商">
            <icon :class="{ 警告色: !行数据.左镜片供应商, 图标: true, }" 图标名="lm-close-circle-fill"
                  @click="行数据.左镜片供应商 = ''; 行数据.左镜片订货日 = ''; 行数据.左镜片备好日 = ''" 颜色="#999"
                  font-size='25px'/>
          </div>
        </div>
      </div>
    </div>

    <div v-if="行数据.镜框选项 == '只买镜框'" class="镜框格">
      只买镜框
    </div>

    <div v-if="行数据.镜框选项 == null || 行数据.镜框选项 == ''" class="镜框格"> 未选择 镜框选项</div>

    <div v-if="行数据.镜框选项 == '只买镜框'" class="只买镜框镜框格">
      <input v-model.lazy="行数据.选定镜框" class="" placeholder="选定镜框" list="镜框名">
      <input v-model.lazy="行数据.备注" class="" placeholder="备注">
    </div>

    <div v-if="行数据.镜框选项 == '试戴镜框'" class="试戴镜框格">
      <div class="镜框第一行">
        <input v-model.lazy="行数据.镜框下单日" :class="{ 警告色: 行数据.镜框下单日 == '' }" placeholder="镜框下单日"
               list="日期">
        <input @change="库.通讯('订单', '改', 行数据)" v-model.lazy="行数据.镜框发货日"
               :class="{ 警告色: 行数据.镜框发货日 == '' }"
               placeholder="镜框发货日" list="日期">
        <input v-model.lazy="行数据.镜框备好日" :class="{ 警告色: 行数据.镜框备好日 == '' }" placeholder="镜框收到日"
               list="日期">
      </div>


      <div class="镜框第三行 ">
        <input v-model.lazy="行数据.选定镜框" class="" placeholder="选定镜框" list="镜框名">
        <input v-for="i in [0, 1]" v-model.lazy="行数据.试戴镜框[i]" class="" :placeholder="'试戴' + (i + 1)"
               list="镜框名">
      </div>
      <div class="镜框第三行 ">
        <input v-for="i in [2, 3, 4]" v-model.lazy="行数据.试戴镜框[i]" class="" :placeholder="'试戴' + (i + 1)"
               list="镜框名">
      </div>


      <input v-model.lazy="行数据.备注" placeholder="备注">

    </div>

    <div v-if="行数据.镜框选项 == '直接加工'" class="直接加工镜框格">
      <div class="直接加工">直接加工</div>
      <input v-model.lazy="行数据.选定镜框" placeholder="选定镜框" list="镜框名">
      <input v-model.lazy="行数据.备注" placeholder="备注">
    </div>

    <div v-if="行数据.镜框选项 == '来框加工'" class="来框镜框格">
      <input v-model.lazy="行数据.镜框备好日" :class="{ 警告色: 行数据.镜框备好日 == '' }" placeholder="镜框收到日"
             list="日期">
      <input v-model.lazy="行数据.镜框运单号" :class="{ 警告色: 行数据.镜框运单号 == '' }"
             placeholder="请输入返回运单号">
      <input v-model.lazy="行数据.备注" placeholder="备注">
    </div>


    <div class="图标格">
      <div :class="{ 纯白: true }">
        <icon 图标名="lm-save" @click="改(行数据);" :颜色=状态.保存图标颜色 font-size='25px'/>
      </div>
      <div :class=" { 纯白: !状态.编辑记录附加页, 绿色: 状态.编辑记录附加页 } ">
        <icon 图标名="lm-reloadtime" @click=" 状态.编辑记录附加页 = !状态.编辑记录附加页 " 颜色="#666"
              font-size='25px'/>
      </div>
      <div :class=" { 纯白: true } ">
        <icon 图标名="lm-delete" @click=" 状态.删除附加页 = !状态.删除附加页 " 颜色="#F56C6C" font-size='25px'/>
      </div>
      <div :class=" { 纯白: !状态.打印范围附加页, 绿色: 状态.打印范围附加页 } ">
        <icon 图标名="lm-printer" @click=" 状态.打印范围附加页 = !状态.打印范围附加页 " :颜色=状态.打印图标颜色
              font-size='25px'/>
      </div>

    </div>

    <div class="进度格">
      <div :class=" { 白色: true } ">{{ 行数据.订单进度 }}</div>
      <div :class=" { 白色: true } ">
        {{ 行数据.编辑记录.length <= 1 ? '修改记录' : '修改记录' + (行数据.编辑记录.length - 1) }}
      </div>


      <div v-if=" 库.当前登录用户类型 == '助理' " :class=" { 绿色: 行数据.订单完成日 == '' } " @click=" 发货() ">
        {{ 行数据.订单完成日 ? 行数据.订单完成日 : '发货' }}
      </div>
      <div v-if=" 库.当前登录用户类型 == '助理' && 行数据.订单进度 !== '已完成' " class="警告色" @click=" 退货() ">
        退货
      </div>
    </div>

  </div>


  <!--  <div v-if=" 库.当前登录用户类型 == '助理' ">-->
  <!--    镜片利润{{ 行数据.镜片利润 }} 镜片进货价{{ 行数据.镜片进货价 }} 镜片售价{{ 行数据.镜片售价 }}-->
  <!--    镜框利润{{ 行数据.镜框利润 }} 镜框进货价{{ 行数据.镜框进货价 }} 镜框售价{{ 行数据.镜框售价 }} 总利润{{-->
  <!--      行数据.总利润-->
  <!--    }}-->
  <!--  </div>-->


  <lmPrint v-if=" 状态.打印范围附加页 " :行数据=" 行数据 "></lmPrint>

  <Transition>
    <div class="购买记录附加页" v-if=" 状态.购买记录附加页 ">
      <div v-for="(i,k)  in   行数据.购买记录 " class="购买记录">
        <div :class=" { 第1块: true, 未完成: JSON.parse(行数据.购买记录[k]).订单进度 != '已完成' } ">
          <div>{{ JSON.parse(行数据.购买记录[k]).订单进度 != '已完成' ? '未完成' : '已完成' }}</div>
          {{
            JSON.parse(行数据.购买记录[k]).订单号.slice(2, 4) + "月" + JSON.parse(行数据.购买记录[k]).订单号.slice(4, 6) + "日"
          }}
        </div>
        <div class="第2块"> 第{{ k + 1 }}次购买</div>
        <div class="第3块">
          <div> {{ JSON.parse(i).旺旺名 }}</div>
          <div> {{ JSON.parse(行数据.购买记录[k]).镜片 }}</div>
        </div>
        <div class="第4块">
          <div>右近视: {{ JSON.parse(行数据.购买记录[k]).右近视 }}</div>
          <div>右散光: {{ JSON.parse(行数据.购买记录[k]).右散光 }}</div>
          <div>右轴向: {{ JSON.parse(行数据.购买记录[k]).右轴向 }}</div>
          <div>右瞳距: {{ JSON.parse(行数据.购买记录[k]).右瞳距 }}</div>
          <div>左近视: {{ JSON.parse(行数据.购买记录[k]).左近视 }}</div>
          <div>左散光: {{ JSON.parse(行数据.购买记录[k]).左散光 }}</div>
          <div>左轴向: {{ JSON.parse(行数据.购买记录[k]).左轴向 }}</div>
          <div>左瞳距: {{ JSON.parse(行数据.购买记录[k]).左瞳距 }}</div>
        </div>
        <div class="第5块">
          优惠: {{ JSON.parse(行数据.购买记录[k]).优惠 }}
        </div>

      </div>
    </div>
  </Transition>
  <div v-if=" 状态.编辑记录附加页 ">
    <div v-for="(i,k) in 行数据.编辑记录 ">
      <div class="编辑记录附加页 横向">
        {{ 行数据.编辑记录[k].split('#')[0] }}
        <div> {{ JSON.parse(i.split('#')[1]).收件人 }}</div>
        <div>
          <div> {{ JSON.parse(行数据.编辑记录[k].split('#')[1]).旺旺名 }}</div>
          <div> {{ JSON.parse(行数据.编辑记录[k].split('#')[1]).镜片 }}</div>
        </div>
        <div class="光度数据 ">
          <div>右近视: {{ JSON.parse(行数据.编辑记录[k].split('#')[1]).右近视 }}</div>
          <div>右散光: {{ JSON.parse(行数据.编辑记录[k].split('#')[1]).右散光 }}</div>
          <div>右轴向: {{ JSON.parse(行数据.编辑记录[k].split('#')[1]).右轴向 }}</div>
          <div>右瞳距: {{ JSON.parse(行数据.编辑记录[k].split('#')[1]).右瞳距 }}</div>
          <div>左近视: {{ JSON.parse(行数据.编辑记录[k].split('#')[1]).左近视 }}</div>
          <div>左散光: {{ JSON.parse(行数据.编辑记录[k].split('#')[1]).左散光 }}</div>
          <div>左轴向: {{ JSON.parse(行数据.编辑记录[k].split('#')[1]).左轴向 }}</div>
          <div>左瞳距: {{ JSON.parse(行数据.编辑记录[k].split('#')[1]).左瞳距 }}</div>
        </div>
        <div> {{ JSON.parse(行数据.编辑记录[k].split('#')[1]).备注 }}</div>
      </div>
    </div>
  </div>
  <div class="删除附加页" v-if=" 状态.删除附加页 ">
    <div class="第一行">
      <div></div>
      <icon 图标名="lm-close-circle-fill" @click=" 状态.删除附加页 = !状态.删除附加页 " 颜色="#666" font-size='25px'/>
    </div>
    <div>
      <div> 是否删除{{ 行数据.订单号 }}订单?</div>
      <div> {{ 行数据.旺旺名 }}</div>
      <div> {{ 行数据.收件人 }}</div>
    </div>
    <div class="第三行">

      <icon 图标名="lm-delete" @click=" 删(行数据) " 颜色="#F56C6C" font-size='65px'/>

    </div>
  </div>
  <!-- 选项 -->
  <datalist id="镜框选项">
    <option>试戴镜框</option>
    <option>只买镜框</option>
    <option>来框加工</option>
    <option>直接加工</option>
  </datalist>
  <datalist id="镜片供应商">
    <option value="湖北和益"> 湖北和益</option>
    <option value="山东臻视"> 山东臻视</option>
    <option value="上海老周"> 上海老周</option>
    <option value="湖北蔡司"> 湖北蔡司</option>
    <option value="丹阳夏总"> 丹阳夏总</option>
    <option value="店铺库存">店铺库存</option>
  </datalist>
  <datalist id="日期">
    <option :value=库.月日>今天</option>
  </datalist>
  <datalist id="镜片名">
    <option v-for="i in 库.镜片名选项" :value=i>售价: {{ 镜片售价选项(i) }}元</option>
  </datalist>
  <datalist id="镜框名">
    <option v-for="(i, k) in 库.镜框表 " :value=库.镜框表[k].镜框名>{{
        i.镜框名
      }} 库存:{{ i.库存数量 }}
    </option>
  </datalist>
</template>


<style lang="scss" scoped>
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
      border-radius: 20px 0 0 20px;

      background: $浅灰;
    }

    .未完成 {
      border-radius: 20px 0 0 20px;

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

      border-radius: 0 20px 20px 0;
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
    border-radius: 0;
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
        grid-template-columns: 1fr 1fr 1fr 1fr 0.7fr 1fr 1fr 1.5fr;

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
        grid-template-columns: 1fr 1fr 1fr 1fr 0.8fr 1fr 1fr;
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

  .只买镜框镜框格 {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
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
  grid-auto-flow: row;
  grid-column: 1 / span 3
}


div {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 0 solid rgb(225, 225, 225);
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
  box-shadow: 0 0 3px 1px $深灰;
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
