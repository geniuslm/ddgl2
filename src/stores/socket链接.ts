import { io } from "socket.io-client";
//export let socket = io("ws://work.lmgwr.com:8081");  // 创建一个socket实例 网址没备案


let 本地服务器IP:string = "ws://localhost:44444"
let 艾云地址:string = "wss://lmgwr.com:24444"  // 创建一个socket实例 

export let socket = io(艾云地址);  // 创建一个socket实例

