import Vue from 'vue'
import Vuex from 'vuex'
import project from './modules/project'
import { getToken, setToken, clearToken } from '../utils/auth'
import { getUserInfo, setUserInfo, clearUserInfo } from '../utils/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: getToken(),
        userInfo: getUserInfo()
    },
    getters: {
        getToken: state => state.token,
        getUserInfo: state => state.userInfo,
        getProjectDetails: state => state.project.projectDetails
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            setToken(token)
        },
        clearToken(state) {
            state.token = null
            clearToken()
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
            setUserInfo(userInfo)
        },
        clearUserInfo(state) {
            clearUserInfo()
            state.userInfo = null
        }
    },
    actions: {
        login(ctx, { token, userInfo }) {
            ctx.commit('setToken', token)
            ctx.commit('setUserInfo', userInfo)
        },
        logout(ctx) {
            ctx.commit('clearToken')
            ctx.commit('clearUserInfo')
        }
    },
    modules: {
        project
    }
})

export default store