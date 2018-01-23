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

            <q-btn flat>
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

        <!--
          Replace following <div> with
          <router-view /> component
          if using subRoutes
        -->
        <div class="layout-padding">
            <q-alert
                color="blue"
                icon="ion-information-circled"
                style="margin-bottom: 25px;" v-if="false">
                Transaksi masih kosong. Coba tambah baru.
            </q-alert>

            <q-card
                class="bg-white"
                v-else
                v-for="trans of transaksi.results"
                :key="trans.id"
                style="margin: 0 0 12px 0;">
                <q-card-title>
                    {{trans.dibuat | tgl}}
                    <q-icon link slot="right" name="more_vert">
                        <q-popover ref="popover">
                            <q-list link class="no-border">
                                <q-item @click="$refs.popover.close()">
                                    <q-item-main label="Remove Card"/>
                                </q-item>
                                <q-item @click="$refs.popover.close()">
                                    <q-item-main label="Send Feedback"/>
                                </q-item>
                                <q-item @click="$refs.popover.close()">
                                    <q-item-main label="Share"/>
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
        </div>
        <q-toolbar slot="footer">
            <q-toolbar-title class="text-center">
                Saldo: {{saldo.detail.jumlah__sum | currency}}
            </q-toolbar-title>
        </q-toolbar>
    </q-layout>
</template>

<script>
    import {
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
        QPopover
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
            QPopover
        },
        data() {
            return {
                user: null,
                token: null
            }
        },
        mounted() {
            const data = JSON.parse(localStorage.getItem('token'));
            this.user = data.user;
            this.token = data.token;
            this.$store.dispatch('req_transaksi', {
                token: this.token,
                page: 1
            });
            this.$store.dispatch('req_saldo', {
                token: this.token
            });
        },
        computed: {
            transaksi() {
                return this.$store.getters.get_transaksi;
            },
            saldo() {
                return this.$store.getters.get_saldo;
            }
        },
        methods: {
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
