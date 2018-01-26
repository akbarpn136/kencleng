<template>
    <q-layout
        ref="layout"
        view="lHh Lpr lFf">
        <q-toolbar slot="header" color="negative">
            <q-btn
                flat
                @click="$refs.layout.toggleLeft()">
                <q-icon name="ion-android-menu"/>
            </q-btn>

            <q-toolbar-title class="text-center">
                <img src="../assets/kencleng-logo.svg"
                     style="width: 70px">
            </q-toolbar-title>

            <q-btn flat @click="basicModalShow('tambah')">
                <q-icon name="ion-plus-round"/>
            </q-btn>
        </q-toolbar>

        <div slot="left">
            <!--
              Use <q-side-link> component
              instead of <q-item> for
              internal vue-router navigation
            -->

            <q-list no-border link inset-delimiter class="no-padding">
                <q-list-header class="bg-primary text-white uppercase">{{user || 'Anonymouse'}}</q-list-header>
                <q-item :to="{name: 'utama'}">
                    <q-item-side icon="ion-home" class="text-white"/>
                    <q-item-main label="Utama" class="text-white text-bold"/>
                </q-item>
                <q-item>
                    <q-item-side icon="ion-android-person" class="text-white"/>
                    <q-item-main label="Profil" class="text-white text-bold"/>
                </q-item>
                <q-item>
                    <q-item-side icon="ion-email" class="text-white"/>
                    <q-item-main label="Tentang aplikasi" class="text-white text-bold"/>
                </q-item>
            </q-list>
        </div>

        <div class="layout-padding">
            <q-alert
                color="blue"
                icon="ion-information-circled"
                style="margin-bottom: 25px;" v-if="alertShow">
                Transaksi masih kosong. Coba tambah baru.
            </q-alert>
            <q-infinite-scroll ref="inf"
                               :handler="loadMore">
                <q-card
                    class="bg-white"
                    v-for="trans of transaksi_lokal"
                    :key="trans.id"
                    style="margin: 0 0 12px 0;">
                    <q-card-title>
                        {{trans.dibuat | tgl}}
                        <q-icon link slot="right" name="more_vert">
                            <q-popover ref="popover">
                                <q-list link class="no-border">
                                    <q-item @click="$refs.popover.close()">
                                        <q-item-main label="Ubah"/>
                                    </q-item>
                                    <q-item @click="onKelolaTransaksi(trans.id, 'hapus')">
                                        <q-item-main label="Hapus"/>
                                    </q-item>
                                </q-list>
                            </q-popover>
                        </q-icon>
                    </q-card-title>
                    <q-card-main>
                        {{trans.deskripsi}}
                        <div class="text-right" style="margin-top: 15px;">
                        <span class="text-italic"
                              :class="(parseInt(trans.jumlah) > 0 ? 'text-positive':'text-negative')">{{trans.jumlah}}</span>
                        </div>
                    </q-card-main>
                </q-card>

                <div slot="message" class="row justify-center">
                    <q-spinner-facebook
                        color="tertiary"
                        :size="35"></q-spinner-facebook>
                </div>
            </q-infinite-scroll>
        </div>
        <q-modal ref="basicModal"
                 v-model="buka"
                 position="bottom" :content-css="{'padding-right': '15px', 'padding-left': '15px'}">
            <div class="layout-padding">
                <h4 style="margin-bottom: 35px;">{{this.mode | capitalize}} Transaksi</h4>
                <q-field :error="$v.deskripsi.$error"
                         error-label="Deskripsi harus diisi">
                    <q-input type="textarea"
                             autofocus
                             :before="[{icon: 'ion-document-text', handler(){}}]"
                             placeholder="Deskripsi transaksi"
                             class="group"
                             v-model="deskripsi"
                             @blur="$v.deskripsi.$touch"></q-input>
                </q-field>

                <q-field :error="$v.jumlah.$error"
                         error-label="Jumlah transaksi harus ada"
                         style="margin-bottom: 25px;">
                    <q-input type="number"
                             :before="[{icon: 'ion-cash', handler(){}}]"
                             placeholder="Harga transaksi"
                             class="group"
                             v-model="jumlah"
                             @blur="$v.jumlah.$touch"></q-input>
                </q-field>

                <div class="row sm-gutter">
                    <div class="col">
                        <q-btn color="primary"
                               class="full-width"
                               @click="prosesTransaksi(1)"
                               :disabled="$v.$invalid">
                            Uang Masuk
                        </q-btn>
                    </div>

                    <div class="col">
                        <q-btn color="negative"
                               class="full-width"
                               @click="prosesTransaksi(-1)"
                               :disabled="$v.$invalid">
                            Uang Keluar
                        </q-btn>
                    </div>
                </div>
            </div>
        </q-modal>
        <q-toolbar slot="footer">
            <q-toolbar-title class="text-center">
                Saldo: {{saldo}}
            </q-toolbar-title>
        </q-toolbar>
    </q-layout>
</template>

<script>
    import {required} from 'vuelidate/lib/validators';
    import {
        Dialog,
        QAlert,
        QLayout,
        QToolbar,
        QToolbarTitle,
        QBtn,
        QIcon,
        QList,
        QListHeader,
        QItem,
        QItemSide,
        QItemMain,
        QCard,
        QCardTitle,
        QCardMain,
        QPopover,
        QInfiniteScroll,
        QSpinnerFacebook,
        QModal,
        QField,
        QInput
    } from 'quasar';

    export default {
        name: 'utama',
        components: {
            QAlert,
            QLayout,
            QToolbar,
            QToolbarTitle,
            QBtn,
            QIcon,
            QList,
            QListHeader,
            QItem,
            QItemSide,
            QItemMain,
            QCard,
            QCardTitle,
            QCardMain,
            QPopover,
            QInfiniteScroll,
            QSpinnerFacebook,
            QModal,
            QField,
            QInput
        },
        data() {
            return {
                user: null,
                token: null,
                alertShow: false,
                buka: false,
                mode: null,
                jumlah: 0,
                deskripsi: null
            }
        },
        validations: {
            jumlah: {required},
            deskripsi: {required}
        },
        mounted() {
            const data = JSON.parse(localStorage.getItem('token'));
            this.user = data.user;
            this.token = data.token;

            this.$store.commit('reset_transaksi_lokal');
            this.hitungSaldo();
        },
        computed: {
            transaksi_addon() {
                return this.$store.getters.get_transaksi_addon ? this.$store.getters.get_transaksi_addon : {};
            },
            transaksi_lokal() {
                return this.$store.getters.get_transaksi_lokal ? this.$store.getters.get_transaksi_lokal : [];
            },
            transaksi() {
                return this.$store.getters.get_transaksi ? this.$store.getters.get_transaksi : {};
            },
            saldo() {
                return this.$store.getters.get_saldo ? this.$store.getters.get_saldo : 0;
            }
        },
        methods: {
            hitungSaldo() {
                this.$store.dispatch('req_saldo', {
                    token: this.token
                }).then((res) => {
                    this.$store.commit('set_saldo', res.data.detail);
                }).catch((err) => {
                    this.$store.commit('set_errors', err.response.data);
                });
            },
            basicModalShow(mode) {
                this.buka = true;
                this.mode = mode;
            },
            loadMore(index, done) {
                setTimeout(() => {
                    this.$store.dispatch('req_transaksi', {
                        token: this.token,
                        page: index
                    }).then((res) => {
                        this.$store.commit('set_transaksi', res.data);
                        this.$store.commit('set_transaksi_lokal', {
                            data: this.transaksi.results,
                            mode: 'online'
                        });
                    }).catch((err) => {
                        this.$store.commit('set_errors', err.response.data);
                    });

                    if (this.transaksi.count > 0) {
                        this.alertShow = false;
                        if (this.transaksi.previous && !this.transaksi.next) {
                            this.$refs.inf.stop();
                        }
                        else if (!this.transaksi.previous && !this.transaksi.next) {
                            this.$refs.inf.stop();
                        }
                    } else if (this.transaksi.count === 0) {
                        this.$refs.inf.stop();
                        this.alertShow = true;
                    }

                    done();
                }, 1000)
            },
            prosesTransaksi(gain) {
                const transaksiForm = new FormData();
                let transaksiLokal = this.$store.getters.get_transaksi_lokal;

                if (!this.$v.$invalid) {
                    transaksiForm.set('deskripsi', this.deskripsi);
                    transaksiForm.set('jumlah', gain * this.jumlah);

                    this.$store.dispatch('req_tambahTransaksi', {
                        formData: transaksiForm,
                        token: this.token
                    }).then((res) => {
                        this.$store.commit('set_transaksi_addon', res.data);
                        this.buka = false;
                        this.alertShow = false;
                        this.$store.commit('set_transaksi_lokal', {
                            data: [this.transaksi_addon],
                            mode: 'offline'
                        });
                        this.$store.commit('hitung_saldo', gain * this.jumlah);
                        this.deskripsi = null;
                        this.jumlah = 0;
                    }).catch((err) => {
                        this.$store.commit('set_errors', err.response.data);
                    });
                }
            },
            onKelolaTransaksi(id, mode) {
                if (mode === 'hapus') {
                    Dialog.create({
                        title: 'Perhatian',
                        message: 'Transaksi yang dihapus tidak dapat dikembalikan lagi.',
                        buttons: [
                            'Batal',
                            {
                                label: 'OK, Hapus.',
                                color: 'negative',
                                handler: () => {
                                    this.$store.dispatch('req_hapusTransaksi', {
                                        id,
                                        token: this.token
                                    }).then(() => {
                                        this.$store.commit('hapus_transaksi_lokal_tertentu', {
                                            id,
                                            data: this.transaksi_lokal
                                        });
                                        this.hitungSaldo();

                                        if (this.transaksi_lokal.length === 0) {
                                            this.alertShow = true;
                                        }
                                    }).catch((err) => {
                                        context.commit('set_errors', err.response.data);
                                    });
                                }
                            }
                        ]
                    });
                } else {
                    console.log('ubah')
                }
            }
        },
        filters: {
            tgl: function (value) {
                let options = {year: 'numeric', month: 'long', day: 'numeric'};
                return new Date(value).toLocaleDateString('id', options);
            }
        }
    }
</script>

<style lang="stylus">
</style>
