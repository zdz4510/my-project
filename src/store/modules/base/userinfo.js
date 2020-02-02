const state = {
    userinfo: {
        token: '312312312',
    },
}

const mutations = {
    SETUSERINFO(state, data) {
        state.userinfo = data;
    }
}

const actions = {
    setInfo({ commit }, data) {
        commit('SETUSERINFO', data)
    }
}

export default {
    state,
    mutations,
    actions
}
