
import VueCookies from 'vue-cookies'
import {getUser} from '@/api/login.api.js'
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
    },
    getUserInfo({commit},systemId){
        const token = VueCookies.get('mcs.sessionId');
        getUser({
            sessionId:token,
            systemId:systemId,
        }).then(data=>{
            const res =data.data;
            if(res.code==200){
                commit('SETUSERINFO', res.data)
            }
        })
        
    }
}

export default {
    state,
    mutations,
    actions
}
