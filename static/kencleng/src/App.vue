<template>
    <!-- Don't drop "q-app" class -->
    <div id="q-app">
        <q-transition enter="bounceInLeft"
                      leave="bounceOutLeft"
                      mode="out-in">
            <router-view/>
        </q-transition>
    </div>
</template>

<script>
    import 'quasar-extras/animate/bounceInLeft.css'
    import 'quasar-extras/animate/bounceOutLeft.css'
    import {
        QTransition,
    } from 'quasar';
    export default {
        components: {
            QTransition,
        }
    }
</script>

<style lang="stylus">
</style>
