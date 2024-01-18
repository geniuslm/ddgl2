# Vue 3 + TypeScript + Vite

这个模板应该能帮助你开始使用Vue 3和TypeScript在Vite上进行开发。模板使用Vue 3 `<script setup>`单文件组件，查看[script setup文档](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)了解更多信息。

## 推荐的IDE设置

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (并禁用Vetur) + [TypeScript Vue插件 (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)。

## TS对.vue导入的类型支持

TypeScript默认无法处理`.vue`导入的类型信息，因此我们使用`vue-tsc`替换`tsc`进行类型检查。在编辑器中，我们需要[TypeScript Vue插件 (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)使得TypeScript语言服务能够识别`.vue`类型。

如果单独使用TypeScript插件感觉速度不够快，Volar还实现了更高效的[Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669)。你可以按照以下步骤启用它：

1. 禁用内置的TypeScript扩展
   1. 在VSCode的命令面板中运行`Extensions: Show Built-in Extensions`
    2. 找到`TypeScript and JavaScript Language Features`，右键并选择`Disable (Workspace)`
2. 通过运行命令面板中的`Developer: Reload Window`重新加载VSCode窗口。
3. 更新了编辑器用rider来编辑.vue文件的语言服务

