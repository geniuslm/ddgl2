<script setup lang = "ts">
import { useRouter } from 'vue-router';


let 路由 = useRouter()
let 跳转 = (目标页: string) =>{
  路由.push(目标页);
}



</script>

<template>
  <button >
    <slot>LM按钮</slot>
  </button>
</template>


<style scoped>
button {
  display           : grid;
  grid-auto-flow    : column;
  grid-template-rows: 1fr;
  box-sizing        : border-box;
  border            : 2px solid #409EFF;
  width             : 100%;
  border-radius     : 4px;
  padding           : 4px 8px;
  font-family       : Arial;
  font-size         : 14px;
  font-weight       : bold;
  color             : #ffffff;
  height            : 30px;
  overflow          : hidden;
  align-content     : center;
  align-items       : center;
  justify-content   : center;
  justify-items     : center;
  background-color  : #409EFF;
  transition        : all 0.2s;
}

button:hover {

  background-color: #79bbff;
  border          : 2px solid #79bbff;
}

button:active {
  background-color: #337ecc;
  border          : 2px solid #337ecc;
}
</style>
