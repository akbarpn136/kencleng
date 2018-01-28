<template>
    <div class="layout-padding">
        <q-card class="bg-white">
            <q-card-media>
                <div class="q-video">
                    <iframe width="560" height="325" src="https://www.youtube.com/embed/_0NarCGgPjw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
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
