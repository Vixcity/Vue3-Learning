import { createStore } from 'vuex'
// 最low的方式 ↓
// import user from './modules/user';

// 自动引入 modules 文件夹下的所有模块
// require.context 是 webpack 增加的方法
// 三个参数分别代表 路径 子目录 读文件的标识
const modulefiles = require.context('./modules', true, /\.js$/)
const autoImportModules = {}

// const fileNames = modulefiles.keys()
modulefiles.keys().forEach(filePath => {
  let moduleObj = modulefiles(filePath)
  // 获取不同的模块名称
  let moduleName = filePath.slice(2,filePath.length-3)
  autoImportModules[moduleName] = moduleObj.default
});

// console.log(fileNames,'路径')
console.log(modulefiles,'方法')
console.log(modulefiles('./user.js'),'导出的对象')

export default createStore({
  state: { // 数据
  },
  mutations: { // 更改
  },
  actions: { // 异步业务
  },
  getters: { // 获取方式
  },
  modules: autoImportModules,
})
