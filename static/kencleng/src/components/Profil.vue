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
                nama_depan: null,
                nama_belakang: null,
                email: null
            }
        },
        validations: {
            email: {required, email}
        },
        components: {
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
