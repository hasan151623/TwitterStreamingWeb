<template>
    <div>
        <v-card class="mxauto" flat>
            <v-toolbar>
                <div class="flex-grow-1"></div>
                <v-text-field
                    v-model="tag"
                    placeholder="Enter tag i.e serverless, aws etc"
                    clearable
                    required
                ></v-text-field>
                <div class="flex-grow-1"></div>
                <div>
                    <vue-element-loading
                        :active="startStreaming"
                        spinner="bar-fade-scale"
                        text="Streaming"
                        duration="1.0"
                    />
                    <v-btn color="primary" @click="startLiveStreaming" :disabled="start || !tag">
                        Start
                        <v-icon right>mdi-restart</v-icon>
                    </v-btn>
                </div>
                <v-btn class="ma-2" color="error" :disabled="!start" @click="stopLiveStreaming">
                    Stop
                    <v-icon right>mdi-stop</v-icon>
                </v-btn>
            </v-toolbar>
        </v-card>

        <div class="mt-2">
            <vue-element-loading :active="loading" spinner="spinner" duration="1.0" />
            <v-list v-if="tweets.length">
                <template v-for="(tweet, index) in tweets">
                    <v-list-item :key="tweet.id" @click="goToTwitter(tweet.tweet_id_str)">
                        <v-list-item-content>
                            <twitter-card :tweet="tweet"></twitter-card>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </div>

        <v-card v-if="!tag" class="mt-2">
            <div class="pa-2">
                <p
                    class="text-center"
                >Enter text to search for relevant live tweets. Live tweets will be refreshed at 20 seconds interval</p>
            </div>
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
    "https://hfgotho0xe.execute-api.us-west-2.amazonaws.com/dev/get_live_tweets";
const TWITTER_LIVE_STREAMING_API_TIME_INTERVAL = 21000;
const GET_RECENT_TWEETS_API_TIME_INTERVAL = 20000;

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
        loading: false
    }),
    methods: {
        startLiveStreaming() {
            if (!this.tag) {
                return;
            }
            this.startStreaming = true;
            // this.getTweets(this.tag);
            this.streamTweets();
            this.requestForStreaming = setInterval(
                this.streamTweets,
                TWITTER_LIVE_STREAMING_API_TIME_INTERVAL
            );
            // console.log(
            //     "starting request for streaming",
            //     this.requestForStreaming
            // );
            let parent = this;

            this.requestToListLiveTweets = setInterval(function() {
                parent.getTweets(parent.tag);
            }, GET_RECENT_TWEETS_API_TIME_INTERVAL);
            // console.log(
            //     "starting request for list live tweets",
            //     this.requestToListLiveTweets
            // );
        },
        streamTweets() {
            let parent = this;
            // console.log("streaming from twitter");
            axios({
                method: "post",
                url: TWITTER_LIVE_STREAMING_API,
                data: {
                    tags: [parent.tag]
                }
            })
                .then(function(response) {
                    // console.log("resp", response.data);
                })
                .catch(function(error) {
                    console.log("error", error);
                });
        },
        getTweets(tag = null) {
            // console.log("getting tweets from backend");
            let parent = this;
            parent.loading = true;

            axios({
                method: "get",
                url: GET_RECENT_TWEETS_API + (tag ? "?tag=" + tag : "")
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
            this.loading = false;
            this.tag = "";
            clearInterval(this.requestForStreaming);
            clearInterval(this.requestToListLiveTweets);
            // console.log(
            //     "starting request for streaming",
            //     this.requestForStreaming
            // );
            // console.log(
            //     "starting request for list live tweets",
            //     this.requestToListLiveTweets
            // );
        },
        goToTwitter(tweetID) {
            window.open(`https://twitter.com/user/status/${tweetID}`, "_blank");
        }
    },
    beforeDestroy() {
        this.stopLiveStreaming();
    }
};
</script>