<script setup lang="ts">

import {useRouter} from 'vue-router';
import {pinia库, 用户类} from '@/stores/pinia库';
import {socket} from "@仓库/socket链接";
import {reactive} from 'vue';
import {设置Cookie} from "@仓库/cookie";
import lmButton from "@组件/按钮.vue";

let 库 = pinia库()
let router = useRouter()
let 用户 = reactive(new 用户类)


function 登录() {

  socket.emit('登录验证', 用户, (返回数据: any) => {

    console.log("登录验证" + 返回数据[0]);

    if (返回数据[0] == "登录成功") {

      库.当前登录用户 = 返回数据[1].用户名
      库.当前登录用户类型 = 返回数据[1].类型
      设置Cookie("当前登录用户", 返回数据[1].用户名, 1)
      设置Cookie("当前登录用户类型", 返回数据[1].类型, 1)
      设置Cookie("token", "通过", 1)
      router.push("/11")
    } else if (返回数据.length == 0) {
      alert('用户名不存在')
    } else if (返回数据 == "密码错误") {
      alert(返回数据)
    } else alert(返回数据)
  })
}


socket.on("connect", () => {
  库.当前数据库状态 = "已连接"
  console.log("数据库已连接");

});
socket.on("disconnect", () => {
  库.当前数据库状态 = "断开连接"
  console.log("数据库链接断开");
});


</script>

<template>
  <div class="登录页" @keyup.enter="登录">
    <div class="左边"></div>
    <div class="右边">
      
      <div class="标题">
        <div class="版本号">V1.12.9</div>
        <div  :class="{ 版本号:true,退出登录: 库.当前数据库状态 != '已连接' }"> 服务器 {{ 库.当前数据库状态 }}</div>
        李默眼镜工作室
        
      </div>

      <input type="text" placeholder="用户名" v-model.lazy="用户.用户名">
      <input type="text" placeholder="密码" v-model.lazy="用户.密码">
      <div class='按钮组'>
        <lmButton  @click="登录" >登录</lmButton>
       
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.登录页 {
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-auto-flow: row;
  grid-template-rows: 1fr;
  grid-template-columns: 1.5fr 1fr;
  align-content: center;
  align-items: center;
  background: #666;
  gap: 10px;

  .按钮组 {
    gap: 10px;
    grid-template-columns: 200px;
    grid-template-rows: 1fr 1fr;
  }
}

.右边 {
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: 1fr 60px 60px 60px 60px 1fr;
  grid-template-columns: 1fr;
  background: #eee;
  box-shadow: 0px 0px 80px rgba(0, 0, 0, 0.8);
  
  .标题 {
    display: grid;
    grid-template-rows: 50px 50px 1fr;
    font-size: 75px;
    font-weight: bold;
    color: #333;

    .版本号 {
      
      justify-self: end;
      font-size: 20px;
      font-weight: bold;
      width: 150px;
      height: 30px;
      border-radius: 10px;
      background-color: #336633;
      color: #ccc;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.8);
    }
    .退出登录{
      background-color: $正红;
      color: #fff;
    }
  }

  
}

input[type="text"] {
  width: 300px; // 输入框宽度
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

input[type="text"]:focus {
  outline: none;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.6);
}


</style>
