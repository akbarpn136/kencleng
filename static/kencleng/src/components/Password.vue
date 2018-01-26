<template>
    <div class="layout-padding">
        <q-card
            class="bg-white"
            style="margin: 0 0 12px 0;">
            <q-card-title>
                Modifikasi Profil
            </q-card-title>
            <q-card-main>
                <q-field :error="$v.password_lama.$error"
                         error-label="Password lama tidak boleh kosong">
                    <q-input type="password"
                             autofocus
                             :before="[{icon: 'ion-locked', handler(){}}]"
                             placeholder="Password lama"
                             class="group"
                             v-model="password_lama"
                             @blur="$v.password_lama.$touch()"></q-input>
                </q-field>

                <q-field :error="$v.password_baru.$error"
                         error-label="Password baru tidak boleh kosong">
                    <q-input type="password"
                             :before="[{icon: 'ion-locked', handler(){}}]"
                             placeholder="Password baru"
                             class="group"
                             v-model="password_baru"
                             @blur="$v.password_baru.$touch()"></q-input>
                </q-field>

                <q-field :error="$v.password_konfirmasi.$error"
                         error-label="Password tidak cocok">
                    <q-input type="password"
                             :before="[{icon: 'ion-unlocked', handler(){}}]"
                             placeholder="Konfirmasi password"
                             class="group"
                             v-model="password_konfirmasi"
                             @blur="$v.password_konfirmasi.$touch()"></q-input>
                </q-field>

                <q-btn color="negative"
                       class="full-width uppercase"
                       big
                       @click="ganti_profil"
                       style="margin-top: 25px"
                       :disabled="$v.$invalid">
                    Simpan
                </q-btn>
            </q-card-main>
        </q-card>
    </div>
</template>

<script>
    import {required, sameAs} from 'vuelidate/lib/validators';
    import {
        QTabs,
        QRouteTab,
        Loading,
        QBtn,
        QCard,
        QCardTitle,
        QCardMain,
        QSpinnerFacebook,
        QField,
        QInput,
    } from 'quasar';

    export default {
        name: "profil",
        data() {
            return {
                password_lama: null,
                password_baru: null,
                password_konfirmasi: null
            }
        },
        validations: {
            password_lama: {required},
            password_baru: {required},
            password_konfirmasi: {sameAs: sameAs('password_baru')},
        },
        components: {
            QTabs,
            QRouteTab,
            Loading,
            QBtn,
            QCard,
            QCardTitle,
            QCardMain,
            QSpinnerFacebook,
            QField,
            QInput,
        },
        methods: {
            ganti_profil() {
                console.log('ganti')
            }
        }
    }
</script>

<style scoped>

</style>
