<template>
    <v-app>
        <component v-bind:is="layout">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </component>
    </v-app>
</template>

<script>
import BaseLayout from "./layouts/BaseLayout";

export default {
    name: "App",
    components: {},
    data: () => ({}),
    computed: {
        layout: function() {
            return BaseLayout;
        }
    }
};
</script>
