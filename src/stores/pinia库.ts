import { defineStore } from "pinia";
import { socket } from "./socket链接";
import { objectToString } from "@vue/shared";


export class 订单类 {
  _id?: any;
  订单号: string;
  删除信息: string;

  收件人: string;
  旺旺名: string;
  镜片: string;

  右近视: string;
  右散光: string;
  右轴向: string;
  右瞳距: string;

  左近视: string;
  左散光: string;
  左轴向: string;
  左瞳距: string;
  备注: string;

  镜片下单日: string;
  镜片订货日: string;
  镜片备好日: string;
  镜片供应商: string;
  镜片进货价: number;
  镜片售价: number;
    

  镜框选项: string;
  镜框运单号: string;
  镜框下单日: string;
  镜框发货日: string;
  镜框备好日: string;
  订单进度: string;
  订单完成日: string;

  镜片利润: number;
  镜框利润: number;
  优惠: number;
  总利润: number;

  试戴镜框: string[];
  编辑记录: string[];
  购买记录: string[];
}

export class 用户类 {
  _id?: string;
  用户名: string;
  密码: string;
  类型: string;
}

export class 镜片类 {
  _id?: string;
  镜片名: string;
  品牌名: string;
  系列名: string;
  折射率: string;
  高散定制?: string;
  染色变色?: string;

 

  售价: number;
  湖北和益?: number;
  山东臻视?: number;
  上海老周?: number;
  湖北蔡司?: number;
  丹阳夏总?: number;
  光度范围: string[];
  constructor() {
    this.镜片名 = "";
    this.品牌名 = "";
    this.系列名 = "";
    this.折射率 = "";
    this.染色变色 = "";
    this.高散定制 = "";

  }
}


export const pinia库 = defineStore("pinia库", {
  state: () => {
    return {
      菜单页面名: window.location.pathname,

      订单表: [] as 订单类[],
      镜片表: [] as 镜片类[],
      用户表: [] as 用户类[],

      订单表11: [] as any[],
      旧订单: [] as any[],
      镜片数据: [] as any[],
      当前数据库状态: '',
      当前登录用户: "",
      当前登录用户类型: "",
      测试: '哈哈哈',
      测试数组: [] as any[],


      订单搜索值: {} as 订单类,
      订单全局搜索值: '',
      订单分类: ['本月', '未完成'],
      通过筛选的数量: 0,
      按时间筛选订单: [] as 订单类[],
  


      订单排序的属性: '订单号',
      订单正逆序: 1,
      每页显示的数量: 50,
      订单页数: 1,
      当前页: 1,


      //镜片选项
      镜片搜索值: {} as 镜片类,
      镜片全局搜索值: '',
      镜片排序的属性: '镜片名',
      镜片正逆序: 1,
      镜片显示:'全部',

      镜片名选项: [] as string[],
      品牌名选项: [] as string[],
      系列名选项: [] as string[],
      折射率选项: [] as string[],
      供应商选项: [] as string[],

      年: '',
      月: '',
      日: '',

    }
  },

  //计算属性
  getters: {
    月日: () => {
      let date = new Date();
      let 年 = date.getFullYear().toString().slice(2)
      let 月 = ("0" + (date.getMonth() + 1)).slice(-2)
      let 日 = ("0" + date.getDate()).slice(-2)
      let 月日 = 月 + "月" + 日 + "日"
      return 月日
    },

    排序过的镜片: (state) => {
      let 要显示的镜片 = state.镜片表;
      let 要搜索的值: any = state.镜片搜索值;
      let 序号: any
      //全局搜索
      if (state.镜片全局搜索值) {
        要显示的镜片 = state.镜片表.filter((行: any) => {       //过滤出要显示的镜片           
          return Object.keys(行).some((key) => {   // key是行的每个属性名，some是检查行的属性是否有搜索的值
            return String(行[key]).indexOf(state.镜片全局搜索值) > -1
          })
        })
      }
      //分属性搜索
      for (序号 in state.镜片搜索值) {
        if (要搜索的值[序号]) {
          console.log("在 " + 序号 + " 中搜索 " + 要搜索的值[序号])
          要显示的镜片 = 要显示的镜片.filter((行: any) => {
            return String(行[序号]).indexOf(要搜索的值[序号]) >= 0
          })
        }
      }
      state.通过筛选的数量 = 要显示的镜片.length

      //排序
      要显示的镜片 = 要显示的镜片.sort((前一个值: any, 后一个值: any) => {
        return (前一个值[state.镜片排序的属性] >= 后一个值[state.镜片排序的属性] ? 1 : -1) * state.镜片正逆序
      })
      //去掉_id
      return 要显示的镜片

    },

    筛选过的订单: (state) => {
      let 要显示的订单: any = state.订单表;
      let 要搜索的值: any = state.订单搜索值;
      let 序号: any
      let date = new Date();
      state.年 = date.getFullYear().toString().slice(2)
      state.月 = ("0" + (date.getMonth() + 1)).slice(-2)
      state.日 = ("0" + date.getDate()).slice(-2)
      //订单分类 时间
      if (state.订单分类[0] == '本年') {
        要显示的订单 = 要显示的订单.filter((行: any) => {
          return 行.订单号.slice(0, 2) == state.年
        })
      }
      if (state.订单分类[0] == '本月') {
        要显示的订单 = 要显示的订单.filter((行: any) => {
          return 行.订单号.slice(0, 4) == state.年 + state.月
        })
      }
      if (state.订单分类[0] == '本日') {
        要显示的订单 = 要显示的订单.filter((行: any) => {
          return 行.订单号.slice(0, 6) == state.年 + state.月 + state.日
        })
      }
      state.按时间筛选订单=要显示的订单
      //订单分类 状态
      if (state.订单分类[1] == '未完成') {
        要显示的订单 = 要显示的订单.filter((行: any) => {
          return 行.订单进度 != '已完成'
        })
      }
      if (state.订单分类[1] == '已完成') {
        要显示的订单 = 要显示的订单.filter((行: any) => {
          return 行.订单进度 == '已完成'
        })
      }



      //全局搜索
      if (state.订单全局搜索值) {
        要显示的订单 = 要显示的订单.filter((行: any) => {       //过滤出要显示的订单           
          return Object.keys(行).some((key) => {   // key是行的每个属性名，some是检查行的属性是否有搜索的值
            return String(行[key]).indexOf(state.订单全局搜索值) > -1
          })
        })
      }
      //分属性搜索
      for (序号 in 要搜索的值) {
        if (要搜索的值[序号]) {
          console.log("在 " + 序号 + " 中搜索 " + 要搜索的值[序号])
          要显示的订单 = 要显示的订单.filter((行: any) => {
            return String(行[序号]).indexOf(要搜索的值[序号]) >= 0
          })
        }
      }
      state.通过筛选的数量 = 要显示的订单.length

      //排序
      要显示的订单 = 要显示的订单.sort((前一个值: any, 后一个值: any) => {
        return (前一个值[state.订单排序的属性] >= 后一个值[state.订单排序的属性] ? 1 : -1) * state.订单正逆序
      })
      //分页模块
      state.订单页数 = Math.ceil(要显示的订单.length / state.每页显示的数量)
      要显示的订单 = 要显示的订单.slice((state.当前页 - 1) * state.每页显示的数量, state.当前页 * state.每页显示的数量)

      return 要显示的订单
    },

  },


  //函数 同步和异步函数
  actions: {
    async 初始化() {
      socket.emit('订单', '获', (返回数据: any) => { this.订单表 = 返回数据; console.log("xiazaiwan"); });
      socket.emit('用户', '获', (返回数据: any) => { this.用户表 = 返回数据 });
      socket.emit('镜片', '获', (返回数据: any) => { this.镜片表 = 返回数据, this.镜片选项() });
      let date = new Date();
      this.年 = date.getFullYear().toString().slice(2)
      this.月 = ("0" + (date.getMonth() + 1)).slice(-2)
      this.日 = ("0" + date.getDate()).slice(-2)
      console.log("初始化完成");
    },
    async 通讯(类型: string, 操作: string, 数据?: any) {
      if (类型 == "测试") { socket.emit('测试', 操作, 数据, (返回数据: any) => { console.log(返回数据); }); }
      if (类型 == "订单") { socket.emit('订单', 操作, 数据, (返回数据: any) => { console.log(返回数据); }); }
      if (类型 == "用户") { socket.emit('用户', 操作, 数据, (返回数据: any) => { console.log(返回数据); }); }
      if (类型 == "镜片") { socket.emit('镜片', 操作, 数据, (返回数据: any) => { this.镜片表 = 返回数据, this.镜片选项() }); }
    },


    镜片选项() {
      for (let i in this.镜片表) {
        if (!(this.镜片名选项.indexOf(this.镜片表[i].镜片名) > -1)) this.镜片名选项.push(this.镜片表[i].镜片名)
        if (!(this.品牌名选项.indexOf(this.镜片表[i].品牌名) > -1)) this.品牌名选项.push(this.镜片表[i].品牌名)
        if (!(this.系列名选项.indexOf(this.镜片表[i].系列名) > -1)) this.系列名选项.push(this.镜片表[i].系列名)
        if (!(this.折射率选项.indexOf(this.镜片表[i].折射率) > -1)) this.折射率选项.push(this.镜片表[i].折射率)
        if (!(this.供应商选项.indexOf(this.镜片表[i].供应商) > -1)) this.供应商选项.push(this.镜片表[i].供应商)
      }
    },


    对比测试(数据1, 数据2) {

      if (JSON.stringify(数据1) == JSON.stringify(数据2))
        console.log("一样")
      else
        console.log("不一样")
      console.log(数据1[1].旺旺名)
      console.log(数据2[1].旺旺名)
    },
  },
});


