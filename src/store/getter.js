const getters ={
    getCount(state,n=1){
        return (state.count+=n)
    },
    isDisabled(state){
        console.log(state)
        return (state.isDisabled)
    },
    shopList(state){
        return state.shopList
    }
}
export default getters