<template>
    <div>
        <!-- <vue-element-loading :active="loading" size="100" spinner="spinner" color="#FF6700" /> -->
        <vue-element-loading :active="loading" spinner="bar-fade-scale" duration="1.0" />
        <v-card width="1024" class="mxauto">
            <v-toolbar>
                <v-toolbar-title>Live Tweets</v-toolbar-title>
                <div class="flex-grow-1"></div>
            
                    <v-text-field v-model="tag" placeholder="Enter tag i.e serverless, aws etc" required></v-text-field>
            
                <div class="flex-grow-1"></div>

                <div>
                    <vue-element-loading :active="startStreaming" spinner="bar-fade-scale" text="Streaming" duration="1.0" />
                    <v-btn color="primary" @click="startLiveStreaming" :disabled="start || !tag">Start
                </v-btn>
                </div>
                <v-btn class="ma-2" color="error" :disabled="!start" @click="stopLiveStreaming">Stop</v-btn>
            </v-toolbar>

            <v-list three-line>
                <template v-for="(tweet, index) in tweets">
                    <v-list-item :key="tweet.id" @click>
                        <v-list-item-content>
                            <twitter-card :tweet="tweet"></twitter-card>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-card>
    </div>
</template>
</template>

<script>
import axios from "axios";
import TwitterCard from "./TwitterCard.vue";
import VueElementLoading from "vue-element-loading";
const TWITTER_LIVE_STREAMING_API =
    "https://hfgotho0xe.execute-api.us-west-2.amazonaws.com/dev/stream_tweets/";
const GET_RECENT_TWEETS_API =
    "https://hfgotho0xe.execute-api.us-west-2.amazonaws.com/dev/get_tweets";

export default {
    components: {
        TwitterCard,
        VueElementLoading
    },
    computed: {
        start() {
            return this.startStreaming;
        }
    },
    data: () => ({
        startStreaming: false,
        requestForStreaming: null,
        requestToListLiveTweets: null,
        tweets: [],
        tag: "",
        loading: true
    }),
    methods: {
        startLiveStreaming() {
            console.log("tag", this.tag, !this.tag);
            if (!this.tag) {
                return;
            }
            this.startStreaming = true;
            this.streamTweets();
            this.requestForStreaming = setInterval(this.streamTweets, 25000);
            console.log(
                "starting request for streaming",
                this.requestForStreaming
            );
        },
        streamTweets() {
            let parent = this;
            console.log("streaming from twitter");
            axios({
                method: "post",
                url: TWITTER_LIVE_STREAMING_API,
                data: {
                    tags: [parent.tag]
                }
            })
                .then(function(response) {
                    console.log("resp", response.data);
                })
                .catch(function(error) {
                    console.log("error", error);
                });
        },
        getTweets() {
            console.log("getting tweets from backend");
            let parent = this;
            parent.loading = true;
            axios({
                method: "get",
                url: GET_RECENT_TWEETS_API
            })
                .then(function(response) {
                    parent.loading = false;
                    parent.tweets = response.data;
                })
                .catch(function(error) {
                    console.log("error", error);
                });
        },

        stopLiveStreaming() {
            this.startStreaming = false;
            this.tag = "";
            clearInterval(this.requestForStreaming);
            clearInterval(this.requestToListLiveTweets);
            console.log(
                "starting request for streaming",
                this.requestForStreaming
            );
            console.log(
                "starting request for list live tweets",
                this.requestToListLiveTweets
            );
        }
    },
    created() {
        this.getTweets();
        this.requestToListLiveTweets = setInterval(this.getTweets, 30000);
        console.log(
            "starting request for list live tweets",
            this.requestToListLiveTweets
        );
        // this.getTweets();
    },
    beforeDestroy() {
        this.stopLiveStreaming();
    }
};
</script>