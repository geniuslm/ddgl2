<script setup lang = "ts">
import { pinia库, 订单类 } from '@仓库/pinia库';
import lmInput from "@/components/订单行.vue";
import lmButton from "@组件/按钮.vue";
import { socket } from "@仓库/socket链接";
import { onMounted, computed, reactive } from 'vue';
import { cloneDeep as deepCopy } from 'lodash';


let 库 = pinia库();

socket.on("广播", 接收数据 => {
    if (接收数据[0] === '改') {
        for (let i in 库.订单表) {
            if (库.订单表[i]._id === 接收数据[1]._id) {
                库.订单表[i] = deepCopy(接收数据[1]) 
            }
        }
    }
    if (接收数据[0] === '增') {
        库.订单表.push(接收数据[1])
    }
    if (接收数据[0] === '删') {
        库.订单表.splice(库.订单表.findIndex((行: any) => 行._id == 接收数据[1]._id), 1)
    }
    console.log('收到的广播',接收数据[0], 接收数据[1]);
})

let 全局状态 = reactive({
    订单表总页数: 0,
    每页显示数量: 50,
    订单表当前页: 1,
    订单排序正反: -1,
    订单排序属性: "订单号",

    //订单分类 
    订单状态分类: "未完成",
    未订片开关: false,
    框未回开关: false,

    //订单全局搜索
    订单全局搜索: "",
    通过全局搜索的数量: 0,
})

let 要显示的订单: any =reactive([]);

let 订单表 = computed(() => {
    let 开始时间 = new Date().getTime()
    要显示的订单 = 库.订单表;

    //订单分类 状态
    if (全局状态.订单状态分类 === '已完成') {
        要显示的订单 = 库.订单表.filter((行: any) => {
            return 行.订单进度 === '已完成'
        })
    }
    if (全局状态.订单状态分类 === '未完成') {
        要显示的订单 = 库.订单表.filter((行: any) => {
            return 行.订单进度 !== '已完成'
        })
    }
    if (全局状态.订单状态分类 === '有镜片未完成') {
        要显示的订单 = 库.订单表.filter((行: any) => {
            return 行.订单进度 !== '已完成'&&行.镜片 !== ''
        })
    }


    if (全局状态.订单状态分类 === '未定片') {
        要显示的订单 = 库.订单表.filter((行: any) => {
            return 行.订单进度 !== '已完成' && (!行.左镜片订货日 || !行.右镜片订货日) && 行.镜片 !== ''
                 //  行.订单进度 !== '已完成' && (!行.右镜片供应商 || !行.左镜片供应商) && 行.镜片 !== '' 
        })
    }

    if (全局状态.订单状态分类 === '未发镜框') {
        要显示的订单 = 库.订单表.filter((行: any) => {
            return 行.订单进度 !== '已完成' && (行.选定镜框 || 行.试戴镜框.filter((item) => item !== null && item !== "").length !== 0) && !行.镜框发货日
        })
    }
    



    //全局搜索
    if (全局状态.订单全局搜索) {
        要显示的订单 = 要显示的订单.filter((行: any) => {       //过滤出要显示的订单           
            return Object.keys(行).some((key) => {   // key是行的每个属性名，some是检查行的属性是否有搜索的值
                return String(行[key]).indexOf(全局状态.订单全局搜索) > -1
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
    全局状态.通过全局搜索的数量 = 要显示的订单.length


    //排序
    要显示的订单 = 要显示的订单.sort((前一个值: any, 后一个值: any) => {
        return (前一个值[全局状态.订单排序属性] >= 后一个值[全局状态.订单排序属性] ? 1 : -1) * 全局状态.订单排序正反
    })
    //分页模块
    全局状态.订单表总页数 = Math.ceil(要显示的订单.length / 全局状态.每页显示数量)
    要显示的订单 = 要显示的订单.slice((全局状态.订单表当前页 - 1) * 全局状态.每页显示数量, 全局状态.订单表当前页 * 全局状态.每页显示数量)
   
    console.log("订单表计算耗时", new Date().getTime() - 开始时间);
    
    return 要显示的订单
})




let 添加新订单 = () => {
    let 新订单 = new 订单类
    let date = new Date()
    let 年 = date.getFullYear().toString().slice(2)
    let 月 = ("0" + (date.getMonth() + 1)).slice(-2)
    let 日 = ("0" + date.getDate()).slice(-2)
    let 最后订单号: any
    if (库.订单表.length == 0) { 最后订单号 = 年 + 月 + 日 + "00" }
    else {
        最后订单号 = 库.订单表.reduce((上一个, 下一个) => {
            const prevNum = parseInt(上一个.订单号);
            const currentNum = parseInt(下一个.订单号);
            return prevNum > currentNum ? 上一个 : 下一个;
        }).订单号
    }

    let 订单号 = () => {
        if (最后订单号.slice(0, 6) == 年 + 月 + 日) {
            return (parseInt(最后订单号) + 1).toString()
        }
        else {
            return 年 + 月 + 日 + "01"
        }
    }
    新订单.旺旺名 = "测试订单"
    新订单.订单号 = 订单号()
    //新订单.订单完成日 = '未2完成'
    新订单.订单进度='未完成'
    新订单.编辑记录 = []
    新订单.购买记录 = []
    新订单.编辑记录.push(库.月日 + 库.当前登录用户 + '创建#' + JSON.stringify(新订单))
    socket.emit('订单', '增', 新订单, (返回数据: any) => {
        console.log("返回的是:"+ 返回数据);
        库.订单表.push(返回数据);
        //不添加下面那行 函数都没有反应
    });
}



let 已完成订单数量 = computed(() => 库.订单表.filter((行: any) => { return 行.订单进度 === "已完成" }).length)
let 未完成订单数量 = computed(() => 库.订单表.filter((行: any) => { return 行.订单进度 !== "已完成" }).length)
let 未订片订单数量 = computed(() => 库.订单表.filter((行: any) => { return 行.订单进度 !== '已完成' && (!行.右镜片供应商 || !行.左镜片供应商) && 行.镜片 !== '' }).length)
let 有镜片未完成订单数量 = computed(() => 库.订单表.filter((行: any) => { return 行.订单进度 !== '已完成'&&行.镜片 !== '' }).length)
let 未发镜框订单数量 = computed(() => 库.订单表.filter((行: any) => { return 行.订单进度 !== '已完成' && 行.试戴镜框.filter((item) => item !== null && item !== "").length !== 0 && !行.镜框发货日 }).length)



</script>

<template>
    <div class="整页 ">

        <div class="顶部 ">
            <div class="按钮组">
                <div @click="全局状态.订单排序正反 = 1" :class="{ 选中按钮: 全局状态.订单排序正反 == 1 }" class="按钮">
                    <icon 图标名="lm-arrowdown" 颜色="#FFF" font-size='20px' />
                </div>
                <div @click="全局状态.订单排序正反 = -1" :class="{ 选中按钮: 全局状态.订单排序正反 == -1 }" class="按钮">
                    <icon 图标名="lm-arrowup" 颜色="#FFF" font-size='20px' />
                </div>
            </div>



            <div @click="全局状态.订单状态分类 = '已完成'; 库.当前页 = 1" :class="{ 按钮: true, 选中按钮: 全局状态.订单状态分类 == '已完成' }" class="按钮">
                已完成{{ 已完成订单数量 }}
            </div>



            <div class="按钮组">
                <div @click="全局状态.订单状态分类 = '未完成'; 库.当前页 = 1" :class="{ 选中按钮: 全局状态.订单状态分类 == '未完成' }" class="按钮">
                    未完成{{ 未完成订单数量 }} 
                </div>
                <div @click="全局状态.订单状态分类 = '有镜片未完成'; 库.当前页 = 1" :class="{ 选中按钮: 全局状态.订单状态分类 == '有镜片未完成' }" class="按钮">
                    有镜片{{ 有镜片未完成订单数量 }}
                </div>
                <div @click="全局状态.订单状态分类 = '未定片'; 库.当前页 = 1" :class="{ 选中按钮: 全局状态.订单状态分类 == '未定片' }" class="按钮">
                    未定片{{ 未订片订单数量 }}
                </div>
                <div @click="全局状态.订单状态分类 = '未发镜框'; 库.当前页 = 1" :class="{ 选中按钮: 全局状态.订单状态分类 == '未发镜框' }" class="按钮">
                    未发镜框{{ 未发镜框订单数量 }}
                </div>
            
                <!-- <div @click="全局状态.订单状态分类 = '没买镜片', 库.当前页 = 1" :class="{ 选中按钮: 全局状态.订单状态分类 == '没买镜片' }" class="按钮">
                                没买镜片{{ 没买镜片订单数量 }}
                            </div> -->

            </div>
       
            <!-- <div class="筛选数字">{{ 订单表.length }}</div> -->


            <div></div>
            <div class="搜索">
                <input class="搜索框" @change="库.当前页 = 1" v-model.lazy="全局状态.订单全局搜索" placeholder="全局搜索">
                <icon 图标名="lm-close-circle-fill" @click="全局状态.订单全局搜索 = ''" 颜色="#FFF" font-size='25px' />
                <div v-show="全局状态.订单全局搜索 != ''" class="搜索数量"> {{ 全局状态.通过全局搜索的数量 }}</div>
            </div>
            <div class="添加" @click="添加新订单">添加新订单
                <icon 图标名="lm-plus-circle-fill" @click="库.订单全局搜索值 = ''" 颜色="#fff" font-size='25px' />
            </div>

        </div>
        <!-- 表格模块 -->
        <div class="表格">

            <lmInput v-for="(i, k) in 订单表 " :key="订单表[k]._id" :行数据="订单表[k]"></lmInput>

        </div>
        <!-- 分页模块 -->
        <div class="分页 横向">
            <lmButton @click="全局状态.订单表当前页 -= 1" class=""> 当前第{{ 全局状态.订单表当前页 }} 页</lmButton>
            <div class="分页内">
                <lmButton :class="{ 页: 全局状态.订单表当前页 == 页 }" v-for="(页, index) in 全局状态.订单表总页数"
                    @click="全局状态.订单表当前页 = index + 1">
                    {{ 页 }}
                </lmButton>
            </div>
            <lmButton @click="全局状态.订单表当前页 += 1" class="">一共有{{ 全局状态.订单表总页数 }}页</lmButton>
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
        grid-template-columns: 80px 120px 400px   1fr 200px 150px;
        grid-template-rows: 1fr;

        .按钮 {
            background: $浅灰;
            border-radius: 5px;
            color: $纯白;
            font-weight: bold;
        }

        .选中按钮 {
            background-color: $正绿;
        }

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
                    border-radius: 5px 0 0 5px;
                }

                &:last-child {
                    border-radius: 0 5px 5px 0;
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