<script setup lang="ts">
import { pinia库, 订单类, 镜片订单类 } from '@仓库/pinia库';
import lmB from "@组件/按钮.vue";
import { 获取Cookie, 删除Cookie, 设置Cookie } from "@仓库/cookie";
import { ref, onMounted, reactive, computed, watch } from 'vue';
import { socket } from "@仓库/socket链接";
import Icon from "@组件/icons/Icon.vue";



let 库 = pinia库();
let 全局状态 = reactive({
  镜片名: '尼德克单光1.74',
  供应商: '供应商',
  显示库存表: true,
})



let 格子范围 = computed(() => {
  if (全局状态.镜片名 === '尼德克单光1.74') return { 起点: -500, 终点: -1400 }
  else if (全局状态.镜片名 === '视特耐非球1.60') return { 起点: 0, 终点: -500 }
  else if (全局状态.镜片名 === '视特耐非球1.67') return { 起点: -200, 终点: -800 }
  else if (全局状态.镜片名 === '凯米U2-1.60') return { 起点: 0, 终点: -500 }
  else if (全局状态.镜片名 === '凯米U2-1.67') return { 起点: -200, 终点: -800 }
  else { return { 起点: 0, 终点: -300 } }
})

let 选定镜片库存 = computed(() => {
  if (库.镜片表.find(镜片 => 镜片.镜片名 === 全局状态.镜片名)) {
    return 库.镜片表.find(镜片 => 镜片.镜片名 === 全局状态.镜片名).库存
  }
  else {
    return {}
  }
}
)

let 选定镜片库存数量 = computed(() => {
  let 数量 = 0
  let 总价 = 0
  let 镜片 = 库.镜片表.find(镜片 => 镜片.镜片名 === 全局状态.镜片名)
  if (镜片) {
    for (let 光度 in 镜片.库存) {
      if (镜片.库存[光度]) 数量 = 数量 + 镜片.库存[光度]
      if (全局状态.镜片名 === '尼德克单光1.74') 总价 = 数量 * 镜片.上海老周
      else if (全局状态.镜片名 === '视特耐非球1.60') 总价 = 数量 * 镜片.湖北蔡司
      else if (全局状态.镜片名 === '视特耐非球1.67') 总价 = 数量 * 镜片.湖北蔡司
      else if (全局状态.镜片名 === '凯米U2-1.67') 总价 = 数量 * 镜片.湖北和益
      else if (全局状态.镜片名 === '凯米U2-1.60') 总价 = 数量 * 镜片.湖北和益
    }
  }
  return { 数量: 数量, 总价: 总价, 单价: 总价 / 数量 }
})

let 尼德克镜片库存数量 = computed(() => {
  let 数量 = 0
  let 总价 = 0
  let 镜片 = 库.镜片表.find(镜片 => 镜片.镜片名 === '尼德克单光1.74')
  if (镜片) {
    for (let 光度 in 镜片.库存) {
      if (镜片.库存[光度]) 数量 = 数量 + 镜片.库存[光度]
    }
    总价 = 数量 * 镜片.上海老周 / 2
  }
  return `数量:${数量} 总价:${总价}`
})
let 视特耐16库存数量 = computed(() => {
  let 数量 = 0
  let 总价 = 0
  let 镜片 = 库.镜片表.find(镜片 => 镜片.镜片名 === '视特耐非球1.60')
  if (镜片) {
    for (let 光度 in 镜片.库存) {
      if (镜片.库存[光度]) 数量 = 数量 + 镜片.库存[光度]
    }
    总价 = 数量 * 镜片.山东臻视
  }
  return `数量:${数量} 总价:${总价}`
})
let 视特耐167库存数量 = computed(() => {
  let 数量 = 0
  let 总价 = 0
  let 镜片 = 库.镜片表.find(镜片 => 镜片.镜片名 === '视特耐非球1.67')
  if (镜片) {
    for (let 光度 in 镜片.库存) {
      if (镜片.库存[光度]) 数量 = 数量 + 镜片.库存[光度]
    }
    总价 = 数量 * 镜片.山东臻视
  }
  return `数量:${数量} 总价:${总价}`
})
let 凯米16库存数量 = computed(() => {
  let 数量 = 0
  let 总价 = 0
  let 镜片 = 库.镜片表.find(镜片 => 镜片.镜片名 === '凯米U2-1.60')
  if (镜片) {
    for (let 光度 in 镜片.库存) {
      if (镜片.库存[光度]) 数量 = 数量 + 镜片.库存[光度]
    }
    总价 = 数量 * 镜片.山东臻视
  }
  return `数量:${数量} 总价:${总价}`
})
let 凯米167库存数量 = computed(() => {
  let 数量 = 0
  let 总价 = 0
  let 镜片 = 库.镜片表.find(镜片 => 镜片.镜片名 === '凯米U2-1.67')
  if (镜片) {
    for (let 光度 in 镜片.库存) {
      if (镜片.库存[光度]) 数量 = 数量 + 镜片.库存[光度]
    }
    总价 = 数量 * 镜片.山东臻视
  }
  return `数量:${数量} 总价:${总价}`
})

let 镜片格子 = computed(() => {
  let data = []
  for (let 近 = 格子范围.value.起点; 近 >= 格子范围.value.终点; 近 = 近 - 25) {
    if (近 < -1000) {
      if (近 % 50 === 0) {
        for (let 散 = 0; 散 >= -200; 散 = 散 - 25) {
          if (散 !== -25) {
            data.push(`近${近}散${散}`)
          }
        }
      }
    }
    else {
      for (let 散 = 0; 散 >= -200; 散 = 散 - 25) {
        if (散 !== -25) {
          data.push(`近${近}散${散}`)
        }
      }
    }
  }
  return data
})

let 改变库存 = (i) => {
  if (选定镜片库存.value[i] === '') { delete 选定镜片库存.value[i] }
  console.log(库.镜片表.find(镜片 => 镜片.镜片名 === 全局状态.镜片名))
  let 镜片数据 = 库.镜片表.find(镜片 => 镜片.镜片名 === 全局状态.镜片名)
  socket.emit('镜片', '改', 镜片数据, (返回数据: any) => { console.log(返回数据) });
}

let 镜片销售订单表 = computed(() => {
  let data = []
  let 预存余额 = 10000
  for (let 订单 of 库.订单表) {
    if (订单.左镜片供应商 === 全局状态.供应商) {
      if (订单.镜片进货价) {
        预存余额 = 预存余额 - 订单.镜片进货价 / 2
        data.push({ 左镜片: 订单.镜片, 近视: 订单.左近视, 散光: 订单.左散光, 余额: 预存余额 })
      }
    }
    if (订单.右镜片供应商 === 全局状态.供应商) {
      if (订单.镜片进货价) {
        预存余额 = 预存余额 - 订单.镜片进货价 / 2
        data.push({ 右镜片: 订单.镜片, 近视: 订单.右近视, 散光: 订单.右散光, 余额: 预存余额 })
      }
    }
  }
  return data
})


let 镜片订单表 = computed(() => {
  let 镜片订单表 = 库.镜片订单表.filter(订单 => 订单.镜片名 === 全局状态.镜片名 && 订单.订单类型 === '进货')
  镜片订单表 = 镜片订单表.sort((a, b) => { return new Date(b.订单日期) > new Date(a.订单日期) ? 1 : -1 })

  return 镜片订单表
})

let 添加订单 = () => {
  let 新镜片订单 = new 镜片订单类()
  新镜片订单.镜片名 = 全局状态.镜片名
  新镜片订单.订单日期 = new Date().toLocaleString('zh-CN')
  新镜片订单.进货价格 = 0;
  新镜片订单.供货商 = '';
  if (全局状态.镜片名 === '尼德克单光1.74') { 新镜片订单.供货商 = '上海老周'; 新镜片订单.进货价格 = 66.5 }
  新镜片订单.订单类型 = '进货';
  新镜片订单.镜片收到日 = '未收到';
  socket.emit('镜片订单', '增', 新镜片订单, (返回数据: any) => { 库.镜片订单表.push(返回数据), console.log(返回数据) });
}
let 添加有度数的订单 = (度数) => {
  let 新镜片订单 = new 镜片订单类()
  新镜片订单.镜片名 = 全局状态.镜片名
  新镜片订单.订单日期 = new Date().toLocaleString('zh-CN')
  新镜片订单.进货价格 = 0;
  新镜片订单.供货商 = '';
  新镜片订单.近视 = 度数.split('散')[0].split('近')[1]
  新镜片订单.散光 = 度数.split('散')[1]
  if (全局状态.镜片名 === '尼德克单光1.74') { 新镜片订单.供货商 = '上海老周'; 新镜片订单.进货价格 = 66.5 }
  新镜片订单.订单类型 = '进货';
  新镜片订单.镜片收到日 = '未收到';
  socket.emit('镜片订单', '增', 新镜片订单, (返回数据: any) => { 库.镜片订单表.push(返回数据), console.log(返回数据) });
}

let 删除订单 = (订单) => {

  socket.emit('镜片订单', '删', 订单, (返回数据: any) => { console.log(返回数据) });
  const indexToRemove = 库.镜片订单表.findIndex((行: any) => 行._id === 订单._id);

  if (indexToRemove !== -1) {
    库.镜片订单表.splice(indexToRemove, 1);
  }
}

let 减库存 = (订单) => {
  let 镜片数据 = 库.镜片表.find(镜片 => 镜片.镜片名 === 订单.镜片名)
  console.log(镜片数据)
  if (!镜片数据.库存[`近${订单.近视}散${订单.散光}`]) 镜片数据.库存[`近${订单.近视}散${订单.散光}`] = 0
  镜片数据.库存[`近${订单.近视}散${订单.散光}`] -= 1
  socket.emit('镜片', "改", 镜片数据);
  socket.emit('镜片订单', "改", 订单);
}

let 加库存 = (订单) => {
  if (订单.供货商 && 订单.近视 && 订单.散光) {
    let 镜片数据 = 库.镜片表.find(镜片 => 镜片.镜片名 === 订单.镜片名)
    if (!镜片数据.库存[`近${订单.近视}散${订单.散光}`]) 镜片数据.库存[`近${订单.近视}散${订单.散光}`] = 0
    镜片数据.库存[`近${订单.近视}散${订单.散光}`] += 1
    订单.镜片收到日 = new Date().toLocaleString('zh-CN')
    socket.emit('镜片', "改", 镜片数据);
    socket.emit('镜片订单', "改", 订单);
    alert(`${订单.镜片名}近视${订单.近视}散光${订单.散光}的镜片 库存+1 到${镜片数据.库存[`近${订单.近视}散${订单.散光}`]}`)
  }
  else {
    alert('请填写近视散光和供货商')
  }
}
let 修改订单 = (订单) => {
  socket.emit('镜片订单', "改", 订单);
}

let 进货价 = (订单) => {
  let 镜片数据 = 库.镜片表.find(镜片 => 镜片.镜片名 === 订单.镜片名)
  if (镜片数据[订单.供货商]) 订单.进货价格 = 镜片数据[订单.供货商]
  socket.emit('镜片订单', "改", 订单);
}

let 测试 = () => {
  alert('测试功能 无意义')
}
</script>

<template>
  <div class="页面 滑条">
    <h1>{{ 全局状态.镜片名 }} 镜片库存</h1>
    <div class="库存部分">

      <div class="首行">
        <div :class="{ 按钮: true, 正绿: 全局状态.镜片名 === '尼德克单光1.74' }" @click="全局状态.镜片名 = '尼德克单光1.74'">
          <div> 尼德克单光1.74 </div>
          <div>{{ 尼德克镜片库存数量 }}</div>
        </div>
        <div :class="{ 按钮: true, 正绿: 全局状态.镜片名 === '凯米U2-1.60' }" @click="全局状态.镜片名 = '凯米U2-1.60'">
          <div> 凯米U2-1.60 </div>
          <div>{{ 凯米16库存数量 }}</div>
        </div>
        <div :class="{ 按钮: true, 正绿: 全局状态.镜片名 === '凯米U2-1.67' }" @click="全局状态.镜片名 = '凯米U2-1.67'">
          <div> 凯米U2-1.67 </div>
          <div>{{ 凯米167库存数量 }}</div>
        </div>
        <div :class="{ 按钮: true, 正绿: 全局状态.镜片名 === '视特耐非球1.60' }" @click="全局状态.镜片名 = '视特耐非球1.60'">
          <div> 视特耐非球1.60 </div>
          <div>{{ 视特耐16库存数量 }}</div>

        </div>
        <div :class="{ 按钮: true, 正绿: 全局状态.镜片名 === '视特耐非球1.67' }" @click="全局状态.镜片名 = '视特耐非球1.67'">
          <div> 视特耐非球1.67 </div>
          <div>{{ 视特耐167库存数量 }}</div>
        </div>
        <div class="按钮" @click="测试()">测试</div>
      </div>
      <!-- <div>{{ 选定镜片库存 }}</div> -->
      <div class="按钮" @click="全局状态.显示库存表 = !全局状态.显示库存表">显示镜片库存</div>
      <Transition name="dh">
        <div v-show="全局状态.显示库存表" class="镜片表 滑条">
          <div v-for="i in 镜片格子" :class="{ 镜片块: true, 无: 选定镜片库存[i] < 1 }">
            <div> {{ i }}</div>
            <input @change="改变库存(i)" type="number" v-model="选定镜片库存[i]">
            <icon 图标名="lm-plus-circle"  @click="添加有度数的订单(i)"  颜色="#333" font-size='20px' />
          </div>
        </div>
      </Transition>
    </div>

    <div class="订单部分 滑条">
      <div class="首行">
        <div> </div>
        <div class="按钮 正蓝" @click="添加订单()">添加{{ 全局状态.镜片名 }} 的库存订单</div>
      </div>
      <div class="订单表 滑条">
        <div class="订单行" v-for="i, k in 镜片订单表">
          <div class="订单行元素"> {{ 镜片订单表[k].订单日期 }}</div>
          <div class="订单行元素"> {{ 镜片订单表[k].镜片名 }}</div>

          <div class="订单行元素"> {{ 镜片订单表[k].订单类型 }}</div>
          <div class="订单行元素" v-if="镜片订单表[k].订单类型 === '销售'"> 订单号{{ 镜片订单表[k].订单号 }} </div>
          <div class="订单行元素" v-if="镜片订单表[k].订单类型 === '进货'"> 进货价{{ 镜片订单表[k].进货价格 }} </div>
          <select v-if="镜片订单表[k].镜片收到日 === '未收到'" @change="进货价(i)" v-model="镜片订单表[k].供货商">
            <option value="" disabled selected="true">供货商</option>
            <option>湖北和益</option>
            <option>山东臻视</option>
            <option>上海老周</option>
            <option>湖北蔡司</option>
            <option>丹阳夏总</option>
          </select>
          <input @change="修改订单(镜片订单表[k])" v-if="镜片订单表[k].镜片收到日 === '未收到'" v-model="镜片订单表[k].近视" placeholder="近视">
          <input @change="修改订单(镜片订单表[k])" v-if="镜片订单表[k].镜片收到日 === '未收到'" v-model="镜片订单表[k].散光" placeholder="散光">
          <div v-if="镜片订单表[k].镜片收到日 !== '未收到'" class="订单行元素"> {{ 镜片订单表[k].供货商 }}</div>
          <div v-if="镜片订单表[k].镜片收到日 !== '未收到'" class="订单行元素"> {{ 镜片订单表[k].近视 }}</div>
          <div v-if="镜片订单表[k].镜片收到日 !== '未收到'" class="订单行元素"> {{ 镜片订单表[k].散光 }}</div>
          <div :class="{ 订单行元素: true, 正红: 镜片订单表[k].镜片收到日 === '未收到' }" v-if="镜片订单表[k].订单类型 === '进货'"> {{ 镜片订单表[k].镜片收到日
          }}
          </div>

          <div class="按钮组">
            <lmB v-if="镜片订单表[k].镜片收到日 === '未收到'" @click="删除订单(i)">删除</lmB>
            <lmB v-if="镜片订单表[k].镜片收到日 === '未收到'" @click="加库存(i)">收货</lmB>
          </div>

        </div>
      </div>

    </div>
    <datalist id="镜片名">
      <option v-for="i in 库.镜片名选项" :value=i> {{ i }}</option>
    </datalist>

  </div>
</template>

<style scoped lang="scss">
.列表 {
  height: 200px;
}

.页面 {
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr;
  gap: 2px;
  align-content: start;
  background-color: $背景;


  .库存部分 {
    align-content: start;
    gap: 2px;
    grid-template-columns: 1fr;
    grid-template-rows: 50px 30px auto;

    .首行 {
      gap: 2px;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-template-rows: 1fr;
    }

    .镜片表 {
      gap: 2px;
      align-content: start;
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: repeat(40px);
      // background-color: $暗绿;

      .镜片块 {
        grid-template-columns: 1fr 30px 20px;
        grid-template-rows: 1fr;
        background-color: $浅绿;


      }

      .无 {
        background-color: $正红;
      }

      .多 {
        background-color: $正绿;
      }

    }
  }

  .订单部分 {
    align-content: start;
    gap: 2px;
    grid-template-columns: 1fr;
    grid-template-rows: 50px 1fr;

    .首行 {
      gap: 2px;
      grid-template-columns: 1fr 300px;
      grid-template-rows: 1fr;
    }

    .订单表 {
      align-content: start;
      gap: 2px;

      .订单行 {
        gap: 2px;
        grid-template-columns: 1.5fr 1fr 0.5fr 0.8fr 1fr 0.5fr 0.5fr 1.5fr 100px;
        grid-template-rows: 1fr;
        input{
          background-color: $深灰;
        }

        .按钮组 {
          gap: 2px;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr;
        }
      }
    }
  }

}

input {
  color: #fff;
  font-weight: bold;
  text-align: center;
  font-size: 15px;
  border: none;
  width: 100%;
  height: 100%;
  background-color: #00000000;
}

select {
  text-align: center;
  box-sizing: border-box;
  border: none;
  width: 100%;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
  background: $浅黄;
  border-radius: 5px;
}

.按钮 {
  width: 100%;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
  background: $浅灰;
  border-radius: 5px;
}

.订单行元素 {

  width: 100%;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
  background: $浅黄;

}

.正绿 {
  background-color: $正绿;
}

.正红 {
  background-color: $正红;
}

.正蓝 {
  background-color: $正蓝;
}

.dh-enter-active,
.dh-leave-active {
  /* 添加 transform 属性以实现垂直移动 */
  transition: opacity 0.5s ease, transform 0.5s ease;

}

.dh-enter-from {
  opacity: 0;
  /* 初始状态：元素在上方（例如，向上偏移 100%） */
  transform: translateX(-100%);
}

.dh-leave-to {
  opacity: 0;
  /* 结束状态：元素回到上方 */
  transform: translateX(100%);
}</style>
