<template>
    <q-layout
        ref="layout"
        view="lHh Lpr fff">
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
                <q-list-header class="bg-primary text-white">Essential Links</q-list-header>
                <q-item>
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
        <div class="layout-padding logo-container non-selectable no-pointer-events">
            Main Page
        </div>
    </q-layout>
</template>

<script>
    import {
        QLayout,
        QToolbar,
        QToolbarTitle,
        QBtn,
        QIcon,
        QList,
        QListHeader,
        QItem,
        QItemSide,
        QItemMain
    } from 'quasar';

    export default {
        name: 'utama',
        components: {
            QLayout,
            QToolbar,
            QToolbarTitle,
            QBtn,
            QIcon,
            QList,
            QListHeader,
            QItem,
            QItemSide,
            QItemMain
        },
        data() {
            return {
            }
        },
        computed: {

        },
        methods: {
        }
    }
</script>

<style lang="stylus">
</style>
