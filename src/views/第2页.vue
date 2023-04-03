<script setup lang="ts">
import { pinia库, 订单类 } from '@仓库/pinia库';
import lmB from "@组件/按钮.vue";

import { 获取Cookie, 删除Cookie, 设置Cookie } from "@仓库/cookie";
import { ref, computed, reactive } from 'vue';

let 库 = pinia库();
let 新值 = ref("");
let 旧值 = ref("");
let 镜片名片段 = ref("")
let 供应商 = ref("")
let 订单表 = reactive([])
let 订单表计算属性 = computed(() => {
  let 要显示的订单: any = 库.订单表;
  //排序
  要显示的订单 = 要显示的订单.sort((前一个值: any, 后一个值: any) => {
    return (前一个值['订单号'] >= 后一个值['订单号'] ? 1 : -1)
  })
  订单表 = 要显示的订单
  return 要显示的订单

})


let 替换镜片名字 = async () => {
  let 更改数量 = 0
  for (let i in 库.订单表) {
    if (库.订单表[i].镜片 == 旧值.value) {
      库.订单表[i].镜片 = 新值.value;
      await 库.通讯('订单', "改", 库.订单表[i]);
      更改数量 += 1
    }
  }
  console.log("一共更改了" + 更改数量 + "个");

}
let 订单号修正 = async () => {
  let 尾数: string = '01'
  for (let i in 订单表) {


    if (parseInt(i) > 0 && 订单表[i].订单号.slice(0, 6) == 订单表[parseInt(i) - 1].订单号.slice(0, 6)) {
      尾数 = ('0' + (parseInt(尾数) + 1).toString()).slice(-2)
      订单表[i].订单号 = 订单表[i].订单号.slice(0, 6) + 尾数;
    }
    else {
      尾数 = '01'
      订单表[i].订单号 = 订单表[i].订单号.slice(0, 6) + 尾数;
    }

    库.通讯('订单', "改", 库.订单表[i]);

  }
}
let 订单进度 = async () => {
  let 更改数量 = 0
  for (let i in 库.订单表) {
    // if (库.订单表[i].订单完成日 == '未完成') { 
    //   库.订单表[i].订单完成日=''
    // }
    // 更改数量 += 1
    if (parseInt(库.订单表[i].订单号) < 23020101) {
      库.订单表[i].订单完成日 = 库.订单表[i].订单号.slice(2, 4) + '月' + 库.订单表[i].订单号.slice(4, 6) + '日'
      更改数量 += 1
    }



    await 库.通讯('订单', "改", 库.订单表[i]);
  }
  console.log("一共更改了" + 更改数量 + "个");
}

let 旺旺号判定 = (行数据) => {
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

let 购买记录 = async () => {
  for (let i in 库.订单表) {

    旺旺号判定(库.订单表[i])
    console.log(库.订单表[i].购买记录.length);

    库.通讯('订单', "改", 库.订单表[i]);

  }
}

let log不在表镜片 = () => {
  for (let i in 库.订单表) {
    // if (!库.镜片名选项.includes(库.订单表[i].镜片) && 库.订单表[i].镜片 != null) {
    //   console.log(库.订单表[i].镜片);
    // }
    if (!库.订单表[i].镜片利润 && 库.订单表[i].镜片 != null) {
      console.log(库.订单表[i].镜片);
    }
  }
}



let 各种设置 = () => {

  console.log('各种设置');
  
}

let new订单 = () => {
  console.log(new (订单类));

}


</script>

<template>
  <div class="第三页">
    <h1>这是第2页测试{{ 订单表计算属性.length }}</h1>
    <div class="首行">
      <lmB @click="替换镜片名字()">替换镜片名字</lmB>
      <lmB @click="订单号修正()">订单号修正</lmB>
      <lmB @click="订单进度()">订单进度修改</lmB>
      <lmB @click="购买记录()">购买记录</lmB>
      <lmB @click="log不在表镜片()">log不在表镜片</lmB>
      <lmB @click="new订单()">new订单</lmB>
      <lmB @click="各种设置()">各种设置</lmB>
    </div>
    <div class="横向 平均行">
      <input v-model.lazy="新值" placeholder="新值" list="镜片名">
      <input v-model.lazy="旧值" placeholder="旧值">
      <input v-model.lazy="镜片名片段" placeholder="镜片名片段" list="镜片名">
      <input v-model.lazy="供应商" placeholder="供应商" list="镜片供应商">
  
    </div>
    <div class="滑条 开始">
      <div v-for=" i in  订单表">{{ i.订单号 }} {{ i.试戴镜框[0] }}-{{ i.选定镜框}}</div>
    </div>
  </div>
  <datalist id="镜片名">
    <option v-for="i in 库.镜片名选项">{{ i }}</option>
  </datalist>
  <datalist id="镜片供应商">
    <option>湖北和益</option>
    <option>山东臻视</option>
    <option>上海老周</option>
    <option>湖北蔡司</option>
    <option>丹阳夏总</option>
  </datalist>
</template>

<style scoped lang="scss">
.列表 {
  height: 200px;
}

.第三页 {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40px 40px 40px auto;
  gap: 2px;
  align-content: start;
  align-items: center;
  justify-content: center;
  justify-items: center;
  overflow: auto;
  background-color: #F0F2F5
}

.首行 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(20px, 32px));
  gap: 5px;
  align-content: start;
  align-items: center;
  justify-content: center;
  justify-items: center;
  overflow: auto;
  background-color: #F0F2F5
}

.开始 {
  align-content: start;
}
</style>
