<script setup lang = "ts">
import { useRouter } from 'vue-router';
import { ref, toRefs, reactive, computed, watch, onMounted } from 'vue';
import Icon from './icons/Icon.vue';
import { socket } from "../stores/socket链接";
import { pinia库, 镜片类, 订单类 } from '../stores/pinia库';
import JsBarcode from "jsbarcode";
import { values } from 'lodash';



let 库 = pinia库();
let { 行数据 } = defineProps(['行数据'])

let 镜框列表 = computed(() => {
  let 镜框列表 = '';
  for (let i = 0; i < 行数据.试戴镜框.length; i++) {
    if (i) 镜框列表 += 行数据.试戴镜框[i] + ' ';
  }
  return 镜框列表;
})


</script>

<template>
  <div v-if="库.当前登录用户类型 == '助理'" class="组件整页">
    <div id="盒子标签" class="打印范围">
      <div class="第一行 ">
        <div>{{ 行数据.订单号 }}</div>
        <div>{{ 行数据.收件人 }}</div>
      </div>

      <div class="第二行 ">
        <div>{{ 行数据.镜框选项 }}</div>
        <div>{{ 行数据.旺旺名 }}</div>
      </div>
      <div class="第三行 ">
        <div>
          <Barcode class="条形码" :数值="行数据.订单号"
            :设置="{ format: 'CODE128', width: 1, height: 30, margin: 0, displayValue: false }">
          </Barcode>
        </div>
        <div>{{ 行数据.镜片?行数据.镜片:'还未购买镜片' }}</div>
      </div>
      <div class="光度行">
        <div>{{ 库.日 }}日</div>
        <div>近视 </div>
        <div>散光 </div>
        <div>轴向 </div>
        <div>瞳距 </div>
      </div>
      <div class="光度行">
        <div>右R</div>
        <div>{{ 行数据.右近视 }}</div>
        <div>{{ 行数据.右散光 }}</div>
        <div>{{ 行数据.右轴向 }}</div>
        <div>{{ 行数据.右瞳距 }}</div>
      </div>
      <div class="光度行">
        <div>左L</div>
        <div>{{ 行数据.左近视 }}</div>
        <div>{{ 行数据.左散光 }}</div>
        <div>{{ 行数据.左轴向 }}</div>
        <div>{{ 行数据.左瞳距 }}</div>
      </div>
      <div class="镜框行 ">
        <!-- <div v-for="i in 行数据.试戴镜框">{{ i }}</div> -->
        <div>{{ 镜框列表 }}</div>
      </div>
      <div class="最后行 ">
        <div>{{ 行数据.备注 }}</div>
        <icon 图标名="lm-printer" v-print="'#盒子标签'" 颜色="#67C23A" font-size='30px' />
      </div>
    </div>



    <div id="盒内标签" class="打印范围">
      <div class="第一行 ">
        <div>{{ 行数据.订单号 }}</div>
        <div>亲 请确认 {{ 行数据.旺旺名 }}</div>
      </div>

 
      <div class="第三行 ">
        <div>
          <Barcode class="条形码" :数值="行数据.订单号"
            :设置="{ format: 'CODE128', width: 1, height: 30, margin: 0, displayValue: false }">
          </Barcode>
        </div>
        <div>{{ 行数据.镜片?行数据.镜片:'还未购买镜片' }}</div>
      </div>
      <div class="光度行">
        <div>{{ 库.日 }}日</div>
        <div>近视 </div>
        <div>散光 </div>
        <div>轴向 </div>
        <div>瞳距 </div>
      </div>
      <div class="光度行">
        <div>右R</div>
        <div>{{ 行数据.右近视 }}</div>
        <div>{{ 行数据.右散光 }}</div>
        <div>{{ 行数据.右轴向 }}</div>
        <div>{{ 行数据.右瞳距 }}</div>
      </div>
      <div class="光度行">
        <div>左L</div>
        <div>{{ 行数据.左近视 }}</div>
        <div>{{ 行数据.左散光 }}</div>
        <div>{{ 行数据.左轴向 }}</div>
        <div>{{ 行数据.左瞳距 }}</div>
      </div>
      <div class="第二行 ">
        <div>{{ 行数据.镜框选项 }}</div>
        <div>{{ 镜框列表 }}</div>
      </div>
      <div class="镜框行 ">

        <div>{{ 行数据.备注 }}</div>
      </div>
      <div class="最后行 ">
        <div>这个贴纸请随镜框一起邮寄回来哦</div>
        <icon 图标名="lm-printer" v-print="'#盒内标签'" 颜色="#67C23A" font-size='30px' />
      </div>
    </div>


    <div id="打印范围-蔡司" class="打印范围">
      <div class="第一行 ">
        <div>{{ 行数据.订单号 }}</div>
        <div>李默眼镜工作室</div>
      </div>

      <div class="第二行 ">
        <div>{{ 库.日 }}日送蔡司</div>
        <div>{{ 行数据.旺旺名 }}</div>
      </div>
      <div class="第三行 ">
        <div>
          <Barcode class="条形码" :数值="行数据.订单号"
            :设置="{ format: 'CODE128', width: 1, height: 30, margin: 0, displayValue: false }">
          </Barcode>
        </div>
        <div>{{ 行数据.镜片 }}</div>
      </div>
      <div class="光度行">
        <div></div>
        <div>近视 </div>
        <div>散光 </div>
        <div>轴向 </div>
        <div>瞳距 </div>
      </div>
      <div class="光度行">
        <div>右R</div>
        <div>{{ 行数据.右近视 }}</div>
        <div>{{ 行数据.右散光 }}</div>
        <div>{{ 行数据.右轴向 }}</div>
        <div>{{ 行数据.右瞳距 }}</div>
      </div>
      <div class="光度行">
        <div>左L</div>
        <div>{{ 行数据.左近视 }}</div>
        <div>{{ 行数据.左散光 }}</div>
        <div>{{ 行数据.左轴向 }}</div>
        <div>{{ 行数据.左瞳距 }}</div>
      </div>
      <div class="最后行 ">
        <div>{{ 行数据.备注 }}</div>
        <icon 图标名="lm-printer" v-print="'#打印范围-蔡司'" 颜色="#67C23A" font-size='30px' />
      </div>
    </div>
  </div>


  <div v-if="库.当前登录用户类型 == '客服'" class="客服组件整页">




    <div id="盒内标签" class="打印范围">
      <div class="第一行 ">
        <div>{{ 行数据.订单号 }}</div>
        <div>请确认度数亲 {{ 行数据.旺旺名 }}</div>
      </div>

 
      <div class="第三行 ">
        <div>
          <Barcode class="条形码" :数值="行数据.订单号"
            :设置="{ format: 'CODE128', width: 1, height: 30, margin: 0, displayValue: false }">
          </Barcode>
        </div>
        <div>{{ 行数据.镜片?行数据.镜片:'还未购买镜片' }}</div>
      </div>
      <div class="光度行">
        <div>{{ 库.日 }}日</div>
        <div>近视 </div>
        <div>散光 </div>
        <div>轴向 </div>
        <div>瞳距 </div>
      </div>
      <div class="光度行">
        <div>右R</div>
        <div>{{ 行数据.右近视 }}</div>
        <div>{{ 行数据.右散光 }}</div>
        <div>{{ 行数据.右轴向 }}</div>
        <div>{{ 行数据.右瞳距 }}</div>
      </div>
      <div class="光度行">
        <div>左L</div>
        <div>{{ 行数据.左近视 }}</div>
        <div>{{ 行数据.左散光 }}</div>
        <div>{{ 行数据.左轴向 }}</div>
        <div>{{ 行数据.左瞳距 }}</div>
      </div>
      <div class="第二行 ">
        <div>{{ 行数据.镜框选项 }}</div>
        <div>{{ 镜框列表 }}</div>
      </div>
      <div class="镜框行 ">

        <div>{{ 行数据.备注 }}</div>
      </div>
      <div class="最后行 ">
        <div>亲 请确认度数哦</div>
        <icon 图标名="lm-printer" v-print="'#盒内标签'" 颜色="#67C23A" font-size='30px' />
      </div>
    </div>



  </div>
</template>


<style lang = "scss" scoped>
.组件整页 {
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
}
.客服整页组件{
  grid-template-columns: 1fr;
}

.打印范围 {
  //  position: absolute ;
  z-index: 9;
  box-sizing: border-box;
  // top: 50px;
  width: 400px;
  height: 299px;
  background-color: $背景;
  border: 1px solid $深灰;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr;

  div {
    font-size: 20px;
    border-radius: 0px;
    border: 1px solid $深灰;
  }

  .第一行 {
    grid-template-rows: 1fr;
    grid-template-columns: 120px 1fr;
  }

  .第二行 {
    grid-template-rows: 1fr;
    grid-template-columns: 120px 1fr;
  }

  .第三行 {
    grid-template-rows: 1fr;
    grid-template-columns: 120px 1fr;

    .条形码 {
      //  position: relative ;

      grid-template-rows: 1fr;
      grid-template-columns: 1fr;
    }
  }

  .镜框行 {
    grid-template-rows: 1fr;
    grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
  }

  .最后行 {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 30px;

  }

  .光度行 {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr
  }
}

div {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 0px solid rgb(225, 225, 225);
  border-radius: 5px;
  font-weight: bolder;

}

input {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 0.5px solid rgb(225, 225, 225);
  text-align: center;
  border-radius: 5px;

  font-weight: bolder;
}

input:hover {
  box-sizing: border-box;
  border: 0.5px solid $深灰;
}

input:focus {
  outline: none;
  box-shadow: 0px 0px 3px 1px $深灰;
  z-index: 99;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.纯白 {
  background: $纯白;
}

.白色 {
  background: $纯白;
}

.纯白:hover {
  background: $浅灰;
}

.警告色 {
  background: $正红;
}

.绿色 {
  background: $正绿;
}

.绿色:hover {
  background: $暗绿;
}
</style>
