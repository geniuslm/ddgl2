<script setup lang="ts">
import { pinia数据中心 } from '../stores/pinia数据';
import lmInput from "@组件/行.vue";
import lmSH from "@组件/首行.vue";
import lmButton from "@组件/新版按钮.vue";
import { onMounted, ref, watch, computed, reactive } from 'vue';
import { storeToRefs } from 'pinia'
import { pinia库, 镜框类, 镜框订单类 } from "@仓库/pinia库";
import { socket } from "@仓库/socket链接";

let 库 = pinia库();

let 状态 = reactive({
  供应商: '',
});


let 添加订单 = () => {
  let 订单 = new 镜框订单类();
  socket.emit('镜框订单', '增', 订单, (返回数据: any) => {
    console.log(返回数据);
    库.镜框订单表.push(返回数据);
    库.镜框订单表.sort((a, b) => { return a.订单日期 >= b.订单日期 ? 1 : -1 })
  });
};

let 删除订单 = (订单: 镜框订单类) => {
  socket.emit('镜框订单', '删', 订单, (返回数据: any) => {
    console.log(返回数据)
    库.镜框订单表.splice(库.镜框订单表.findIndex((行: any) => 行._id == 订单._id), 1)
    库.镜框订单表.sort((a, b) => { return a.订单日期 >= b.订单日期 ? 1 : -1 })
  });
};

let 修改订单 = (订单) => {
  if (库.镜框表.find((行: any) => 行.镜框名 == 订单.镜框名)) {
    let 进货价格 = 库.镜框表.find((行: any) => 行.镜框名 == 订单.镜框名).进货价格;
    let 供货商 = 库.镜框表.find((行: any) => 行.镜框名 == 订单.镜框名).供货商;
    if (进货价格)
      订单.进货价格 = 进货价格;
    else
      alert('请先设置进货价格');
    if (供货商)
      订单.供货商 = 供货商;
    else
      alert('请先设置供货商');
  } else {
    alert('就没这个镜框');
  }
  socket.emit('镜框订单', '改', 订单, (返回数据: any) => {
    console.log(返回数据);
    库.镜框订单表.sort((a, b) => { return a.订单日期 >= b.订单日期 ? 1 : -1 })
  });
};

let 收到订单 = (订单) => {
  if (订单.订单状态 != '已收到') {
    let 镜框对象 = 库.镜框表.find(item => item.镜框名 === 订单.镜框名);
    if (镜框对象) {
      alert(`${镜框对象.镜框名}库存将从${镜框对象.库存数量}变为${Number(镜框对象.库存数量) + Number(订单.订货数量)}`);
      镜框对象.库存数量 = Number(镜框对象.库存数量) + Number(订单.订货数量);
      镜框对象.库存变更记录.push({
        变更日期: new Date().toLocaleDateString(),
        变更数量: 订单.订货数量,
        变更后库存: 镜框对象.库存数量,
        变更原因: '进货',
      });

      订单.订单状态 = '已收到';
      修改(镜框对象);
    }
    socket.emit('镜框订单', '改', 订单, (返回数据: any) => {
      console.log(返回数据);
      库.镜框订单表.sort((a, b) => { return a.订单日期 >= b.订单日期 ? 1 : -1 })
    });
  }
  else {
    alert('已经已收到的 不能重复收到');
  }

};
let 获取库存与供货商 = (订单) => {
  let 镜框对象 = 库.镜框表.find(item => item.镜框名 === 订单.镜框名);
  if (镜框对象) { 订单.供货商 = 镜框对象.供货商; return 镜框对象.库存数量; } else { return 0; }
}

//下面是关于镜框库存的
let 修改 = (镜框: 镜框类) => {
  socket.emit('镜框', '改', 镜框, (返回数据: any) => {
    console.log(返回数据)
    库.镜框表.sort((a, b) => { return a.镜框名 >= b.镜框名 ? 1 : -1 })
  });
};

let 今日订单总价 = computed(() => {
  let 总价 = 0;
  let 今日日期 = new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')
  for (let 行 of 库.镜框订单表) {
    if (行.订单日期 === 今日日期&&行.供货商===状态.供应商&&行.订单状态 !== '已收到') {
      if (行.进货价格 && 行.订货数量)
        总价 = 总价 + 行.进货价格 * 行.订货数量;
    }

  }

  return 总价;
})

let 供货商列表 = computed(() => {
  let 供货商列表 = [];
  for (let 行 of 库.镜框订单表) {
    if (行.供货商 && !供货商列表.includes(行.供货商)) {
      供货商列表.push(行.供货商);
    }
  }

  return 供货商列表;
})


</script>

<template>
  <div class="第六页 滑条">

    <div class="镜框订货表 滑条">
      <div class="首行">
        <lmButton @click="添加订单()">添加订单</lmButton>
     
      </div>
      <div class="订单表">
        <div class="订单行" v-for="i, k in 库.镜框订单表">
          <div>{{ 库.镜框订单表[k].订单日期 }}</div>
          <input v-if="库.镜框订单表[k].订单状态 === '未收到'" @change="修改订单(库.镜框订单表[k])" v-model.lazy="库.镜框订单表[k].镜框名" placeholder="镜框名" list="镜片名" />
          <input v-if="库.镜框订单表[k].订单状态 === '未收到'" @change="修改订单(库.镜框订单表[k])" v-model.lazy="库.镜框订单表[k].订货数量" placeholder="订货数量" type="number" />
          <div v-if="库.镜框订单表[k].订单状态 === '已收到'" > {{ 库.镜框订单表[k].镜框名 }}</div>
          <div v-if="库.镜框订单表[k].订单状态 === '已收到'" > {{ 库.镜框订单表[k].订货数量 }}</div>
          <div>当前库存 {{ 获取库存与供货商(库.镜框订单表[k]) }}</div>
          <div>供货商: {{ 库.镜框订单表[k].供货商 }}</div>
          <div>{{ 库.镜框订单表[k].进货价格 }}元</div>
          <div :class="{ 正红: 库.镜框订单表[k].订单状态 === '未收到', 正绿: 库.镜框订单表[k].订单状态 === '已收到' }">
            {{ 库.镜框订单表[k].订单状态 }}</div>

          <lmButton @click="删除订单(库.镜框订单表[k])">删除</lmButton>
          <lmButton @click="收到订单(库.镜框订单表[k])">收到</lmButton>

        </div>
        <div class="尾行">
          <div></div>
          <input v-model.lazy="状态.供应商" placeholder="供应商" list="供货商" />
          <div>今日{{ 状态.供应商 }} 订单应付总价:{{ 今日订单总价 }}元</div>
        </div>
      </div>
    </div>
  </div>
  <datalist id="镜片名">
    <option v-for="i in 库.镜框名选项" :value=i> {{ i }}</option>
  </datalist>
  <datalist id="供货商">
    <option v-for="i in 供货商列表" :value=i> {{ i }}</option>
  </datalist>
</template>


<style scoped lang="scss">
.第六页 {
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  align-items: start;
  background-color: #F0F2F5;
  gap: 20px;


  .镜框订货表 {
    align-content: start;
    grid-template-rows: 30px 30px 1fr;
    grid-template-columns: 1fr;
    gap: 10px;

    .首行 {
      gap: 6px;
      grid-template-rows: 1fr;
      grid-template-columns: 1fr 0.3fr 0.3fr;
    }

    .尾行 {
      gap: 6px;
      grid-template-rows: 1fr;
      grid-template-columns: 1fr 0.3fr 0.3fr;
    }

    .订单表 {
      gap: 10px;
      align-content: start;
      grid-template-columns: 1fr;
      font-size: 18px;
      font-weight: bold;

      .订单行 {
        gap: 6px;
        background: $浅绿;
        grid-template-rows: 1fr;
        grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
      }
    }

  }

  input {
    text-align: center;
    box-sizing: border-box;
    border: none;
    width: 100%;
    height: 100%;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
