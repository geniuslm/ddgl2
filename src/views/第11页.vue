<script setup lang = "ts">
import { pinia数据中心, 镜片类 } from '../stores/pinia数据';
import { pinia库, 订单类 } from '../stores/pinia库';
import lmInput from "@/components/订单行.vue";
import lmh from "@组件/测试行.vue";
import lmSH from "@组件/首行.vue";
import lmButton from "@组件/按钮.vue";
import lmWin from "@组件/添加订单窗口.vue";
import { socket } from "../stores/socket链接";
import { onMounted, ref, toRef, computed, reactive } from 'vue';


let 库 = pinia库();
onMounted(() => {
    库.初始化()
})

let 添加新订单 = () => {
    库.订单正逆序 = 1
    let 新订单 = new 订单类
    let date = new Date()
    let 年 = date.getFullYear().toString().slice(2)
    let 月 = ("0" + (date.getMonth() + 1)).slice(-2)
    let 日 = ("0" + date.getDate()).slice(-2)
    let 最后订单号
    if (库.订单表.length == 0) { 最后订单号 = 年 + 月 + 日 + "00" }
    else { 最后订单号 = 库.订单表[库.订单表.length - 1].订单号 }

    let 订单号 = () => {
        if (最后订单号.slice(0, 6) == 年 + 月 + 日) {
            return (parseInt(最后订单号) + 1).toString()
        }
        else {
            return 年 + 月 + 日 + "01"
        }
    }
    新订单.旺旺名 = "新订单 请输入旺旺名"
    新订单.订单号 = 订单号()
    新订单.镜片 = ""
    新订单.镜框运单号 = ""
    新订单.编辑记录 = []
    新订单.购买记录 = []
    新订单.编辑记录.push(库.月日 + 库.当前登录用户 + '创建#' + JSON.stringify(新订单))
    库.通讯("订单", '增', 新订单)
}



</script>

<template>
    <div class="整页 ">

        <div class="顶部 ">
            <el-button @click="库.订单正逆序 *= -1" type="primary">正逆序{{ 库.订单正逆序 }}</el-button>
            <lmButton @click="添加新订单">添加新订单</lmButton>
            <lmButton> 通过筛选的数量{{ 库.通过筛选的数量 }}</lmButton>
            <input v-model.lazy="库.每页显示的数量" placeholder="每页显示的数量">
            <input v-model.lazy="库.订单全局搜索值" placeholder="全局搜索">
            <lmButton @click="库.当前页 = 库.当前页 + 1">当前页加1</lmButton>
        </div>
        <!-- 表格模块 -->
        <div class="表格">
            <!-- <lmSH></lmSH> -->

            <!-- <lmInput v-for="(i, k) in 库.筛选过的订单" :key="i._id" :行数据="库.筛选过的订单[k]"></lmInput> -->
            <lmInput v-for="(i, k) in 库.筛选过的订单" :key="i._id" :序号="k"></lmInput>

        </div>
        <!-- 分页模块 -->
        <div class="分页 横向">
            <lmButton class=""> 这是第{{ 库.当前页 }} 页</lmButton>
            <div class="分页内">
                <lmButton class="" v-for="(页, index) in 库.订单页数" @click="库.当前页 = index + 1">
                    {{ 页 }}
                </lmButton>
            </div>
            <lmButton class="">一共有{{ 库.订单页数 }}页</lmButton>
        </div>


</div>
</template>



<style  lang="scss" scoped>
.整页 {
    overflow: auto;
    grid-template-rows: auto 1fr auto;

    .表格 {
        align-content: start;
        overflow: auto;
    }
}

.顶部 {
    gap: 3px;
    grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
}

.分页 {
    gap: 3px;
    grid-template-columns: 100px 1fr 100px;

    .分页内 {
        gap: 2px;
        grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
    }
}
</style>