import { defineAsyncComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";

// import NotFound from './pages/NotFound.vue';
import CoachList from './pages/coaches/CoachList.vue';
import CoachDetails from './pages/coaches/CoachDetails.vue';
// import CoachRegister from './pages/coaches/CoachRegister.vue';
import RequestCoach from './pages/requests/RequestCoach.vue';
// import RequestList from './pages/requests/RequestList.vue';
// import AuthUser from './pages/auth/UserAuth.vue';

const NotFound = defineAsyncComponent(() => import('./pages/NotFound.vue'));
const RequestList = defineAsyncComponent(() => import('./pages/requests/RequestList.vue'));
const CoachRegister = defineAsyncComponent(() => import('./pages/coaches/CoachRegister.vue'));
const AuthUser = defineAsyncComponent(() => import('./pages/auth/UserAuth.vue'));
// const RequestCoach = defineAsyncComponent(() => import('./pages/requests/RequestCoach.vue'));

import store from './store/index.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/coaches'},
        {path: '/coaches', component: CoachList},
        {path: '/coaches/:id', component: CoachDetails, props: true, children: [
            {path: 'contact', component: RequestCoach},
        ]},
        {path: '/register', component: CoachRegister, meta: { requireAuth: true }},
        {path: '/requests', component: RequestList, meta: { requireAuth: true }},
        {path: '/auth', component: AuthUser, meta: { requireUnAuth : true }},
        {path: '/:notFound(.*)', component: NotFound}
    ]
});

router.beforeEach(function(to, _, next) {
    if(to.meta.requireAuth && !store.getters.isAuthenticated)
    next('/auth')
    else if(to.meta.requireUnAuth && store.getters.isAuthenticated)
    next('/coaches')
    else
    next();

})

export default router;