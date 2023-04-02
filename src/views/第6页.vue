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


let 添加订单 = () => {
    let 订单 = new 镜框订单类();
    socket.emit('镜框订单', '增', 订单, (返回数据: any) => {
        console.log(返回数据);
        库.镜框订单表.push(返回数据);
        库.镜框订单表.sort((a, b) => { return a.订单日期 >= b.订单日期 ? 1 : -1 })
    });
};

let 删除订单 = (订单: 镜框订单类) => {
    socket.emit('镜框订单', '删', 订单, (返回数据: any) => {
        console.log(返回数据)
        库.镜框订单表.splice(库.镜框订单表.findIndex((行: any) => 行._id == 订单._id), 1)
        库.镜框订单表.sort((a, b) => { return a.订单日期 >= b.订单日期 ? 1 : -1 })
    });
};

let 修改订单 = (订单) => {
    if (库.镜框表.find((行: any) => 行.镜框名 == 订单.镜框名)) {
        订单.进货价格 = 库.镜框表.find((行: any) => 行.镜框名 == 订单.镜框名).进货价格;
    } else {
        //警告
        alert('请先设置进货价格');
    }
    socket.emit('镜框订单', '改', 订单, (返回数据: any) => {
        console.log(返回数据);
        库.镜框订单表.sort((a, b) => { return a.订单日期 >= b.订单日期 ? 1 : -1 })
    });
};
let 收到订单 = (订单) => {
    if (订单.订单状态 != '已收到') {
        let 镜框对象 = 库.镜框表.find(item => item.镜框名 === 订单.镜框名);
        if (镜框对象) {
            镜框对象.库存数量 = Number(镜框对象.库存数量) + Number(订单.订货数量);
            镜框对象.库存变更记录.push({
                变更日期: new Date().toLocaleDateString(),
                变更数量: 订单.订货数量,
                变更后库存: 镜框对象.库存数量,
                变更原因: '进货',
            });

            订单.订单状态 = '已收到';
            修改(镜框对象);
        }
    }
    socket.emit('镜框订单', '改', 订单, (返回数据: any) => {
        console.log(返回数据);
        库.镜框订单表.sort((a, b) => { return a.订单日期 >= b.订单日期 ? 1 : -1 })
    });
};


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
    socket.emit('镜框', '增', 数据, (返回数据: any) => {
        console.log(返回数据);
        库.镜框表.push(返回数据);
        库.镜框表.sort((a, b) => { return a.镜框名 >= b.镜框名 ? 1 : -1 })
    });
};

</script>

<template>
    <div class="第六页 滑条">
        <lmButton @click="添加()">添加镜框</lmButton>
        <div> {{ 库.镜框表 }}
        </div>
        <div class="镜框库存表 滑条">
            <div class=" 镜框行">
                <div>镜框名</div>
                <div>详细信息</div>
                <div>供货商</div>
                <div>库存数量</div>
                <div>进货价格</div>
                <div>售价</div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div v-for="镜框, k in 库.镜框表" :key="库.镜框表[k].售价">
                <div class="镜框行">
                    <input @change="修改(库.镜框表[k])" v-model.lazy="库.镜框表[k].镜框名" placeholder="镜片名" />
                    <input @change="修改(库.镜框表[k])" v-model.lazy="库.镜框表[k].详细信息" placeholder="详细信息" />
                    <input @change="修改(库.镜框表[k])" v-model.lazy="库.镜框表[k].供货商" placeholder="供货商" />
                    <input @change="修改(库.镜框表[k])" v-model.lazy="库.镜框表[k].库存数量" placeholder="库存数量" />
                    <input @change="修改(库.镜框表[k])" v-model.lazy="库.镜框表[k].进货价格" placeholder="进货价格" />
                    <input @change="修改(库.镜框表[k])" v-model.lazy="库.镜框表[k].售价" placeholder="售价" />
                    <div>{{  }}</div>
                    <lmButton @click="复制(库.镜框表[k])">复制镜框</lmButton>
                    <lmButton @click="修改(库.镜框表[k])">修改镜框</lmButton>
                    <lmButton @click="删除(库.镜框表[k])">删除镜框</lmButton>
                </div>
                <div v-for="i in 库.镜框表[k].库存变更记录">{{ i }}</div>
            </div>

        </div>
        <div class="镜框订货表 滑条">
            <div class="首行">
                <lmButton @click="添加订单()">添加订单</lmButton>
                <lmButton>收到</lmButton>

            </div>
            <div>{{ 库.镜框名选项 }}</div>
            <div class="订单表">
                <div class="订单行" v-for="i, k in 库.镜框订单表">
                    <input @change="修改订单(库.镜框订单表[k])" v-model.lazy="库.镜框订单表[k].订单日期" placeholder="订单日期" />
                    <input @change="修改订单(库.镜框订单表[k])" v-model.lazy="库.镜框订单表[k].镜框名" placeholder="镜框名" list="镜片名" />
                    <input @change="修改订单(库.镜框订单表[k])" v-model.lazy="库.镜框订单表[k].订货数量" placeholder="订货数量" />
                    <input @change="修改订单(库.镜框订单表[k])" v-model.lazy="库.镜框订单表[k].进货价格" placeholder="进货价格" />
                    <input @change="修改订单(库.镜框订单表[k])" v-model.lazy="库.镜框订单表[k].订单状态" placeholder="订单状态" />
                    <lmButton @click="删除订单(库.镜框订单表[k])">删除</lmButton>
                    <lmButton @click="收到订单(库.镜框订单表[k])">收到</lmButton>

                </div>
            </div>
        </div>
    </div>
    <datalist id="镜片名">
        <option v-for="i in 库.镜框名选项" :value=i> {{ i }}</option>
    </datalist>
</template>


<style scoped lang="scss">
.第六页 {
    grid-template-rows: 50px 1fr 2fr 2fr;
    grid-template-columns: 1fr;
    align-items: start;
    background-color: #F0F2F5;
    gap: 20px;

    .镜框库存表 {
        align-content: start;
        gap: 10px;

        .镜框行 {
            gap: 6px;
            grid-template-rows: 1fr;
            grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
        }
    }

    .镜框订货表 {
        align-content: start;
        grid-template-rows: 30px 30px 1fr;
        grid-template-columns: 1fr;
        gap: 10px;

        .首行 {
            gap: 6px;
            grid-template-rows: 1fr;
            grid-template-columns: 1fr 1fr;
        }

        .订单表 {
            gap: 10px;
            align-content: start;
            grid-template-columns: 1fr;

            .订单行 {
                gap: 6px;
                grid-template-rows: 1fr;
                grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
            }
        }

    }

    input {
        text-align: center;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }
}
</style>
