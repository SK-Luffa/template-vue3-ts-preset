npm create template-vue3-ts-preset

# 基于vite官方模板“template-vue-ts” 集成vue-router、Pinia、axios 等常用第三方插件

该项目创建新的新的vue项目时，无需要手动安装 vue-router、Pinia、axios 等常用第三方插件 以及编写对应的代码和文件，通过脚手架将这些步骤集成起来  从而简化创建新的vue项目的步骤。旨在将重点放到业务开发中，以提节省创建时的成本

## 说明

所有业务操作应当存放在src目录中

### 关于src目录

#### axios
存在两个文件“index.ts”以及“config.ts” 前者是通过axios对业务请求的进一步封装，包括但不限于对于403以及其他http状态码的处理、对请求错误回调的封装等等，后者是打包后生产环境的请求地址和开发环境的请求地址

#### components 
当前文件夹将不在存储具体页面，而是存放被抽离和封装起来的组件，包括但不限于组件、插槽等
#### pages
内部存放具体路由页面
#### routes
内部存放路由文件
#### store
内部存放 pinia 声明的具体变量