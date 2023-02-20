import { defineStore } from "pinia";
import { socket } from "./socket链接";
import { objectToString } from "@vue/shared";


export class 订单类 {       
  _id  ?: any;
  订单号   : string;
  删除信息  : string;

  收件人   : string;
  旺旺名   : string;
  镜片    : string;

  右近视   : string;
  右散光   : string;
  右轴向   : string;
  右瞳距   : string;

  左近视   : string;
  左散光   : string;
  左轴向   : string;
  左瞳距   : string;
  备注    : string;

  镜片下单日 : string;
  镜片订货日 : string;
  镜片备好日 : string;

  镜框选项 : string;
  镜框运单号: string;
  镜框下单日: string;
  镜框发货日: string;
  镜框备好日: string;
  订单进度 : string;

  镜片利润  : number;
  镜框利润  : number;
  优惠    : number;
  总利润   : number;

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
  _id ?: string;
  镜片名  : string;
  品牌名  : string;
  系列名  : string;
  折射率  : string;
  高散车房?: string;
  染色变色?: string;

  最高近视光度 : number;
  最高散光光度 : number;
  最高联合光度 : number;
  最高远视光度 : number;
  最高远视散光 : number;
  供应商    : string;
  售价     : number;
  进货价    : number;
  湖北和益  ?: number;
  湖北蔡司  ?: number;
  上海老周  ?: number;
  丹阳臻视  ?: number;
  constructor() {
    this.镜片名  = "";
    this.品牌名  = "";
    this.系列名  = "";
    this.折射率  = "";
    this.染色变色 = "";
    this.高散车房 = "";

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
      通过筛选的数量: 0,


      订单排序的属性: '订单号',
      订单正逆序: 1,
      每页显示的数量: 20,
      订单页数: 1,
      当前页: 1,


      //镜片选项
      镜片搜索值: {} as 镜片类,
      镜片全局搜索值: '',
      镜片排序的属性: '镜片名',
      镜片正逆序: 1,
   
      镜片名选项: [] as string[],
      品牌名选项: [] as string[],
      系列名选项: [] as string[],
      折射率选项: [] as string[],
      供应商选项: [] as string[],



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
      let 要搜索的值: any= state.镜片搜索值;
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
      let 要显示的订单 = state.订单表;
      let 要搜索的值: any = state.订单搜索值;
      let 序号: any
      //全局搜索
      if (state.订单全局搜索值) {
        要显示的订单 = state.订单表.filter((行: any) => {       //过滤出要显示的订单           
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
    初始化() {
      console.log("初始化");
      //this.通讯('测试', "获");
      this.通讯('订单', "获");
      this.通讯('用户', "获");
      this.通讯('镜片', "获");
      
    },
    通讯(类型: string, 操作: string, 数据?: any) {
  
        if(类型=="测试") { socket.emit('测试', 操作, 数据, (返回数据: any) => { console.log(返回数据) }); }
        if(类型=="订单") { socket.emit('订单', 操作, 数据, (返回数据: any) => { this.订单表 = 返回数据 }); }
        if(类型=="用户") { socket.emit('用户', 操作, 数据, (返回数据: any) => { this.用户表 = 返回数据 }); }
        if(类型=="镜片") { socket.emit('镜片', 操作, 数据, (返回数据: any) => { this.镜片表 = 返回数据,this.镜片选项() }); }
   
    },

    镜片选项() {
      let i
      for (i in this.镜片表) {
        if (!(this.镜片名选项.indexOf(this.镜片表[i].镜片名) > -1)) this.镜片名选项.push(this.镜片表[i].镜片名)
        if (!(this.品牌名选项.indexOf(this.镜片表[i].品牌名) > -1)) this.品牌名选项.push(this.镜片表[i].品牌名)
        if (!(this.系列名选项.indexOf(this.镜片表[i].系列名) > -1)) this.系列名选项.push(this.镜片表[i].系列名)
        if (!(this.折射率选项.indexOf(this.镜片表[i].折射率) > -1)) this.折射率选项.push(this.镜片表[i].折射率)
        if (!(this.供应商选项.indexOf(this.镜片表[i].供应商) > -1)) this.供应商选项.push(this.镜片表[i].供应商)
       
      }
    },

    //同步异步函数
    对比测试() {
      socket.emit('旧订单数据', (返回数据: any) => {
        let 本地数据 = this.旧订单
        let 远程数据 = 返回数据
        if (JSON.stringify(远程数据) == JSON.stringify(本地数据))
          console.log("一样")
        else
          console.log("不一样")
        console.log(远程数据[1].旺旺名)
        console.log(本地数据[1].旺旺名)
      });
    },

  },
});


