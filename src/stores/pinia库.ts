import { defineStore } from "pinia";
import { socket } from "./socket链接";
import { objectToString } from "@vue/shared";


export class 订单类 {       // 定义数据模型 之后通过这个class建立对象
  订单号  : string;
  删除信息 : string;
  年    : string;
  月    : string;
  日    : string;
  镜片下单日: string;
  收件人  : string;

  旺旺名: string;
  镜片 : string;
  右近视: string;
  右散光: string;
  右轴向: string;
  左近视: string;
  左散光: string;
  左轴向: string;
  瞳距 : string;
  备注 : string;
}

export class 镜片类 {
  镜片哈名: string;
  品牌名 : string;
  系列名 : string;
  折射率 : string;
  染色变色: string;
  高散车房: string;

  最高近视光度: string;
  最高散光光度: string;
  最高联合光度: string;
  最高远视光度: string;
  最高远视散光: string;
  供应商   : string;
  售价    : string;
  进货价   : string;
  湖北和益  : string;
  湖北蔡司  : string;
  上海老周  : string;
  丹阳臻视  : string;
}


export const pinia库 = defineStore("pinia库", {
  state: () => {
    return {

      订单表11: [] as any[],
      订单表: [] as 订单类[],
      旧订单: [] as any[],
      镜片数据: [] as any[],
      当前数据库状态: '',
      测试: '哈哈哈',


    }
  },

  //计算属性
  getters: {

    计算属性: (state: any) => { },
    月日() {
      let date = new Date();
      let 年 = date.getFullYear().toString().slice(2)
      let 月 = ("0" + (date.getMonth() + 1)).slice(-2)
      let 日 = ("0" + date.getDate()).slice(-2)
      let 月日 = 月 + "月" + 日 + "日"
      return 月日
    }
  },


  //函数 同步和异步函数
  actions: {
    初始化() {
      this.对比测试()
      this.获取旧订单()
      this.获取镜片()
      this.获取订单表11()
    },
    获取旧订单() { socket.emit('旧订单数据', (返回数据: any) => this.旧订单 = 返回数据) },
    获取镜片() { socket.emit('镜片数据', (返回数据: any) => this.镜片数据 = 返回数据) },
    获取订单表11() { socket.emit('旧订单数据', (返回数据: any) => this.订单表11 = 返回数据.slice(0, 5)) },
    
    修改订单(数据: any) { socket.emit('修改与添加订单', 数据, (返回数据: any) => { alert(返回数据) }); },
    新建订单(数据: 订单类) {  socket.emit('测试', 数据, (返回数据:any) => {alert(返回数据)}); },
    新建镜片(数据: 镜片类) {  socket.emit('测试', 数据, (返回数据:any) => {alert(返回数据)}); },

    新建(类型:string,数据:any){
      switch(类型){
        case "镜片":{ socket.emit('测试', 数据, (返回数据:any) => {alert(返回数据)}); break}
        case "镜片":{ socket.emit('测试', 数据, (返回数据:any) => {alert(返回数据)}); break}
        case "镜片":{ socket.emit('测试', 数据, (返回数据:any) => {alert(返回数据)}); break}
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


