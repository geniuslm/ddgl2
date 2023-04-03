<script setup lang="ts">
import { pinia库, 订单类 } from '@仓库/pinia库';
import lmB from "@组件/按钮.vue";
import { 获取Cookie, 删除Cookie, 设置Cookie } from "@仓库/cookie";
import { ref, onMounted } from 'vue';
import html2canvas from 'html2canvas';
import DDH from "@组件/订单行.vue";



let 库 = pinia库();
let 测试 = () => {
  let date = new Date()
  //格式化日期时间
  let 日期 = date.toLocaleString()
  console.log(日期);
}

const data = {
  name: 'Alice',
  age: 30,
};

const saveToFile = () => {
  const json = JSON.stringify(库.订单表, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  let date = new Date()
  let 日期 = date.toLocaleString()
  日期 = 日期.replace(/:/g, "-")
  日期 = 日期.replace(/\//g, "-")
  link.download = `${日期} 备份.json`;
  link.click();
  URL.revokeObjectURL(url);
};


const targetDiv = ref<HTMLDivElement | null>(null);
async function saveDivToClipboard() {
  if (!targetDiv.value) return;

  try {
    // 将 div 转换为 canvas
    const canvas = await html2canvas(targetDiv.value);

    // 将 canvas 转换为 Blob
    canvas.toBlob(async (blob) => {
      if (!blob) return;

      // 使用 Clipboard API 将 Blob 写入粘贴板
      try {
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        alert('图片已保存到粘贴板');
      } catch (error) {
        console.error('无法将图片写入粘贴板：', error);
      }
    });
  } catch (error) {
    console.error('无法将 div 转换为图片：', error);
  }
}


</script>

<template>
  <div class="第三页">
    <h1>保存</h1>
    <lmB @click="测试()">测试</lmB>
    <lmB @click="saveToFile()">saveToFile</lmB>

    <div>
      <div ref="targetDiv" class="div-to-image">
        <div>哈哈哈哈</div>

      </div>
      <button @click="saveDivToClipboard">保存到粘贴板</button>
    </div>
  </div>
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
  background-color: $背景;
}
</style>
