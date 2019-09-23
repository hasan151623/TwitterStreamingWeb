<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" clipped app>
            <v-list dense>
                <template v-for="item in items">
                    <v-list-item :key="item.text" :to="item.link">
                        <v-list-item-action>
                            <v-icon color="item.iconColor">{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>{{ item.text }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar clipped-left app color="blue darken-3" dark>
            <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <span class="hidden-sm-and-down">Twitter Live-Streaming</span>
            </v-toolbar-title>
        </v-app-bar>
        <v-content>
            <v-container>
                <slot></slot>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        drawer: null,
        items: [
            { icon: "mdi-twitter", text: "Live Tweets", link: "/", iconColor: "#26c6da"},
            { icon: "mdi-history", text: "Past Tweets", link: "/past_tweets", iconColor: "#26c6da"}
        ]
    })
};
</script>