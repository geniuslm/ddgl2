<script setup lang="ts">
import lm菜单 from '@/components/菜单.vue';
import lm内容 from '@组件/内容.vue';
import lm头部 from '@组件/头部.vue';
import { computed } from 'vue';






</script>

<template> 
    <div class="布局">
        <div class="布局头">
            <lm头部 />
        </div>
        <div class="布局中">
            <lm菜单   />
            <lm内容 class="布局中内容" />
        </div>
        <div class="布局脚">
            <div></div>
        </div>
    </div>
</template>


<style scoped>
.布局 {
    display: grid;
    grid-template-rows: 40px 1fr 40px;
    grid-template-columns: 1fr;
    height: 100vh;
    width: 100vw;
    background-color: #FFFFFF;
    gap: 5px;
    color: #000000;
    overflow: hidden;
    
}

.布局头 {
    display: grid;
    grid-template-columns: 1fr;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    background-color: #F0F2F5;
  
}

.布局中 {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr;
    gap: 5px;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    overflow: auto;
}
.布局中内容 {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    background-color: #F0F2F5;
    overflow: auto;
}


.布局脚 {
    display: grid;
    background-color: #F0F2F5
}
</style>
