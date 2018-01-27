<template>
    <div class="layout-padding">
        <q-card
            class="bg-white"
            style="margin: 0 0 12px 0;">
            <q-card-title>
                Modifikasi Profil
            </q-card-title>
            <q-card-main>
                <q-field :error="false"
                         error-label="">
                    <q-input type="text"
                             autofocus
                             :before="[{icon: 'ion-chatbubble', handler(){}}]"
                             placeholder="Nama depan"
                             class="group"
                             v-model="nama_depan"></q-input>
                </q-field>

                <q-field :error="false"
                         error-label="">
                    <q-input type="text"
                             :before="[{icon: 'ion-chatbox', handler(){}}]"
                             placeholder="Nama belakang"
                             class="group"
                             v-model="nama_belakang"></q-input>
                </q-field>

                <q-field :error="$v.email.$error"
                         :error-label="check_email">
                    <q-input type="email"
                             :before="[{icon: 'ion-email', handler(){}}]"
                             placeholder="Email"
                             class="group"
                             v-model="email"
                             @blur="$v.email.$touch"></q-input>
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
    import {required, email, sameAs, minLength} from 'vuelidate/lib/validators';
    import {
        Toast,
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
                token: null,
                nama_depan: null,
                nama_belakang: null,
                email: null
            }
        },
        validations: {
            email: {required, email}
        },
        created() {
            const data = JSON.parse(localStorage.getItem('token'));
            this.token = data.token;
            Loading.show({
                spinner: QSpinnerFacebook
            });
            this.$store.dispatch('req_current_user', {token: this.token})
                .then(res => {
                    this.nama_depan = res.data.nama_depan;
                    this.nama_belakang = res.data.nama_belakang;
                    this.email = res.data.email;
                    Loading.hide();
                }).catch(err => {
                    console.log(err.response.data);
                    Loading.hide();
            });
        },
        components: {
            Toast,
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
                const profilForm = new FormData();
                profilForm.set('first_name', this.nama_depan);
                profilForm.set('last_name', this.nama_belakang);
                profilForm.set('email', this.email);

                Loading.show({
                    spinner: QSpinnerFacebook
                });

                this.$store.dispatch('req_ubahProfil', {
                    token: this.token,
                    formData: profilForm
                }).then(() => {
                    Loading.hide();
                    Toast.create.positive('Profil berhasil disimpan');
                }).catch(() => {
                    Loading.hide();
                    Toast.create.negative('Ada kesalahan penyimpanan profil');
                });
            }
        },
        computed: {
            check_email() {
                if (!this.$v.email.required) {
                    return 'Email tidak boleh kosong';
                } else {
                    return 'Harus dalam format email';
                }
            }
        }
    }
</script>

<style scoped>

</style>
