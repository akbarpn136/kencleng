<template>
    <div>
        <div class="layout-padding">
            <div class="row justify-center">
                <div class="col-8">
                    <img src="../assets/kencleng-logo.svg">
                </div>
            </div>

            <div class="row justify-center gap-4-top">
                <div class="col-11">
                    <q-field :error="false"
                             error-label="">
                        <q-input type="text"
                                 :before="[{icon: 'ion-android-person', handler(){}}]"
                                 placeholder="Username"
                                 class="group"
                                 v-model="username" autofocus></q-input>
                    </q-field>
                </div>
            </div>

            <div class="row justify-center">
                <div class="col-11">
                    <q-field :error="false"
                             error-label="">
                        <q-input type="password"
                                 :before="[{icon: 'ion-android-lock', handler(){}}]"
                                 placeholder="Password"
                                 class="group"
                                 v-model="password"></q-input>
                    </q-field>
                </div>
            </div>

            <div class="row justify-center gap-3">
                <div class="col-11">
                    <q-btn color="negative"
                           class="full-width" big>MASUK</q-btn>
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
    import {
        QField,
        QInput,
        QBtn
    } from 'quasar';

    export default {
        name: "login",
        components: {
            QField,
            QInput,
            QBtn
        },
        data() {
            return {
                username: null,
                password: null
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
