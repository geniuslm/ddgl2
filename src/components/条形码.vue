<template>
    <canvas id="my-barcode"></canvas>
</template>
  
<script   lang="ts"  setup>
import { 设置Cookie } from "@/stores/cookie";
import JsBarcode from "jsbarcode";
import { onMounted } from "vue";

let { 数值,设置 } = defineProps(["数值","设置"])

onMounted(() => {
    JsBarcode("#my-barcode", 数值, 设置);
});
</script>


<style lang = "scss" scoped>
#my-barcode {
  left: 0;
}
</style>