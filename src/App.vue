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
import BaseLine from "./layouts/BaseLine";

export default {
    name: "App",
    components: {},
    data: () => ({}),
    computed: {
        layout: function() {
            return BaseLine;
        }
    }
};
</script>
