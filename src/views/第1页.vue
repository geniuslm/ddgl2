<script setup lang="ts">
import { pinia库, 订单类, 镜片订单类 } from '@仓库/pinia库';
import lmB from "@组件/按钮.vue";
import { 获取Cookie, 删除Cookie, 设置Cookie } from "@仓库/cookie";
import { ref, onMounted, reactive, computed, watch } from 'vue';
import { socket } from "@仓库/socket链接";
import { emitKeypressEvents } from 'readline';

let 库 = pinia库();
let 全局状态 = reactive({
  镜片名: '尼德克单光1.74',
  供应商: '店铺库存',
  显示库存表: false,
  湖北合益余额: 0,
  湖北蔡司余额: 0,
})



let 充值 = () => {
  let 新镜片订单 = new 镜片订单类()
  新镜片订单.订单日期 = new Date().toLocaleString('zh-CN')
  新镜片订单.充值金额 = 0;
  新镜片订单.供货商 = 全局状态.供应商;
  新镜片订单.订单类型 = '充值';
  socket.emit('镜片订单', '增', 新镜片订单, (返回数据: any) => { 库.镜片订单表.push(返回数据), console.log(返回数据) });
}
let 添加订单 = () => {
  let 新镜片订单 = new 镜片订单类()
  新镜片订单.镜片名 = ''
  新镜片订单.订单日期 = new Date().toLocaleString('zh-CN')
  新镜片订单.进货价格 = 0;
  新镜片订单.供货商 = '';
  新镜片订单.订单类型 = '进货';
  新镜片订单.镜片收到日 = '未收到';
  socket.emit('镜片订单', '增', 新镜片订单, (返回数据: any) => { 库.镜片订单表.push(返回数据), console.log(返回数据) });
}

let 添加测试订单 = () => {
  let 新镜片订单 = new 镜片订单类()
  新镜片订单.镜片名 = '凯米U2-1.67'
  新镜片订单.订单日期 = new Date().toLocaleString('zh-CN')
  新镜片订单.进货价格 = 0;
  if (全局状态.供应商 !== '全部供货商') 新镜片订单.供货商 = 全局状态.供应商;
  新镜片订单.进货价格 = 100;
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
let 减店铺库存 = (镜片订单) => {
  if (镜片订单.供货商 && 镜片订单.近视 && 镜片订单.散光) {
    let 镜片数据 = 库.镜片表.find(镜片 => 镜片.镜片名 === 镜片订单.镜片名)
    let 订单数据 = 库.订单表.find(订单 => 订单.订单号 === 镜片订单.订单号.slice(0, 8))
    if (!镜片数据.库存[`近${镜片订单.近视}散${镜片订单.散光}`]) 镜片数据.库存[`近${镜片订单.近视}散${镜片订单.散光}`] = 0
    //镜片库存-1 镜片订单收到日改到今天 订单的镜片收到日改到今天
    镜片数据.库存[`近${镜片订单.近视}散${镜片订单.散光}`] -= 1
    镜片订单.镜片收到日 = new Date().toLocaleString('zh-CN')
    订单数据[`${镜片订单.订单号.slice(8, 9)}镜片备好日`] = `${库.月}月${库.日}`

    socket.emit('镜片', "改", 镜片数据);
    socket.emit('订单', "改", 订单数据);
    socket.emit('镜片订单', "改", 镜片订单);
    let 光度库存数量 = 镜片数据.库存[`近${镜片订单.近视}散${镜片订单.散光}`]
    alert(`${镜片订单.镜片名}近视${镜片订单.近视}散光${镜片订单.散光}的镜片 库存从${光度库存数量+1}减到${光度库存数量}`)
  }
  else {
    alert('请填写近视散光和供货商')
  }
}
let 收货 = (镜片订单) => {
  if (镜片订单.供货商 && 镜片订单.近视 && 镜片订单.散光) {
    let 订单数据 = 库.订单表.find(订单 => 订单.订单号 === 镜片订单.订单号.slice(0, 8))
    // 镜片订单收到日改到今天 订单的镜片收到日改到今天
    镜片订单.镜片收到日 = new Date().toLocaleString('zh-CN')
    订单数据[`${镜片订单.订单号.slice(8, 9)}镜片备好日`] = `${库.月}月${库.日}`
    //同步
    socket.emit('订单', "改", 订单数据);
    socket.emit('镜片订单', "改", 镜片订单);
    alert(`${镜片订单.订单号}的${镜片订单.镜片名}于${`${库.月}月${库.日}`}  收货成功`)
  }
  else {
    alert('请填写近视散光和供货商')
  }
}

let 进货价 = (订单) => {
  let 镜片数据 = 库.镜片表.find(镜片 => 镜片.镜片名 === 订单.镜片名)
  if (镜片数据) {
    if (!镜片数据[订单.供货商]) {
      console.log(镜片数据)
      alert('请先在镜片表中填写进货价')
    }
    else {
      console.log(镜片数据[订单.供货商])
      订单.进货价格 = 镜片数据[订单.供货商]
      socket.emit('镜片订单', "改", 订单);
    }
  }
  else {
    alert('请填写存在的镜片名')
  }

}

let 测试 = () => {
  alert('测试功能 无意义')
}

let 提交更改 = (订单) => {
  socket.emit('镜片订单', "改", 订单, (返回数据: any) => { console.log(返回数据) });
}


let 镜片订单表 = computed(() => {
  let 镜片订单表 = 库.镜片订单表
  //筛选供货商
  if (全局状态.供应商 !== '全部供货商') 镜片订单表 = 库.镜片订单表.filter(订单 => 订单.供货商 === 全局状态.供应商)
  //按照订单日期排序
  镜片订单表 = 镜片订单表.sort((a, b) => { return new Date(b.订单日期) > new Date(a.订单日期) ? -1 : 1 })

  let 和益预存余额 = 0
  let 蔡司预存余额 = 0
  for (let 订单 in 镜片订单表) {
    if (镜片订单表[订单].供货商 === '湖北和益') {
      if (镜片订单表[订单].订单类型 === '充值') {
        和益预存余额 += 镜片订单表[订单].充值金额
        镜片订单表[订单].预存余额 = parseFloat(和益预存余额.toFixed(2))
      }
      if (镜片订单表[订单].订单类型 !== '充值') {
        和益预存余额 = 和益预存余额 - 镜片订单表[订单].进货价格
        镜片订单表[订单].预存余额 = parseFloat(和益预存余额.toFixed(2))
      }
    }
    if (镜片订单表[订单].供货商 === '湖北蔡司') {
      if (镜片订单表[订单].订单类型 === '充值') {
        蔡司预存余额 += 镜片订单表[订单].充值金额
        镜片订单表[订单].预存余额 = parseFloat(蔡司预存余额.toFixed(2))
      }
      if (镜片订单表[订单].订单类型 !== '充值') {
        蔡司预存余额 = 蔡司预存余额 - 镜片订单表[订单].进货价格
        镜片订单表[订单].预存余额 = parseFloat(蔡司预存余额.toFixed(2))
      }
    }
    if (镜片订单表[订单].供货商 === '店铺库存') {
      let 库存剩余总价 = (镜片名) => {
        let 数量 = 0
        let 总价 = 0
        let 镜片 = 库.镜片表.find(镜片 => 镜片.镜片名 === 镜片名)
        if (镜片) {
          for (let 光度 in 镜片.库存) {
            if (镜片.库存[光度]) 数量 = 数量 + 镜片.库存[光度]
          }
          总价 = 数量 * 镜片.店铺库存
        }
        return 总价
      }
      镜片订单表[订单].预存余额 = 库存剩余总价(镜片订单表[订单].镜片名)
    }

  }
  if (全局状态.湖北合益余额 === 0) 全局状态.湖北合益余额 = 和益预存余额
  if (全局状态.湖北蔡司余额 === 0) 全局状态.湖北蔡司余额 = 蔡司预存余额
  return 镜片订单表
})

</script>

<template>
  <div class="页面 滑条">
    <h1>{{ 全局状态.供应商 }} 镜片订单表</h1>
    <div class="页头部分">
      <div class="首行">
        <div :class="{ 按钮: true, 正绿: 全局状态.供应商 === '全部供货商' }" @click="全局状态.供应商 = '全部供货商'">
          <div>全部供货商</div>
        </div>
        <div :class="{ 按钮: true, 正绿: 全局状态.供应商 === '湖北和益' }" @click="全局状态.供应商 = '湖北和益'">
          <div>湖北和益</div>
          <div>{{ 全局状态.湖北合益余额 }}</div>
        </div>
        <div :class="{ 按钮: true, 正绿: 全局状态.供应商 === '湖北蔡司' }" @click="全局状态.供应商 = '湖北蔡司'">
          <div>湖北蔡司</div>
          <div>{{ 全局状态.湖北蔡司余额 }}</div>
        </div>
        <div :class="{ 按钮: true, 正绿: 全局状态.供应商 === '山东臻视' }" @click="全局状态.供应商 = '山东臻视'">
          <div>山东臻视</div>
        </div>
        <div :class="{ 按钮: true, 正绿: 全局状态.供应商 === '上海老周' }" @click="全局状态.供应商 = '上海老周'">
          <div>上海老周</div>
        </div>
        <div :class="{ 按钮: true, 正绿: 全局状态.供应商 === '丹阳夏总' }" @click="全局状态.供应商 = '丹阳夏总'">
          <div>丹阳夏总</div>
        </div>
        <div :class="{ 按钮: true, 正绿: 全局状态.供应商 === '店铺库存' }" @click="全局状态.供应商 = '店铺库存'">
          <div>店铺库存</div>
        </div>
        <div class="按钮" @click="测试()">充值</div>
      </div>
    </div>

    <div class="订单部分 滑条">
      <div class="首行">
        <div> </div>
        <div class="按钮 正蓝" @click="添加订单()">添加订单</div>
        <div class="按钮 正蓝" @click="添加测试订单()">添加测试订单</div>
        <div class="按钮 正蓝" @click="充值()">充值</div>
      </div>
      <div class="订单表 滑条">
        <div v-for="i, k in 镜片订单表">
          <div v-if="镜片订单表[k].订单类型 !== '充值' && 镜片订单表[k].订单类型 !== '进货'" class="销售订单行">

            <div class="订单行元素"> {{ 镜片订单表[k].订单类型 }} {{ 镜片订单表[k].订单号 }} </div>

            <!-- <input v-model="镜片订单表[k].镜片名" placeholder="镜片名" list="镜片名"> -->
            <div class="订单行元素"> 进货价{{ 镜片订单表[k].进货价格 }} </div>
            <select class="订单行元素" @change="进货价(i)" v-model="镜片订单表[k].供货商">
              <option value="" disabled selected="true">供货商</option>
              <option>湖北和益</option>
              <option>山东臻视</option>
              <option>上海老周</option>
              <option>湖北蔡司</option>
              <option>丹阳夏总</option>
              <option>店铺库存</option>
            </select>
            <div class="订单行元素">{{ 镜片订单表[k].预存余额 ? `余额:${镜片订单表[k].预存余额}` : `现结` }}</div>
            <div class="订单行元素"> {{ 镜片订单表[k].订单日期.slice(0, 10) }}</div>
            <div class="订单行元素"> {{ 镜片订单表[k].镜片名 }}</div>
            <input v-model="镜片订单表[k].近视" placeholder="近视" list="近视">
            <input v-model="镜片订单表[k].散光" placeholder="散光" list="散光">
            <div :class="{ 订单行元素: true, 正红: 镜片订单表[k].镜片收到日 === '未收到' }">
              {{ 镜片订单表[k].镜片收到日.slice(0, 10) }}
            </div>
            <div v-if="镜片订单表[k].供货商 !== '店铺库存'" class="按钮组">
              <lmB @click="删除订单(i)">删除</lmB>
              <lmB @click="收货(i)">收货</lmB>
            </div>
            <div v-if="镜片订单表[k].供货商 === '店铺库存'" class="按钮组">
              <lmB @click="删除订单(i)">删除</lmB>
              <lmB @click="减店铺库存(i)">减库存</lmB>
            </div>
          </div>

          <div v-if="镜片订单表[k].订单类型 === '充值'" class="充值订单行">

            <div class="元素"> {{ 镜片订单表[k].订单类型 }} {{ 镜片订单表[k].订单号 }} </div>
            <div class="元素"> {{ 镜片订单表[k].订单日期.slice(0, 10) }}</div>
            <select class="元素" @change="提交更改(镜片订单表[k])" v-model="镜片订单表[k].供货商">
              <option value="" disabled selected="true">供货商</option>
              <option>湖北和益</option>
              <option>山东臻视</option>
              <option>上海老周</option>
              <option>湖北蔡司</option>
              <option>丹阳夏总</option>
            </select>
            <input @change="提交更改(镜片订单表[k])" class="元素" type="number" v-model="镜片订单表[k].充值金额" placeholder="充值金额">
            <div class="元素">{{ 镜片订单表[k].预存余额 ? `余额:${镜片订单表[k].预存余额}` : `现结` }}</div>
            <lmB @click="删除订单(i)">删除</lmB>
          </div>

          <div v-if="镜片订单表[k].订单类型 === '进货'" class="进货订单行">
            <div class="元素"> {{ 镜片订单表[k].订单类型 }} {{ 镜片订单表[k].订单号 }} </div>
            <!-- <input v-model="镜片订单表[k].镜片名" placeholder="镜片名" list="镜片名"> -->
            <div class="元素"> 进货价{{ 镜片订单表[k].进货价格 }} </div>
            <select class="元素" @change="进货价(i)" v-model="镜片订单表[k].供货商">
              <option value="" disabled selected="true">供货商</option>
              <option>湖北和益</option>
              <option>山东臻视</option>
              <option>上海老周</option>
              <option>湖北蔡司</option>
              <option>丹阳夏总</option>
              <option>店铺库存</option>
            </select>
            <div class="元素">{{ 镜片订单表[k].预存余额 ? `余额:${镜片订单表[k].预存余额}` : `现结` }}</div>

            <div class="元素"> {{ 镜片订单表[k].订单日期.slice(0, 10) }}</div>
            <div class="元素"> {{ 镜片订单表[k].镜片名 }}</div>
            <input v-model="镜片订单表[k].近视" placeholder="近视" list="近视">
            <input v-model="镜片订单表[k].散光" placeholder="散光" list="散光">
            <div :class="{ 订单行元素: true, 正红: 镜片订单表[k].镜片收到日 === '未收到' }">
              {{ 镜片订单表[k].镜片收到日.slice(0, 10) }}
            </div>
            <div v-if="镜片订单表[k].供货商 !== '店铺库存'" class="按钮组">
              <lmB @click="删除订单(i)">删除</lmB>
            </div>
            <div v-if="镜片订单表[k].供货商 === '店铺库存'" class="按钮组">
              <lmB @click="删除订单(i)">删除</lmB>
              <lmB @click="减店铺库存(i)">减库存</lmB>
            </div>

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


  .页头部分 {
    align-content: start;
    gap: 2px;
    grid-template-columns: 1fr;
    grid-template-rows: 50px 30px auto;

    .首行 {
      gap: 2px;
      grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
      grid-template-rows: 1fr;
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
    grid-template-columns: 1fr 300px 300px 300px;
    grid-template-rows: 1fr;
  }

  .订单表 {
    align-content: start;
    gap: 2px;

    .销售订单行 {
      gap: 2px;
      justify-content: start;
      grid-template-columns: 200px 150px 200px 120px 120px 1fr 80px 80px 200px 130px;
      grid-template-rows: 1fr;

      .按钮组 {
        gap: 2px;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
      }
    }

    .充值订单行 {
      gap: 2px;
      justify-content: start;
      grid-template-columns: 200px 1fr 1fr 1fr 1fr 180px;
      grid-template-rows: 1fr;

      .元素 {
        font-size: 18px;
        font-weight: bold;
        background: $浅黄;
      }

      .按钮组 {
        gap: 2px;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;

      }
    }

    .进货订单行 {
      gap: 2px;
      justify-content: start;
      grid-template-columns: 200px 150px 200px 120px 120px 1fr 80px 80px 200px 130px;
      grid-template-rows: 1fr;

      .元素 {
        font-size: 18px;
        font-weight: bold;
        background: $浅黄;
      }

      .按钮组 {
        gap: 2px;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;

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
  background-color: $浅绿;
}

select {
  text-align: center;
  box-sizing: border-box;
  border: none;
  width: 100%;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
  background: $浅绿;
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
  background: $正绿;
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
</style>
