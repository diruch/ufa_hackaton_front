import Axios from 'axios'
import AuthApi from '../../api/auth'

import {
    ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME, FINGERPRINT_NAME, AUTHORIZATION_HEADER_NAME, AUTHORIZATION_HEADER_VALUE_PREFIX
} from '../../services/constants'

export default {
    state: {
        accessToken: localStorage.getItem(ACCESS_TOKEN_NAME) || '',
        refreshToken: localStorage.getItem(REFRESH_TOKEN_NAME) || '',
        fingerprint: localStorage.getItem(FINGERPRINT_NAME) || ''
    },
    mutations: {
        auth_success(state, { accessToken, refreshToken, fingerprint }) {
            const accessTokenValue = AUTHORIZATION_HEADER_VALUE_PREFIX + accessToken
            localStorage.setItem(ACCESS_TOKEN_NAME, accessTokenValue)
            localStorage.setItem(REFRESH_TOKEN_NAME, refreshToken)
            localStorage.setItem(FINGERPRINT_NAME, fingerprint)
            Axios.defaults.headers.common[AUTHORIZATION_HEADER_NAME] = accessTokenValue
            Axios.defaults.headers.common[FINGERPRINT_NAME] = fingerprint
            state.accessToken = accessToken
            state.refreshToken = refreshToken
            state.fingerprint = fingerprint
        },
        logout(state) {
            state.token = ''
        }
    },
    actions: {
        login({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                AuthApi.login(username, password)
                    .then(response => {
                        const accessToken = response.data.payload.auth.accessToken
                        const refreshToken = response.data.payload.auth.refreshToken
                        const fingerprint = response.data.payload.auth.fingerprint
                        commit('auth_success', { accessToken, refreshToken, fingerprint })
                        resolve(response)
                    })
                    .catch(err => {
                        localStorage.removeItem(ACCESS_TOKEN_NAME)
                        reject(err)
                    })
            })
        },

        logout({ commit }) {
            return new Promise((resolve) => {
                commit('logout')
                localStorage.removeItem(ACCESS_TOKEN_NAME)
                localStorage.removeItem(REFRESH_TOKEN_NAME)
                localStorage.removeItem(FINGERPRINT_NAME)
                delete Axios.defaults.headers.common[AUTHORIZATION_HEADER_NAME]
                resolve()
            })
        },

        registerRestaurant({ commit }, { username, password, restName, restLocation }) {
            return new Promise((resolve, reject) => {
                AuthApi.restaurantRegistration(username, password, restName, restLocation)
                    .then(response => {
                        const accessToken = response.data.payload.auth.accessToken
                        const refreshToken = response.data.payload.auth.refreshToken
                        const fingerprint = response.data.payload.auth.fingerprint
                        commit('auth_success', { accessToken, refreshToken, fingerprint })
                        resolve(response.data.payload)
                    })
                    .catch(err => {
                        localStorage.removeItem(ACCESS_TOKEN_NAME)
                        reject(err)
                    })
            })
        }
    },
    getters: {
        isLoggedIn: state => !!state.accessToken && !!state.fingerprint
    }
}