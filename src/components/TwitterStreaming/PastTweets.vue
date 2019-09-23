<template>
    <div>
        <v-form  ref="form" v-model="validForm">
            <v-row>
                <v-col cols="12" sm="4" md="4" lg="4">
                    <v-menu
                        v-model="menu1"
                        :close-on-content-click="false"
                        full-width
                        max-width="290"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                :value="computedDateFormattedMomentjs"
                                clearable
                                label="Date"
                                readonly
                                v-on="on"
                                :rules="DateRules"
                                required
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" @change="menu1 = false"></v-date-picker>
                    </v-menu>
                </v-col>

                <v-col cols="12" sm="4" md="4" lg="4">
                    <v-text-field
                        v-model="tag"
                        placeholder="Enter tag i.e serverless, aws etc"
                        clearable
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                    <v-btn color="primary" @click="getPastTweets()" :disabled="!validForm">Search</v-btn>
                </v-col>
            </v-row>
        </v-form>
        <div>
            <vue-element-loading :active="loading" spinner="bar-fade-scale" duration="1.0" />
            <v-list v-if="tweets.length">
                <template v-for="(tweet, index) in tweets">
                    <v-list-item :key="tweet.id" @click="goToTwitter(tweet.tweet_id_str)">
                        <v-list-item-content>
                            <twitter-card :tweet="tweet"></twitter-card>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
            <v-list v-else>
                <v-list-item>
                    <v-list-item-content>No Tweets Found</v-list-item-content>
                </v-list-item>
            </v-list>
            <v-toolbar>
                <div class="flex-grow-1"></div>
                <v-btn
                    class="ma-2"
                    color="primary"
                    :disabled="!LastEvaluatedKey"
                    @click="nextClicked()"
                >
                    Next
                    <v-icon dark right>mdi-arrow-right</v-icon>
                </v-btn>
            </v-toolbar>
        </div>
    </div>
</template>
</template>

<script>
import axios from "axios";
import TwitterCard from "./TwitterCard.vue";
import VueElementLoading from "vue-element-loading";

const GET_PAST_TWEETS_API =
    "https://hfgotho0xe.execute-api.us-west-2.amazonaws.com/dev/get_past_tweets";

import moment from "moment";

export default {
    components: {
        TwitterCard,
        VueElementLoading
    },
    computed: {
        start() {
            return this.startStreaming;
        },
        computedDateFormattedMomentjs() {
            return this.date ? moment(this.date).format("DD-MM-YYYY") : "";
        }
    },
    data: () => ({
        validForm: false,
        tweets: [],
        tag: "",
        loading: true,

        date: new Date().toISOString().substr(0, 10),
        menu1: false,
        LastEvaluatedKey: null,
        DateRules: [
            v => !!v || "Date is required",
            v =>
                moment(v, "DD-MM-YYYY", true).isValid() ||
                "Date must be 23-09-2019 format"
        ]
    }),
    methods: {
        nextClicked() {
            if (this.LastEvaluatedKey) {
                this.getPastTweets(
                    window.btoa(JSON.stringify(this.LastEvaluatedKey))
                );
            }
        },
        getPastTweets(lastKey = null) {
            if (this.$refs.form && ! this.$refs.form.validate()){
                return;
            }
        
            if (!this.date) return;
            console.log("date", this.date);
            let parent = this;
            parent.loading = true;
            let date = moment(parent.date).format("YYYY-MM-DD");
            let API = GET_PAST_TWEETS_API + "?date=" + date;
            if (this.tag) {
                API += "&tag=" + this.tag;
            }
            if (lastKey) {
                API +=
                    "&last_evaluated_key=" +
                    window.btoa(JSON.stringify(this.LastEvaluatedKey));
            }

            axios({
                method: "get",
                url: API
            })
                .then(function(response) {
                    parent.loading = false;
                    parent.tweets = response.data.Items;
                    parent.LastEvaluatedKey = response.data.LastEvaluatedKey
                        ? response.data.LastEvaluatedKey
                        : null;
                })
                .catch(function(error) {
                    console.log("error", error);
                });
        },

        goToTwitter(tweetID) {
            window.open(`https://twitter.com/user/status/${tweetID}`, "_blank");
        }
    },
    created() {
        this.getPastTweets();
    }
};
</script>