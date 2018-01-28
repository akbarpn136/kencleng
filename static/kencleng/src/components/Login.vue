<template>
    <q-layout
        ref="layout"
        view="lHh Lpr lFf">

        <div class="layout-padding">
            <q-alert class="layout-padding"
                     color="red"
                     icon="ion-alert-circled"
                     enter="bounceInDown"
                     leave="bounceOutUp"
                     dismissible
                     position="top"
                     v-model="error">
                {{this.pesan}}
            </q-alert>
            <div class="row justify-center">
                <div class="col-8 text-center">
                    <img src="../assets/kencleng-logo.svg" style="width: 220px;">
                </div>
            </div>

            <div class="row justify-center"
                 style="margin-top: 50px;">
                <div class="col-11">
                    <q-field :error="$v.username.$error"
                             error-label="Username tidak boleh kosong">
                        <q-input type="text"
                                 :before="[{icon: 'ion-android-person', handler(){}}]"
                                 placeholder="Username"
                                 class="group"
                                 v-model="username"
                                 autofocus
                                 @blur="$v.username.$touch"></q-input>
                    </q-field>
                </div>
            </div>

            <div class="row justify-center">
                <div class="col-11">
                    <q-field :error="$v.password.$error"
                             error-label="Password tidak boleh kosong">
                        <q-input type="password"
                                 :before="[{icon: 'ion-android-lock', handler(){}}]"
                                 placeholder="Password"
                                 class="group"
                                 v-model="password"
                                 @blur="$v.password.$touch"></q-input>
                    </q-field>
                </div>
            </div>

            <div class="row justify-center"
                 style="margin-top: 50px;">
                <div class="col-11">
                    <q-btn color="negative"
                           class="full-width uppercase"
                           big
                           @click="process_auth()"
                           :disabled="$v.username.$invalid || $v.password.$invalid">
                        masuk
                    </q-btn>
                </div>
            </div>
        </div>

        <q-toolbar slot="footer"
                   class="no-padding">
            <q-btn color="white"
                   class="full-width no-padding"
                   big
                   flat
                   @click="btnRegister">BELUM DAFTAR?
            </q-btn>
        </q-toolbar>
    </q-layout>
</template>

<script>
    import {required} from 'vuelidate/lib/validators';
    import 'quasar-extras/animate/bounceInDown.css'
    import 'quasar-extras/animate/bounceOutUp.css'
    import {
        Toast,
        QField,
        QInput,
        QBtn,
        QAlert,
        QLayout,
        QToolbar,
    } from 'quasar';

    export default {
        name: "login",
        components: {
            QField,
            QInput,
            QBtn,
            QAlert,
            QLayout,
            QToolbar,
        },
        data() {
            return {
                username: null,
                password: null,
                pesan: null
            }
        },
        validations: {
            username: {required},
            password: {required}
        },
        methods: {
            btnRegister() {
                this.$router.push({name: 'register'});
            },
            process_auth() {
                const formAuth = new FormData;
                formAuth.set('username', this.username);
                formAuth.set('password', this.password);

                this.$store.commit('set_errors', null);
                this.$store.dispatch('req_credential', {user: this.username, formData: formAuth});

                if (navigator.onLine) {
                    Toast.create.negative('Sorry. No network connection');
                }
            }
        },
        computed: {
            error: {
                get() {
                    const pesan = this.$store.getters.get_errors;

                    if (pesan) {
                        this.pesan = pesan.non_field_errors[0];
                        return true
                    } else {
                        this.pesan = null;
                        return false;
                    }
                },
                set(val) {
                    return;
                }
            }
        }
    }
</script>

<style lang="stylus">

</style>
