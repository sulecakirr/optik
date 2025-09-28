import AES_CBC from '@/libs/aes-cbc'
import jwt from 'jsonwebtoken'
import Vue from 'vue'
import {MD5} from 'crypto-js'
import subuAxios from "@/libs/subu-axios";

export default {
    namespaced: true,
    state: {
        jwtToken: AES_CBC.decrypt(localStorage.getItem('userToken')),
        enumBirimler: null,
        enumUserRole: null,
        enumUrunTuru: null,
        enumUrunCinsi: null,
        statusOption: [
            {
                val: true,
                name: 'Aktif'
            },
            {
                val: false,
                name: 'Pasif'
            }
        ],
        statusDefaultOption: [
            {
                val: true,
                name: 'Evet'
            },
            {
                val: false,
                name: 'Hayır'
            }
        ]
    },
    getters: {
        getToken(state) {
            return state.jwtToken
        },
        getStatusOption(state) {
            return state.statusOption
        },
        getStatusDefaultOption(state) {
            return state.statusDefaultOption
        },
        getUserData(state) {
            try {
                const decoded = jwt.verify(state.jwtToken, Vue.prototype.JWT_TOKEN_SECRET)
                return {
                    username: decoded.username,
                    roles: JSON.parse(JSON.stringify(decoded.roles)),
                    picture: 'https://fotograf.sabis.subu.edu.tr/Fotograf/' + MD5(decoded.username + 'sakaryasabis')
                }
            } catch (err) {
                localStorage.setItem('JwtError', JSON.stringify(err))
                localStorage.removeItem('userToken')
                localStorage.removeItem('userData')
                return null
            }
        },
        getUserName(state) {
            try {
                const decoded = jwt.verify(state.jwtToken, Vue.prototype.JWT_TOKEN_SECRET)
                return decoded.username
            } catch (err) {
                localStorage.setItem('JwtError', JSON.stringify(err))
                localStorage.removeItem('userToken')
                localStorage.removeItem('userData')
                return null
            }
        },
        getRoles(state) {
            try {
                const decoded = jwt.verify(state.jwtToken, Vue.prototype.JWT_TOKEN_SECRET)
                return decoded.roles
            } catch (err) {
                localStorage.setItem('JwtError', JSON.stringify(err))
                localStorage.removeItem('userToken')
                localStorage.removeItem('userData')
                return null
            }
        },
        getPicture(state) {
            try {
                const decoded = jwt.verify(state.jwtToken, Vue.prototype.JWT_TOKEN_SECRET)
                return 'https://fotograf.sabis.subu.edu.tr/Fotograf/' + MD5(decoded.username + 'sakaryasabis')
            } catch (err) {
                localStorage.setItem('JwtError', JSON.stringify(err))
                localStorage.removeItem('userToken')
                localStorage.removeItem('userData')
                return null
            }
        },
        getCanHaveRole: (state) => (val = []) => {
            try {
                const decoded = jwt.verify(state.jwtToken, Vue.prototype.JWT_TOKEN_SECRET)
                return Array.isArray(decoded.roles) ?
                    decoded.roles.some(item => val.includes(item)) :
                    val.includes(decoded.roles)
            } catch (err) {
                localStorage.setItem('JwtError', JSON.stringify(err))
                localStorage.removeItem('userToken')
                localStorage.removeItem('userData')
                return null
            }
        },
        deleteLocalStorageToken: (state) => () => {
            state.enumBirimler = null
            state.enumUserRole = null
            state.enumUrunTuru = null
            state.enumUrunCinsi = null

            localStorage.removeItem('userToken')
            localStorage.removeItem('userData')
        },
        getEnumBirimler(state) {
            return state.enumBirimler
        },
        getEnumUserRole(state) {
            return state.enumUserRole
        },
        getEnumUrunTuru(state) {
            return state.enumUrunTuru
        },
        getEnumUrunCinsi(state) {
            return state.enumUrunCinsi
        },
    },
    mutations: {
        changeJwtToken(state, val) {
            state.jwtToken = val
        },
        changeBirimler(state, val) {
            state.enumBirimler = val
        },
        changeUserRole(state, val) {
            state.enumUserRole = val
        },
        changeUrunTuru(state, val) {
            state.enumUrunTuru = val
        },
        changeUrunCinsi(state, val) {
            state.enumUrunCinsi = val
        }
    },
    actions: {
        changeToken({commit}, val) {
            commit('changeJwtToken', val)
        },
        async changeEnumBirimler({commit, state}) {
            if (state.enumBirimler === null) {
                let resp = await subuAxios.bulkGetRequest(['/Enum/Birimler'])
                commit('changeBirimler', subuAxios.getDataFromResponseList(resp[0]))
            }
        },
        async changeEnumUserRole({commit, state}) {
            if (state.enumUserRole === null) {
                let resp = await subuAxios.bulkGetRequest(['/Enum/UserRole'])
                commit('changeUserRole', subuAxios.getDataFromResponseList(resp[0]))
            }
        },
        async changeEnumUrunTuru({commit, state}) {
            if (state.enumUrunTuru === null) {
                let resp = await subuAxios.bulkGetRequest(['/Enum/UrunTuru'])
                commit('changeUrunTuru', subuAxios.getDataFromResponseList(resp[0]))
            }
        },
        async changeEnumUrunCinsi({commit, state}) {
            if (state.enumUrunCinsi === null) {
                let resp = await subuAxios.bulkGetRequest(['/Enum/UrunCinsi'])
                commit('changeUrunCinsi', subuAxios.getDataFromResponseList(resp[0]))
            }
        }
    },
}
