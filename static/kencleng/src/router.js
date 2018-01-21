import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load(component) {
    // '@' is aliased to src/components
    return () => import(`@/${component}.vue`)
}

const router = new VueRouter({
    /*
     * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
     * it is only to be used only for websites.
     *
     * If you decide to go with "history" mode, please also open /config/index.js
     * and set "build.publicPath" to something other than an empty string.
     * Example: '/' instead of current ''
     *
     * If switching back to default "hash" mode, don't forget to set the
     * build publicPath back to '' so Cordova builds work again.
     */

    mode: 'hash',
    scrollBehavior: () => ({y: 0}),

    routes: [
        {path: '/', component: load('Main'), name: 'utama', meta: {requireAuth: true}},
        {path: '/login', component: load('Login'), name: 'login', meta: {requireAuth: false}},
        {path: '/register', component: load('Register'), name: 'register', meta: {requireAuth: false}},

        // Always leave this last one
        {path: '*', component: load('Error404'), name: 'error', meta: {requireAuth: false}}
    ]
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');

    if (to.matched.some(record => record.meta.requireAuth)) {
        if (token) {
            next();
        } else {
            next({name: 'login'});
        }
    } else {
        next();
    }
});

export default router;
