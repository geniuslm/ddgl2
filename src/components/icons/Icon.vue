<template>
    <svg @mouseover="图标大小='100px'" @mouseout="图标大小='50px'" class="svg图标" aria-hidden="true"  :font-size=图标大小>
        <use :xlink:href="'#'+props.图标名" :fill="颜色" />
    </svg>
   
</template>

<script setup lang="ts">
import { computed,ref } from "vue";
/*图标组件
接收参数  
color:图标的颜色 fill填充有颜色则不生效 要先去色才能生效 default: "currentColor" 默认为当前颜色
*/
const props = defineProps({
    图标名: { type: String, required: true },
    图标类名: { type: String, default: "" },
    颜色: { type: String, default: "currentColor" },
});
let 图标大小=ref("50px")


</script>

<style scoped>
.svg图标 {
    width: 1em;
    height: 1em;
    position: relative;
    fill: currentColor;
}


</style>
