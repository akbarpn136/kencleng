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
                    <q-field :error="$v.email.$error"
                             :error-label="check_email">
                        <q-input type="email"
                                 :before="[{icon: 'ion-email', handler(){}}]"
                                 placeholder="Email"
                                 class="group"
                                 v-model="email"
                                 @blur="$v.email.$touch"></q-input>
                    </q-field>
                </div>
            </div>

            <div class="row justify-center">
                <div class="col-11">
                    <q-field :error="$v.password.$error"
                             :error-label="check_password">
                        <q-input type="password"
                                 :before="[{icon: 'ion-android-lock', handler(){}}]"
                                 placeholder="Password"
                                 class="group"
                                 v-model="password"
                                 @blur="$v.password.$touch"></q-input>
                    </q-field>
                </div>
            </div>

            <div class="row justify-center">
                <div class="col-11">
                    <q-field :error="$v.confirm_password.$error"
                             error-label="Password tidak sama">
                        <q-input type="password"
                                 :before="[{icon: 'ion-unlocked', handler(){}}]"
                                 placeholder="Konfirmasi password"
                                 class="group"
                                 v-model="confirm_password"
                                 @blur="$v.confirm_password.$touch"></q-input>
                    </q-field>
                </div>
            </div>

            <div class="row justify-center">
                <div class="col-11">
                    <q-field :error="false"
                             error-label="">
                        <q-input type="text"
                                 placeholder="Nama depan"
                                 class="group"
                                 v-model="first_name"></q-input>
                    </q-field>
                </div>
            </div>

            <div class="row justify-center">
                <div class="col-11">
                    <q-field :error="false"
                             error-label="">
                        <q-input type="text"
                                 placeholder="Nama belakang"
                                 class="group"
                                 v-model="last_name"></q-input>
                    </q-field>
                </div>
            </div>

            <div class="row justify-center"
                 style="margin: 50px 0 35px 0;">
                <div class="col-11">
                    <q-btn color="negative"
                           class="full-width uppercase"
                           big
                           @click="process_daftar()"
                           :disabled="$v.$invalid">
                        daftar
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
                   @click="btnLogin">SUDAH DAFTAR?
            </q-btn>
        </q-toolbar>
    </q-layout>
</template>

<script>
    import {required, email, sameAs, minLength} from 'vuelidate/lib/validators';
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
                email: null,
                password: null,
                confirm_password: null,
                first_name: null,
                last_name: null,
                pesan: null
            }
        },
        validations: {
            username: {required},
            email: {required, email},
            password: {
                required,
                minLength: minLength(3)
            },
            confirm_password: {
                sameAs: sameAs('password')
            }
        },
        methods: {
            btnLogin() {
                this.$router.push({name: 'login'});
            },
            process_daftar() {
                const formDaftar = new FormData;
                formDaftar.set('username', this.username);
                formDaftar.set('email', this.email);
                formDaftar.set('password', this.password);
                formDaftar.set('first_name', this.first_name);
                formDaftar.set('last_name', this.last_name);

                this.$store.commit('set_errors', null);
                this.$store.dispatch('req_register', {user: this.username, formData: formDaftar});

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
                        this.pesan = pesan.detail;
                        return true
                    } else {
                        this.pesan = null;
                        return false;
                    }
                },
                set(val) {
                    return;
                }
            },
            check_email() {
                if (!this.$v.email.required) {
                    return 'Email tidak boleh kosong';
                } else {
                    return 'Harus dalam format email';
                }
            },
            check_password() {
                if (!this.$v.password.required) {
                    return 'Password tidak boleh kosong'
                } else if (!this.$v.password.minLength) {
                    return 'Minimum password 3 karakter'
                }
            }
        }
    }
</script>

<style lang="stylus">

</style>
