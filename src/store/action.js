function getData() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('我是服务器获取的数据哦!')
        }, 1000);
    })
}
const actions = {
    actionsAddCount(context,n=1){
        return context.commit('addCount',n)
    },
    actionsDisCount(context,n=1){
        return context.commit('disCount',n)
    },
    test({commit}){
        return commit('testAc')
    },
    async actionGetList({commit}){
        commit('gotData',await getData());
    }
}

// const actions = {
//     async actionA ({ commit }) {
//       commit('gotData', await getData())
//     },
//     async actionB ({ dispatch, commit }) {
//       await dispatch('actionA') // 等待 actionA 完成
//       commit('gotOtherData', await getOtherData())
//     }
//   }
export default actions