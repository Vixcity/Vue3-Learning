export default {
    namespaced: true, // 调用时需要 user/xxx
    state: { // 数据
        userInfo: {}
    },
    mutations: { // 更改
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        }
    },
    actions: { // 异步业务
    },
}