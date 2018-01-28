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
                       @click="ganti_password"
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
        Toast,
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
                token: null,
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
        created() {
            const data = JSON.parse(localStorage.getItem('token'));
            this.token = data.token;
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
            ganti_password() {
                const passwordForm = new FormData();
                passwordForm.set('new_password', this.password_baru);
                passwordForm.set('old_password', this.password_lama);

                Loading.show({
                    spinner: QSpinnerFacebook
                });

                this.$store.dispatch('req_ubahPassword', {
                    formData: passwordForm,
                    token: this.token
                }).then(() => {
                    Loading.hide();
                    Toast.create.positive('Password berhasil diganti');
                }).catch((err) => {
                    Loading.hide();
                    if (navigator.onLine) {
                        Toast.create.negative('Sorry. No network connection');
                    } else {
                        Toast.create.negative(`Error: ${err.response.data.detail}`);
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
