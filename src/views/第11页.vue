<script setup lang = "ts">
import { pinia数据中心, 镜片类 } from '../stores/pinia数据';
import { pinia库, 订单类 } from '../stores/pinia库';
import lmInput from "@/components/订单行.vue";
import lmh from "@/components/菜单客服.vue";
import lmSH from "@组件/首行.vue";
import lmButton from "@组件/按钮.vue";
import lmWin from "@组件/添加订单窗口.vue";
import { socket } from "../stores/socket链接";
import { onMounted, ref, toRef, computed, reactive, watch, nextTick } from 'vue';
import { log } from 'console';


let 库 = pinia库();
onMounted(() => {
    //库.初始化()
})
socket.on("广播", 接收数据 => {
    if (接收数据[0] == '改') {
        for (let i in 库.订单表) {
            if (库.订单表[i]._id == 接收数据[1]._id) {
                库.订单表[i] = 接收数据[1]
            }
        }
    }
    if (接收数据[0] == '增') {
        库.订单表.push(接收数据[1])
    }
    if (接收数据[0] == '删') {
        库.订单表.splice(库.订单表.findIndex((行: any) => 行._id == 接收数据[1]._id), 1)
    }
    console.log(接收数据[0], 接收数据[1]);
})



let 订单表总页数 = ref()
let 每页显示数量 = ref(50)
let 订单表当前页 = ref(1)
let 订单排序正反 = ref(-1)
let 订单排序属性 = ref("订单号")
let 订单时间分类 = ref("全部")
let 订单状态分类 = ref("未完成")
let 订单全局搜索 = ref("")
let 未订片开关 = ref(false)
let 框未回开关 = ref(false)
let 通过全局搜索的数量 = ref()
let 刷新表格 = ref(true)


let 订单表 = computed(() => {
    let 要显示的订单: any = 库.订单表;
    //let 要搜索的值: any = 订单搜索值;
    let 序号: any
    let date = new Date();
    let 年 = date.getFullYear().toString().slice(2)
    let 月 = ("0" + (date.getMonth() + 1)).slice(-2)
    let 日 = ("0" + date.getDate()).slice(-2)
    //订单分类 时间
    if (订单时间分类.value == '本年') {
        要显示的订单 = 要显示的订单.filter((行: any) => {
            return 行.订单号.slice(0, 2) == 年
        })
    }
    if (订单时间分类.value == '本月') {
        要显示的订单 = 要显示的订单.filter((行: any) => {
            return 行.订单号.slice(0, 4) == 年 + 月
        })
    }
    if (订单时间分类.value == '本日') {
        要显示的订单 = 要显示的订单.filter((行: any) => {
            return 行.订单号.slice(0, 6) == 年 + 月 + 日
        })
    }
    //按时间筛选订单 = 要显示的订单
    //订单分类 状态
    if (订单状态分类.value == '未完成') {
        要显示的订单 = 要显示的订单.filter((行: any) => {
            return 行.订单进度 != '已完成'
        })
    }
    if (订单状态分类.value == '已完成') {
        要显示的订单 = 要显示的订单.filter((行: any) => {
            return 行.订单进度 == '已完成'
        })
    }

    if (未订片开关.value == true) {
        要显示的订单 = 要显示的订单.filter((行: any) => {
            return 行.订单进度 != '已完成' && (!行.镜片供应商) && 行.镜片 != ''
        })
    }
    if (框未回开关.value == true) {
        要显示的订单 = 要显示的订单.filter((行: any) => {
            return 行.镜框备好日 == '' && 行.镜框发货日 != ''
        })
    }


    //全局搜索
    if (订单全局搜索.value) {
        要显示的订单 = 要显示的订单.filter((行: any) => {       //过滤出要显示的订单           
            return Object.keys(行).some((key) => {   // key是行的每个属性名，some是检查行的属性是否有搜索的值
                return String(行[key]).indexOf(订单全局搜索.value) > -1
            })
        })
    }
    //分属性搜索
    // for (序号 in 要搜索的值) {
    //     if (要搜索的值[序号]) {
    //         console.log("在 " + 序号 + " 中搜索 " + 要搜索的值[序号])
    //         要显示的订单 = 要显示的订单.filter((行: any) => {
    //             return String(行[序号]).indexOf(要搜索的值[序号]) >= 0
    //         })
    //     }
    // }
    通过全局搜索的数量.value = 要显示的订单.length


    //排序
    要显示的订单 = 要显示的订单.sort((前一个值: any, 后一个值: any) => {
        return (前一个值[订单排序属性.value] >= 后一个值[订单排序属性.value] ? 1 : -1) * 订单排序正反.value
    })
    //分页模块
    订单表总页数.value = Math.ceil(要显示的订单.length / 每页显示数量.value)
    要显示的订单 = 要显示的订单.slice((订单表当前页.value - 1) * 每页显示数量.value, 订单表当前页.value * 每页显示数量.value)

    return 要显示的订单

})





let 添加新订单 = () => {
    库.订单正逆序 = 1
    let 新订单 = new 订单类
    let date = new Date()
    let 年 = date.getFullYear().toString().slice(2)
    let 月 = ("0" + (date.getMonth() + 1)).slice(-2)
    let 日 = ("0" + date.getDate()).slice(-2)
    let 最后订单号: any
    if (库.订单表.length == 0) { 最后订单号 = 年 + 月 + 日 + "00" }
    else { 最后订单号 = 库.订单表[库.订单表.length - 1].订单号 }

    let 订单号 = () => {
        if (最后订单号.slice(0, 6) == 年 + 月 + 日) {
            return (parseInt(最后订单号) + 1).toString()
        }
        else {
            return 年 + 月 + 日 + "01"
        }
    }
    新订单.旺旺名 = "请输入旺旺名"
    新订单.订单号 = 订单号()

    //新订单.镜片下单日 = "未下单"        //
    新订单.编辑记录 = []
    新订单.购买记录 = []
    新订单.编辑记录.push(库.月日 + 库.当前登录用户 + '创建#' + JSON.stringify(新订单))
    socket.emit('订单', '增', 新订单, (返回数据: any) => {
        console.log(返回数据);
        库.订单表.push(返回数据);
        window.location.reload()
    });

}


let 本年订单数量 = computed(() => 库.订单表.filter((行: any) => { return 行.订单号.slice(0, 2) == 库.年 }).length)
let 本月订单数量 = computed(() => 库.订单表.filter((行: any) => { return 行.订单号.slice(0, 4) == 库.年 + 库.月 }).length)
let 本日订单数量 = computed(() => 库.订单表.filter((行: any) => { return 行.订单号.slice(0, 6) == 库.年 + 库.月 + 库.日 }).length)
let 已完成订单数量 = computed(() => 库.订单表.filter((行: any) => { return 行.订单进度 == "已完成" }).length)
let 未完成订单数量 = computed(() => 库.订单表.filter((行: any) => { return 行.订单进度 != "已完成" }).length)
let 未订片订单数量 = computed(() => 库.订单表.filter((行: any) => { return 行.订单进度 != '已完成' && (!行.镜片供应商) && 行.镜片 != '' }).length)
let 框未回订单数量 = computed(() => 库.订单表.filter((行: any) => { return 行.镜框备好日 == '' && 行.镜框发货日 != '' }).length)
let 全部订单数量 = computed(() => 库.订单表.length)


</script>

<template>
    <div class="整页 ">

        <div class="顶部 ">
            <div class="按钮组">
                <div @click="订单排序正反 = 1" :class="{ 选中按钮: 订单排序正反 == 1 }" class="按钮">
                    <icon 图标名="lm-arrowdown" 颜色="#FFF" font-size='20px' />
                </div>
                <div @click="订单排序正反 = -1" :class="{ 选中按钮: 订单排序正反 == -1 }" class="按钮">
                    <icon 图标名="lm-arrowup" 颜色="#FFF" font-size='20px' />
                </div>
            </div>
            <div class="按钮组">
                <div @click="订单时间分类 = '全部', 库.当前页 = 1" :class="{ 选中按钮: 订单时间分类 == '全部' }" class="按钮">全部{{ 全部订单数量 }}
                </div>
                <div @click="订单时间分类 = '本年', 库.当前页 = 1" :class="{ 选中按钮: 订单时间分类 == '本年' }" class="按钮">本年{{ 本年订单数量 }}
                </div>
                <div @click="订单时间分类 = '本月', 库.当前页 = 1" :class="{ 选中按钮: 订单时间分类 == '本月' }" class="按钮">本月{{ 本月订单数量 }}
                </div>
                <div @click="订单时间分类 = '本日', 库.当前页 = 1" :class="{ 选中按钮: 订单时间分类 == '本日' }" class="按钮">本日{{ 本日订单数量 }}
                </div>
            </div>
            <div class="按钮组">
                <div @click="订单状态分类 = '已完成', 库.当前页 = 1" :class="{ 选中按钮: 订单状态分类 == '已完成' }" class="按钮">已完成{{ 已完成订单数量 }}
                </div>
                <div @click="订单状态分类 = '未完成', 库.当前页 = 1" :class="{ 选中按钮: 订单状态分类 == '未完成' }" class="按钮">未完成{{ 未完成订单数量 }}
                </div>
                <div @click="未订片开关 = !未订片开关, 库.当前页 = 1" :class="{ 选中按钮: 未订片开关 == true }" class="按钮">未定片{{ 未订片订单数量 }}
                </div>
                <div @click="框未回开关 = !框未回开关, 库.当前页 = 1" :class="{ 选中按钮: 框未回开关 == true }" class="按钮">框未回{{ 框未回订单数量 }}
                </div>
            </div>
            <div></div>
            <!-- <div class="筛选数字">{{ 订单表.length }}</div> -->


            <div></div>
            <div class="搜索">
                <input class="搜索框" @change="库.当前页 = 1" v-model.lazy="订单全局搜索" placeholder="全局搜索">
                <icon 图标名="lm-close-circle-fill" @click="订单全局搜索 = ''" 颜色="#FFF" font-size='25px' />
                <div v-show="订单全局搜索 != ''" class="搜索数量" 通过筛选数量> {{ 通过全局搜索的数量 }}</div>
            </div>
            <div class="添加" @click="添加新订单">添加新订单
                <icon 图标名="lm-plus-circle-fill" @click="库.订单全局搜索值 = ''" 颜色="#fff" font-size='25px' />
            </div>

        </div>
        <!-- 表格模块 -->
        <div class="表格">

            <lmInput v-for="(i, k) in 订单表 " :key="i._id" :行数据="订单表[k]"></lmInput>

        </div>
        <!-- 分页模块 -->
        <div class="分页 横向">
            <lmButton @click="订单表当前页 -= 1" class=""> 当前第{{ 订单表当前页 }} 页</lmButton>
            <div class="分页内">
                <lmButton :class="{ 页: 订单表当前页 == 页 }" v-for="(页, index) in 订单表总页数" @click="订单表当前页 = index + 1">
                    {{ 页 }}
                </lmButton>
            </div>
            <lmButton @click="订单表当前页 += 1" class="">一共有{{ 订单表总页数 }}页</lmButton>
        </div>

    </div>
</template>



<style  lang="scss" scoped>
.整页 {
    overflow: auto;
    gap: 3px;
    grid-template-rows: auto 1fr auto;

    .顶部 {
        gap: 10px;
        height: 35px;
        grid-template-columns: 80px 300px 450px 45px 1fr 200px 150px;
        grid-template-rows: 1fr;

        .按钮组 {
            gap: 1px;
            background: $浅灰;
            border-radius: 5px;
            grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
            grid-template-rows: 1fr;

            .按钮 {
                background-color: $浅灰;
                color: $纯白;
                font-weight: bold;
                grid-auto-flow: column;


                transition: all 0.3s;

                &:first-child {
                    border-radius: 5px 0px 0px 5px;
                }

                &:last-child {
                    border-radius: 0px 5px 5px 0px;
                }

                &:hover {
                    background-color: $正绿;
                }
            }

            .选中按钮 {
                background-color: $正绿;
            }

        }

        .筛选数字 {
            font-size: large;
            color: $浅灰;
            font-weight: bold;
            border-radius: 5px;

        }

        .搜索 {
            background-color: $正绿;
            color: $纯白;
            font-weight: bold;
            grid-template-rows: 1fr;
            grid-template-columns: 1fr 30px 30px;
            border-radius: 5px;

            .搜索框 {
                border: none;
                height: 100%;
                width: 100%;
                color: $纯白;
                font-weight: bold;
                font-size: large;
                background-color: $正绿;
                border-radius: 5px;
                text-align: center;

            }

        }

        .添加 {
            background-color: $正绿;
            color: $纯白;
            font-size: large;
            font-weight: bold;
            grid-auto-flow: column;
            border-radius: 5px 5px;
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
                background-color: $暗绿;
            }
        }

        .选中按钮 {
            background-color: $正绿;
        }



    }

    .表格 {
        gap: 15px;
        background-color: #bbb;
        align-content: start;
        overflow: auto;
    }

    .页 {
        border: $暗蓝;
        background-color: $暗蓝;
    }
}



.分页 {
    gap: 3px;
    grid-template-columns: 100px 1fr 100px;

    .分页内 {
        gap: 2px;
        grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
    }
}

input:focus {
    outline: none;
}
</style>