import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        userId: localStorage.getItem('userId') || ''
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, { token, userId }) {
            state.status = 'success';
            state.token = token;
            state.userId = userId;
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = '';
            state.token = '';
            state.userId = '';
        },
    },
    actions: {
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request');
                axios({ url: '/api/users/login', data: user, method: 'POST' })
                    .then(resp => {
                        const token = resp.data.id;
                        const userId = resp.data.userId;
                        localStorage.setItem('token', token);
                        localStorage.setItem('userId', userId);
                        axios.defaults.headers.common['Authorization'] = token;
                        commit('auth_success', { token, userId });
                        resolve(resp);
                    })
                    .catch(err => {
                        commit('auth_error');
                        localStorage.removeItem('token');
                        reject(err);
                    })
            })
        },
        async logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit('logout');
                axios({ url: '/api/users/logout', method: 'POST' })
                    .then(() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('userId');
                        delete axios.defaults.headers.common['Authorization']
                        resolve();
                    });
            });
        }
    },
    modules: {},
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    }
})