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
            <q-list no-border link inset-delimiter class="no-padding">
                <q-list-header class="bg-primary text-white uppercase">{{user || 'Anonymouse'}}</q-list-header>
                <q-side-link item exact :to="{name: 'utama'}">
                    <q-item-side icon="ion-home" class="text-white"/>
                    <q-item-main label="Utama" class="text-white text-bold"/>
                </q-side-link>
                <q-side-link item :to="{name: 'profil'}">
                    <q-item-side icon="ion-android-person" class="text-white"/>
                    <q-item-main label="Profil" class="text-white text-bold"/>
                </q-side-link>
                <q-item>
                    <q-item-side icon="ion-email" class="text-white"/>
                    <q-item-main label="Tentang aplikasi" class="text-white text-bold"/>
                </q-item>
                <q-item>
                    <q-btn
                        color="negative"
                        class="full-width fixed-bottom layout-padding"
                        icon="ion-log-out"
                        @click="onKeluar">
                        Keluar
                    </q-btn>
                </q-item>
            </q-list>
        </div>

        <q-tabs slot="navigation" align="justify" v-if="routeTertentu">
            <q-route-tab slot="title" :to="{name: 'profil'}" default replace label="Nama"/>
            <q-route-tab slot="title" :to="{name: 'password'}" replace label="Password"/>
        </q-tabs>

        <div class="layout-padding"
             v-if="$route.name === 'utama'">
            <q-alert
                color="secondary"
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
                                    <q-item @click="onKelolaTransaksi(trans.id, 'ubah')">
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
                         :error-label="cek_jumlah"
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
        <router-view></router-view>
        <q-toolbar
            slot="footer"
            v-if="$route.name === 'utama'">
            <q-toolbar-title class="text-center">
                Saldo: {{saldo}}
            </q-toolbar-title>
        </q-toolbar>
    </q-layout>
</template>

<script>
    import {required, minValue} from 'vuelidate/lib/validators';
    import {
        Toast,
        Loading,
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
        QSideLink,
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
        QInput,
        QTabs,
        QRouteTab,
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
            QSideLink,
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
            QInput,
            QTabs,
            QRouteTab,
        },
        data() {
            return {
                id: null,
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
            jumlah: {
                required,
                minValue: minValue(0)
            },
            deskripsi: {required}
        },
        mounted() {
            const data = JSON.parse(localStorage.getItem('token'));
            this.user = data.user;
            this.token = data.token;
            this.$store.commit('reset_transaksi_lokal');
            if (this.$route.name === 'utama') {
                this.hitungSaldo();
            }
        },
        beforeRouteUpdate(to, from, next) {
            this.$store.commit('reset_transaksi_lokal');
            next();
        },
        computed: {
            routeTertentu() {
                if (this.$route.name === 'profil')
                {return true;}
                else if(this.$route.name === 'password') {return true}
            },
            cek_jumlah() {
                if (!this.$v.jumlah.required) {
                    return "Tidak boleh kosong.";
                } else if (!this.$v.jumlah.minValue) {
                    return "Tidak boleh kurang dari 0.";
                }
            },
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
            clearForm() {
                this.jumlah = 0;
                this.deskripsi = null;
            },
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
                        Loading.hide();
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
                    } else if (!navigator.onLine) {
                        Toast.create.negative('Sorry. No network connection');
                        this.$refs.inf.stop();
                    }

                    done();
                }, 1000)
            },
            prosesTransaksi(gain) {
                let dispatch_mode = null;
                const transaksiForm = new FormData();
                let transaksiLokal = this.$store.getters.get_transaksi_lokal;

                if (!this.$v.$invalid) {
                    this.buka = false;
                    Loading.show({
                        spinner: QSpinnerFacebook
                    });

                    transaksiForm.set('deskripsi', this.deskripsi);
                    transaksiForm.set('jumlah', gain * this.jumlah);

                    if (this.mode === 'ubah') {
                        dispatch_mode = 'req_ubahTransaksi';
                    } else {
                        dispatch_mode = 'req_tambahTransaksi';
                    }

                    this.$store.dispatch(dispatch_mode, {
                        id: this.id,
                        formData: transaksiForm,
                        token: this.token
                    }).then((res) => {
                        this.$store.commit('set_transaksi_addon', res.data);
                        this.alertShow = false;
                        if (this.mode === 'ubah') {
                            this.$store.commit('update_transaksi_lokal', {
                                lama: this.transaksi_lokal,
                                baru: this.transaksi_addon,
                                index: this.transaksi_lokal.findIndex((el) => {return el.id === this.id})
                            });
                            this.hitungSaldo();
                        } else {
                            this.$store.commit('set_transaksi_lokal', {
                                data: [this.transaksi_addon],
                                mode: 'offline'
                            });
                            this.$store.commit('hitung_saldo', gain * this.jumlah);
                        }

                        this.clearForm();
                        Loading.hide();
                    }).catch((err) => {
                        this.$store.commit('set_errors', err.response.data);
                        if (!navigator.onLine) Loading.hide();
                    });

                    if (!navigator.onLine) {
                        Loading.hide();
                        Toast.create.negative('Sorry. No network connection');
                    }
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
                                label: 'OK, Hapus',
                                color: 'negative',
                                handler: () => {
                                    Loading.show({
                                        spinner: QSpinnerFacebook
                                    });
                                    this.$store.dispatch('req_hapusTransaksi', {
                                        id,
                                        token: this.token
                                    }).then(() => {
                                        this.$store.commit('set_transaksi_lokal_tertentu', {
                                            id,
                                            data: this.transaksi_lokal,
                                            mode
                                        });
                                        this.hitungSaldo();

                                        if (this.transaksi_lokal.length === 0) {
                                            this.alertShow = true;
                                        }
                                        Loading.hide();
                                    }).catch((err) => {
                                        context.commit('set_errors', err.response.data);
                                    });
                                }
                            }
                        ]
                    });
                } else {
                    this.basicModalShow(mode);
                    this.$store.commit('set_transaksi_lokal_tertentu', {
                        id,
                        data: this.transaksi_lokal,
                        mode
                    });

                    const data_transaksi = this.$store.getters.get_transaksi_addon;
                    this.jumlah = (data_transaksi[0].jumlah > 0) ? data_transaksi[0].jumlah : -1 * data_transaksi[0].jumlah;
                    this.deskripsi = data_transaksi[0].deskripsi;
                    this.id = data_transaksi[0].id;
                }
            },
            onKeluar() {
                this.$store.commit('set_credential');
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
