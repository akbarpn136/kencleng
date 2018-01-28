import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

Vue.use(Vuex);
const URL = process.env.NODE_ENV === 'development' ?
    'http://localhost:8000/' :
    'http://bbta3.bppt.go.id:9602/';
const URL_TRANSAKSI = `${URL}kencleng/v1/transaksi/`;
const URL_OTEN = `${URL}kencleng/`;

export default new Vuex.Store({
    state: {
        credential: {
            username: null,
            token: null,
        },
        transaksi: null,
        transaksi_lokal: [],
        transaksi_addon: null,
        saldo: 0,
        errors: null
    },
    getters: {
        get_credential: state => {
            return state.credential;
        },
        get_transaksi: state => {
            return state.transaksi;
        },
        get_transaksi_lokal: state => {
            return state.transaksi_lokal;
        },
        get_transaksi_addon: state => {
            return state.transaksi_addon;
        },
        get_saldo: state => {
            return state.saldo;
        },
        get_errors: state => {
            return state.errors;
        }
    },
    mutations: {
        set_credential (state, payload=null) {
            if (payload) {
                state.credential.username = payload.user;
                state.credential.token = payload.token.token;
                localStorage.setItem('token', JSON.stringify({
                    user: payload.user,
                    token: payload.token.token
                }));

                router.push({name: 'utama'});
            } else {
                state.credential.username = null;
                state.credential.token = null;
                localStorage.removeItem('token');
                router.push({name: 'login'});
            }
        },
        set_transaksi (state, payload) {
            state.transaksi = payload;
        },
        set_transaksi_lokal (state, payload) {
            payload.data.forEach(el => {
                if (payload.mode === 'online') state.transaksi_lokal.push(el);
                else state.transaksi_lokal.unshift(el);
            });
        },
        set_transaksi_lokal_tertentu: (state, payload) => {
            if (payload.mode === 'hapus') {
                state.transaksi_lokal = payload.data.filter((el) => {
                    return (el.id !== payload.id)
                });
            } else {
                state.transaksi_addon = payload.data.filter((el) => {
                    return (el.id === payload.id)
                });
            }
        },
        update_transaksi_lokal (state, payload) {
            payload.lama.splice(payload.index, 1, payload.baru);
        },
        reset_transaksi_lokal (state) {
            state.transaksi_lokal = [];
        },
        set_transaksi_addon (state, payload) {
            state.transaksi_addon = payload;
        },
        hitung_saldo (state, payload) {
            state.saldo += payload;
        },
        set_saldo (state, payload) {
            state.saldo = payload;
        },
        set_errors (state, err) {
            state.errors = err;
        }
    },
    actions: {
        req_credential (context, payload) {
            return axios.post(`${URL_OTEN}login/`, payload.formData);
        },
        req_register (context, payload) {
            axios.post(`${URL_OTEN}register/`, payload.formData)
                .then((res) => {
                    context.commit('set_credential', {user: payload.user, token: res.data});
                })
                .catch((err) => {
                    context.commit('set_errors', err.response.data);
                });
        },
        req_transaksi (context, payload) {
            return axios.get(URL_TRANSAKSI, {
                headers: {'Authorization': `token ${payload.token}`},
                params: {
                    page: payload.page
                }
            });
        },
        req_tambahTransaksi (context, payload) {
            return axios.post(URL_TRANSAKSI, payload.formData, {
                headers: {'Authorization': `token ${payload.token}`}
            });
        },
        req_ubahTransaksi (context, payload) {
            return axios.put(`${URL_TRANSAKSI}${payload.id}/`, payload.formData, {
                headers: {'Authorization': `token ${payload.token}`}
            });
        },
        req_hapusTransaksi (context, payload) {
            return axios.delete(`${URL_TRANSAKSI}${payload.id}/`, {
                headers: {'Authorization': `token ${payload.token}`}
            });
        },
        req_saldo (context, payload) {
            return axios.get(`${URL_TRANSAKSI}saldo/`, {
                headers: {'Authorization': `token ${payload.token}`},
            });
        },
        req_current_user (context, payload) {
            return axios.get(`${URL_OTEN}current_user/`, {
                headers: {'Authorization': `token ${payload.token}`},
            });
        },
        req_ubahProfil (context, payload) {
            return axios.put(`${URL_OTEN}change_name/`, payload.formData, {
                headers: {'Authorization': `token ${payload.token}`}
            });
        },
        req_ubahPassword (context, payload) {
            return axios.post(`${URL_OTEN}change_password/`, payload.formData, {
                headers: {'Authorization': `token ${payload.token}`}
            });
        },
    }
});
