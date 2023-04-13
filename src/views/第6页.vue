<script setup lang="ts">
import { pinia数据中心 } from '../stores/pinia数据';
import lmInput from "@组件/行.vue";
import lmSH from "@组件/首行.vue";
import lmButton from "@组件/新版按钮.vue";
import { onMounted, ref, watch, computed, reactive } from 'vue';
import { storeToRefs } from 'pinia'
import { pinia库, 镜框类, 镜框订单类 } from "@仓库/pinia库";
import { socket } from "@仓库/socket链接";

let 库 = pinia库();

let 库存记录显示开关 = reactive([]);

//下面是关于镜框库存的
let 添加 = () => {
    let 数据 = new 镜框类()
    socket.emit('镜框', '增', 数据, (返回数据: any) => {
        console.log(返回数据);
        库.镜框表.push(返回数据);
        库.镜框表.sort((a, b) => { return a.镜框名 >= b.镜框名 ? 1 : -1 })
    });
};

let 修改 = (镜框: 镜框类) => {
    socket.emit('镜框', '改', 镜框, (返回数据: any) => {
        console.log(返回数据)
        库.镜框表.sort((a, b) => { return a.镜框名 >= b.镜框名 ? 1 : -1 })
    });
};
let 库存修改 = (镜框: 镜框类) => {
    //添加库存记录
    镜框.库存变更记录.push({
        变更日期: new Date().toLocaleDateString('zh-CN').replace(/\//g, '-'),
        变更后库存: 镜框.库存数量,
        变更原因: '设置库存',
    });
    修改(镜框)
};


let 删除 = (镜框: 镜框类) => {
    socket.emit('镜框', '删', 镜框, (返回数据: any) => {
        console.log(返回数据)
        库.镜框表.splice(库.镜框表.findIndex((行: any) => 行._id == 镜框._id), 1)
        库.镜框表.sort((a, b) => { return a.镜框名 >= b.镜框名 ? 1 : -1 })
    });
};

let 复制 = (镜框: 镜框类) => {
    let 数据 = JSON.parse(JSON.stringify(镜框))
    delete 数据._id;
    delete 数据.库存变更记录;
    数据.库存数量=0;
    数据.库存变更记录= {
        变更日期: new Date().toLocaleDateString(),
        变更数量: 0,
        变更后库存: 0,
        变更原因: "复制",
      }
    socket.emit('镜框', '增', 数据, (返回数据: any) => {
        console.log(返回数据);
        库.镜框表.push(返回数据);
        库.镜框表.sort((a, b) => { return a.镜框名 >= b.镜框名 ? 1 : -1 })
    });
};

let 供货商列表 = computed(() => {
    let 供货商列表 = [];
    for (let 行 of 库.镜框表) {
        if (行.供货商 && !供货商列表.includes(行.供货商)) {
            供货商列表.push(行.供货商);
        }
    }

    return 供货商列表;
})

let 镜框表 = computed(() => {
    return 库.镜框表.sort((a, b) => { return a.镜框名 >= b.镜框名 ? 1 : -1 })
})

</script>

<template>
    <div class="第六页 滑条">
        <lmButton @click="添加()">添加镜框</lmButton>
        <div class="镜框库存表 滑条">
            <div class=" 镜框行">
                <div>镜框名</div>
                <div>供货商</div>
                <div>库存数量</div>
                <div>进货价格</div>
                <div>售价</div>
                <div>详细信息</div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div v-for="镜框, k in 镜框表" :key="镜框表[k]._id">
                <div class="镜框行">
                    <input @change="修改(库.镜框表[k])" :class="{ 正红: !库.镜框表[k].镜框名 }" v-model.lazy="库.镜框表[k].镜框名"
                        placeholder="镜框名" />
                    <input @change="修改(库.镜框表[k])" :class="{ 正红: !库.镜框表[k].供货商 }" v-model.lazy="库.镜框表[k].供货商"
                        placeholder="供货商" list="供货商" />
                    <input @change="库存修改(库.镜框表[k])" :class="{ 正红: !库.镜框表[k].库存数量 }" v-model.lazy="库.镜框表[k].库存数量"
                        placeholder="库存数量" type="number" />
                    <input @change="修改(库.镜框表[k])" :class="{ 正红: !库.镜框表[k].进货价格 }" v-model.lazy="库.镜框表[k].进货价格"
                        placeholder="进货价格" type="number" />
                    <input @change="修改(库.镜框表[k])" :class="{ 正红: !库.镜框表[k].售价 }" v-model.lazy="库.镜框表[k].售价" placeholder="售价"
                        type="number" />
                    <input @change="修改(库.镜框表[k])" v-model.lazy="库.镜框表[k].详细信息" placeholder="详细信息" />
                    <lmButton @click="复制(库.镜框表[k])">复制镜框</lmButton>
                    <lmButton @click="修改(库.镜框表[k])">修改镜框</lmButton>
                    <lmButton @click="删除(库.镜框表[k])">删除镜框</lmButton>
                    <lmButton @click="库存记录显示开关[k] = !库存记录显示开关[k]">库存记录</lmButton>
                </div>
                <div v-if="库存记录显示开关[k]">
                    <div v-for="i in 库.镜框表[k].库存变更记录">{{ i }}</div>
                </div>
            </div>
        </div>
    </div>
    <datalist id="供货商">
        <option v-for="i in 供货商列表" :value=i> {{ i }}</option>
    </datalist>
</template>


<style scoped lang="scss">
.第六页 {
    grid-template-rows: 50px 1fr;
    grid-template-columns: 1fr;
    align-items: start;
    background-color: #F0F2F5;
    gap: 20px;

    .镜框库存表 {
        align-content: start;
        gap: 10px;

        .镜框行 {
            font-size: 18px;
            font-weight: bold;
            gap: 6px;
            grid-template-rows: 1fr;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 80px 80px 80px 80px;
        }
    }


    input {
        text-align: center;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border: none;
        font-size: 18px;
        font-weight: bold;
    }
}
</style>
