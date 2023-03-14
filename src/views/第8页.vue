<script setup lang = "ts">
import { pinia库, 订单类, 镜片类 } from '../stores/pinia库';
import lmH from "@组件/镜片行V2.vue";
import lmButton from "@组件/按钮.vue";
import { onMounted, ref, toRef, computed, reactive, watch } from 'vue';


let 库 = pinia库();
onMounted(() => {
   
    库.镜片搜索值 = new 镜片类
    delete 库.镜片搜索值._id
})

let 测试 = () => {
}

let 添加镜片 = () => { 
    let 新镜片=new 镜片类
    新镜片.镜片名="A新镜片"
    新镜片.高散定制=""
    新镜片.染色变色=""
    库.通讯("镜片", "增", 新镜片) 
}
let 镜片keys = Object.keys(new 镜片类).slice(1)

let 排序 = (k: any) => {
    库.镜片排序的属性 = k;
    库.镜片正逆序 = 库.镜片正逆序 * -1
}

</script>

<template>

    <div class="整页 ">

        <div class="顶部 ">
            <lmButton @click="测试">测试</lmButton>
            <lmButton @click="添加镜片">新建<icon 图标名="lm-plus-circle-fill" font-size='20px' /></lmButton>
        </div>
        <!-- 表格模块 -->
        <div class="表格">
            <div class="搜索按钮">以{{ 库.镜片排序的属性 }}排序</div>
            <div class="横向 镜片行">
                <input class="搜索按钮" v-for="(i, k) in 库.镜片搜索值" v-model="库.镜片搜索值[k]" :placeholder="k">
            </div>
            <div class="横向 镜片行">
                <lmButton @click="排序(k)" v-for="(i, k) in 库.镜片搜索值">
                    <icon 图标名="lm-sort-ascending" font-size='30px' />
                </lmButton>
            </div>


            <lmH v-for="(i, k) in 库.排序过的镜片" :key="i._id" :序号="k"></lmH>




        </div>
    </div>
</template>



<style  lang="scss" scoped>
.整页 {
    overflow: auto;
    grid-template-rows: auto 1fr auto;
    gap: 8px;

    .表格 {
        gap: 3px;
        align-content: start;
        grid-template-rows:  40px 40px auto;
        overflow: auto;
    }
}

.搜索按钮 {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: 0.5px solid rgb(225, 225, 225);
    text-align: center;
    border-radius: 5px;
    background-color: $正蓝;
    font-size: 14px;
    font-weight: bold;
}

.搜索按钮::placeholder {
    color: $纯白;
    font-size: 14px;
    font-weight: bold;
}

.顶部 {
    gap: 5px;
    grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
}
</style>