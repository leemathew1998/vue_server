
export default {
    namespaced: true,
    state: () => {
        return {
            userInfo: {}
        }
    },
    mutations: {
        setuserinfo(state, userinfo) {
            state.userInfo = userinfo
        }
    },
    actions: {
        login({ commit }, data) {
            console.log(data)
        }
    }
}