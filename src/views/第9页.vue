<script setup lang = "ts">
 
import { pinia库, 订单类,镜片类 } from '../stores/pinia库';
import lmH from "@组件/用户行V2.vue";
import lmh from "@/components/菜单客服.vue";
import lmSH from "@组件/首行.vue";
import lmButton from "@组件/按钮.vue";
import lmWin from "@组件/添加订单窗口.vue";
import { socket } from "../stores/socket链接";
import { onMounted, ref, toRef, computed, reactive, watch } from 'vue';


let 库 = pinia库();
onMounted(() => {
   
})

let 测试 = () => {}
let 添加 = () => {
    let 新镜片 = new 镜片类
    新镜片.镜片名 = "新镜片"
    库.通讯("订单", '增', 新镜片)
}
watch(库.用户表, (newValue, oldValue) => {

    console.log('newValue呵呵 ' + JSON.stringify(newValue))
    console.log('oldValue ' + JSON.stringify(oldValue))
    console.log('newValue ' + newValue)
    console.log('oldValue ' + oldValue)
}, { deep: true })

</script>

<template>

    <div class="整页 ">

        <div class="顶部 ">
            <lmButton @click="测试">测试</lmButton>
            <lmButton @click="添加">添加</lmButton>
        </div>
        <!-- 表格模块 -->
        <div class="表格">
            <!-- <lmSH></lmSH> -->

            <lmH v-for="(i, k) in 库.用户表" :key="i._id" :序号="k"></lmH>

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
        overflow: auto;
    }
}

.顶部 {
    gap: 5px;
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