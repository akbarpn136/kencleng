<template>
    <div>
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

            <div class="row justify-center gap-4-top">
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

            <div class="row justify-center gap-3">
                <div class="col-11">
                    <q-btn color="negative"
                           class="full-width"
                           big
                           @click="process_auth()"
                           :disabled="$v.username.$invalid || $v.password.$invalid">MASUK</q-btn>
                </div>
            </div>
        </div>

        <div class="fixed-bottom">
            <q-btn color="primary"
                   class="full-width"
                   big>BELUM DAFTAR?</q-btn>
        </div>
    </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators';
    import 'quasar-extras/animate/bounceInDown.css'
    import 'quasar-extras/animate/bounceOutUp.css'
    import {
        QField,
        QInput,
        QBtn,
        QAlert
    } from 'quasar';

    export default {
        name: "login",
        components: {
            QField,
            QInput,
            QBtn,
            QAlert
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
            process_auth() {
                const formAuth = new FormData;
                formAuth.set('username', this.username);
                formAuth.set('password', this.password);

                this.$store.commit('set_errors', null);
                this.$store.dispatch('req_credential', {user: this.username, formData: formAuth});
                this.$router.push({name: 'main'});
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
    add-gap() {
        margin: arguments
    }

    .gap {
        add-gap: 25px 0
        &-1 {
            add-gap: 35px 0
            &-top {
                add-gap: 35px 0 0 0
            }
        }

        &-2 {
            add-gap: 45px 0
            &-top {
                add-gap: 45px 0 0 0
            }
        }

        &-3 {
            add-gap: 55px 0
            &-top {
                add-gap: 55px 0 0 0
            }
        }

        &-4 {
            add-gap: 65px 0
            &-top {
                add-gap: 65px 0 0 0
            }
        }
    }
</style>
