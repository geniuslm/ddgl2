<script setup lang="ts">
import { pinia数据中心 } from '../stores/pinia数据';



let pinia = pinia数据中心()
pinia.获取旧订单()




</script>

<template>
    <div>
        <h1>第一页 图标</h1>

        <icon 图标名="icon-delete" 颜色="#666" font-size='100px' />
        <icon 图标名="icon-home" color="#666" />
        <icon 图标名="icon-close-circle" 颜色="#666" />
        <icon 图标名="icon-copy" 颜色="#666" />
        <icon 图标名="icon-check-circle-fill" 颜色="#666" />
        <icon 图标名="icon-plus-circle-fill" 颜色="#666" />
        <icon 图标名="icon-plus-circle-fill" 颜色="#666" />
        <icon 图标名="icon-plus-circle-fill" 颜色="#666" />
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
