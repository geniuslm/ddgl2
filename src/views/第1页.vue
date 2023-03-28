<script setup lang="ts">
import { pinia数据中心 } from '../stores/pinia数据';
import { ref } from 'vue';




let pinia = pinia数据中心()
pinia.获取旧订单()

let hover = () => {

}
let 图标大小 = ref("30px")

</script>

<template>
    <div>
    <!-- <h1>第一页 图标</h1>

    <icon 图标名="lm-delete" 颜色="#666" font-size='100px' />
    <icon 图标名="lm-home" color="#666" />
    <icon 图标名="lm-close-circle" 颜色="#666" />
    <icon 图标名="lm-copy" 颜色="#666" />
    <icon 图标名="lm-check-circle-fill" 颜色="#666" />
    <icon 图标名="lm-plus-circle-fill" 颜色="#666" />
    <icon 图标名="lm-plus-circle-fill" 颜色="#666" />
    <icon 图标名="lm-plus-circle-fill" 颜色="#666" />
    <Barcode :数值="'123456'" :设置="{ format: 'CODE128',width:1,height:25,  margin: 0 ,displayValue: false}"></Barcode>


    <icon @mouseover="图标大小 = '50px'" @mouseout="图标大小 = '30px'" 图标名="lm-interation-fill" 颜色="#666" :font-size=图标大小 /> -->
    <!-- <el-row class="mb-4">
            <el-button>Default</el-button>
            <el-button type="primary">Primary</el-button>
            <el-button type="success">Success</el-button>
            <el-button type="info">Info</el-button>
            <el-button type="warning">Warning</el-button>
            <el-button type="danger">Danger</el-button>   
        </el-row>
        <el-row class="mb-4">
            <lmb 提示="写一组按钮">Default</lmb>
            <lmb 颜色="绿色">Primary</lmb>
            <lmb>Success</lmb>
            <lmb>Info</lmb>
            <lmb>Warning</lmb>
            <lmb>Danger</lmb>
            <lmb>Primary</lmb>
        </el-row>
        <el-row class="mb-4">
            <el-button plain>Plain</el-button>
            <el-button type="primary" plain>Primary</el-button>
            <el-button type="success" plain>Success</el-button>
            <el-button type="info" plain>Info</el-button>
            <el-button type="warning" plain>Warning</el-button>
            <el-button type="danger" plain>Danger</el-button>
        </el-row>

        <el-row class="mb-4">
                    <el-button round>Round</el-button>
                        <el-button type="primary" round>Primary</el-button>
                            <el-button type="success" round>Success</el-button>
                            <el-button type="info" round>Info</el-button>
                            <el-button type="warning" round>Warning</el-button>
                            <el-button type="danger" round>Danger</el-button>
                        </el-row>

                        <el-row>
                            <el-button :icon="Search" circle />
                            <el-button type="primary" :icon="Edit" circle />
                            <el-button type="success" :icon="Check" circle />
                            <el-button type="info" :icon="Message" circle />
                            <el-button type="warning" :icon="Star" circle />
                            <el-button type="danger" :icon="Delete" circle />
                        </el-row>
                        <lmb 提示="写一组按钮">Default</lmb> -->
    </div>
</template>


<style scoped lang="scss">
div {
    display: grid;
    font-size: 50px;
    color: #25bf2f;
    grid-auto-flow: row;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-template-rows: 1fr 1fr 1fr;
    gap: 5px;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    overflow: auto;
    background-color: #F0F2F5
}
</style>
