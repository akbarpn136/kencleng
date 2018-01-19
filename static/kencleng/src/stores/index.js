import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
const URL = process.env.NODE_ENV === 'development' ?
    'http://localhost:8000/' :
    'http://bbta3.bppt.go.id:9602/';

export default new Vuex.Store({
    state: {
        credential: {
            username: null,
            token: null,
        },
        errors: null
    },
    getters: {
        get_credential: state => {
            return state.credential;
        },
        get_errors: state => {
            return state.errors;
        }
    },
    mutations: {
        set_credential (state, payload={}) {
            if (payload) {
                state.credential.username = payload.user;
                state.credential.token = payload.token.token;
            } else {
                state.credential.username = null;
                state.credential.token = null;
            }
        },
        set_errors (state, err) {
            state.errors = err;
        }
    },
    actions: {
        req_credential (context, payload) {
            const URL_OTEN = `${URL}kencleng/login/`;
            axios.post(URL_OTEN, payload.formData)
                .then((res) => {
                    context.commit('set_credential', {user: payload.user, token: res.data});
                })
                .catch((err) => {
                    context.commit('set_errors', err.response.data);
                });
        }
    }
});
