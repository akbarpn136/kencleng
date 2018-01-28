<template>
    <div class="layout-padding">
        <q-card class="bg-white">
            <q-card-media>
                <q-video src="https://www.youtube.com/watch?v=_0NarCGgPjw"/>
            </q-card-media>
            <q-card-title>
                Aplikasi Kencleng
                <span slot="subtitle">Simpan uang masuk dan uang keluar</span>
            </q-card-title>
            <q-card-main>
                Kali ini aplikasi diberi nama Kencleng yang digunakan untuk menyimpan data transaksi uang masuk dan uang
                keluar secara sederhana dalam bentuk aplikasi android
            </q-card-main>
        </q-card>
    </div>
</template>

<script>
    import {
        QCard,
        QCardTitle,
        QCardMain,
        QCardMedia,
        QVideo
    } from 'quasar';

    export default {
        name: "tentang",
        components: {
            QCard,
            QCardTitle,
            QCardMain,
            QCardMedia,
            QVideo
        }
    }
</script>

<style scoped>

</style>
