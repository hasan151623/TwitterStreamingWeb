import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "live_tweets",
            component: () => import("./components/TwitterStreaming/Tweets.vue")
        },
        {
            path: "/past_tweets",
            name: "past_tweets",
            component: () =>
                import("./components/TwitterStreaming/PastTweets.vue")
        }
        // {
        //   path: "/about",
        //   name: "about",
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () =>
        //     import(/* webpackChunkName: "about" */ "./views/About.vue")
        // }
    ]
});
