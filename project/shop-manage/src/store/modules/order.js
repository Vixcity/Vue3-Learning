export default {
    namespace: true, // 调用时需要 order/xxx
    state: { // 数据
        order: {}
    },
    mutations: { // 更改
        setOrder(state, order) {
            state.order = order
        }
    },
    actions: { // 异步业务
    },
}