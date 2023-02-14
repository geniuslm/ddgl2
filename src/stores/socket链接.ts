import { io } from "socket.io-client";
//export let socket = io("ws://work.lmgwr.com:8081");  // 创建一个socket实例 网址没备案


let 本地服务器地址:string = "ws://localhost:8081"  // 创建一个socket实例
//let 远程服务器地址:string = "wss://120.53.103.135:8081"  // 创建一个socket实例 
let 远程服务器地址:string = "ws://120.53.103.135:8081"  // 创建一个socket实例 
let 远程服务器dev地址:string = "ws://120.53.103.135:8082"  // 创建一个socket实例 

export let socket = io(远程服务器地址);  // 创建一个socket实例


socket.on("广播", data => {
    console.log(`收到广播:${data}`);
})