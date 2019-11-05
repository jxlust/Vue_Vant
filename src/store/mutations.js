const mutations = {
    addCount(state,n=1){
        state.isDisabled=false;
        return (state.count+=n)
    },
    disCount(state,n=1){
        return (state.count -=n,state.count==0?state.isDisabled=true:state.isDisabled=false)
    },
    gotData(state,data){
        state.testData = data;
        console.log(data);
    }
}
export default mutations