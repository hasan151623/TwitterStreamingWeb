<template>
    <v-card class="mx-auto">
        <v-card-title>
            <v-avatar>
                <img :src="tweet.user.profile_image_url" alt="John" />
            </v-avatar>
            <span class="title font-weight-light pa-2">{{tweet.user.name}}</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">{{ tweet.text}}</v-card-text>

        <v-card-actions>
            <v-list-item class="grow">
                <v-list-item-content>
                    <v-list-item-title>{{ getDateTime(tweet.timestamp_ms) }}</v-list-item-title>
                </v-list-item-content>

                <v-row align="center" justify="end">
                    <v-icon class="mr-1">mdi-heart</v-icon>
                    <span class="subheading mr-2">{{tweet.favorite_count}}</span>
                    <span class="mr-1">·</span>
                    <v-icon class="mr-1">mdi-share-variant</v-icon>
                    <span class="subheading">{{tweet.reply_count}}</span>
                </v-row>
            </v-list-item>
        </v-card-actions>
    </v-card>
</template>

<script>
// let tweet = {
//     created_at: "Fri Sep 20 04:52:06 +0000 2019",
//     id: 1174909072329494529,
//     id_str: "1174909072329494529",
//     text:
//         "RT @SaraCarterDC: Is #Google plotting to stop Donald Trump re-election in 2020? You can't believe what this #Whistleblower has brought to l…",
//     source:
//         '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
//     user: {
//         id: 848145259808804864,
//         id_str: "848145259808804864",
//         name: "Ragnar Derricks",
//         screen_name: "RagnarDerricks",
//         location: "Arizona, USA",
//         description:
//             "Constitutionalist, #1A, #2A, #AmericaFirst, 🏌️ ⛳️ , #MAGA, #KAG, 🇺🇸🥃 “Remember their motto, RESIST! Ours is PRODUCE!” - VSGPOTUS DJT",
//         translator_type: "none",
//         followers_count: 1179,
//         friends_count: 1569,
//         listed_count: 2,
//         favourites_count: 26602,
//         statuses_count: 16094,
//         created_at: "Sat Apr 01 12:09:22 +0000 2017",

//         profile_background_color: "F5F8FA",
//         profile_background_image_url: "",
//         profile_background_image_url_https: "",
//         profile_link_color: "1DA1F2",
//         profile_sidebar_border_color: "C0DEED",
//         profile_sidebar_fill_color: "DDEEF6",
//         profile_text_color: "333333",
//         profile_image_url:
//             "http://pbs.twimg.com/profile_images/848156590888763394/rWDSnZIh_normal.jpg",
//         profile_image_url_https:
//             "https://pbs.twimg.com/profile_images/848156590888763394/rWDSnZIh_normal.jpg",
//         profile_banner_url:
//             "https://pbs.twimg.com/profile_banners/848145259808804864/1491051493"
//     },

//     retweeted_status: {
//         created_at: "Fri Sep 20 03:30:00 +0000 2019",
//         id: 1174888411204915202,
//         id_str: "1174888411204915202",
//         text:
//             "Is #Google plotting to stop Donald Trump re-election in 2020? You can't believe what this #Whistleblower has brough… https://t.co/LYg1tuAgfg",
//         source:
//             '<a href="https://about.twitter.com/products/tweetdeck" rel="nofollow">TweetDeck</a>',
//         user: {
//             id: 25202268,
//             id_str: "25202268",
//             name: "Sara A. Carter",
//             screen_name: "SaraCarterDC",
//             location: "Washington, D.C.",
//             url: "https://saraacarter.com",
//             description:
//                 "@FoxNews Contributor, award winning National Security/War Correspondent. @IWF Fellow. Taking back the story. Follow me on Instagram ScarterDC",
//             translator_type: "none",
//             followers_count: 807557,
//             friends_count: 4639,
//             listed_count: 3398,
//             favourites_count: 24300,
//             statuses_count: 24366,
//             created_at: "Thu Mar 19 01:02:12 +0000 2009",
//             profile_background_color: "000000",
//             profile_background_image_url:
//                 "http://abs.twimg.com/images/themes/theme5/bg.gif",
//             profile_background_image_url_https:
//                 "https://abs.twimg.com/images/themes/theme5/bg.gif",
//             profile_link_color: "E81C4F",
//             profile_sidebar_border_color: "FFFFFF",
//             profile_sidebar_fill_color: "0E0E0E",
//             profile_text_color: "4A66C1",
//             profile_image_url:
//                 "http://pbs.twimg.com/profile_images/1107325511028613127/7SvT3rHh_normal.jpg",
//             profile_image_url_https:
//                 "https://pbs.twimg.com/profile_images/1107325511028613127/7SvT3rHh_normal.jpg",
//             profile_banner_url:
//                 "https://pbs.twimg.com/profile_banners/25202268/1548362448"
//         },
//         extended_tweet: {
//             full_text:
//                 "Is #Google plotting to stop Donald Trump re-election in 2020? You can't believe what this #Whistleblower has brought to light || #READ \nhttps://t.co/m7h6u9jctO",
//             display_text_range: [0, 159],
//             entities: {
//                 hashtags: [
//                     { text: "Google", indices: [3, 10] },
//                     { text: "Whistleblower", indices: [90, 104] },
//                     { text: "READ", indices: [129, 134] }
//                 ],
//                 urls: [
//                     {
//                         url: "https://t.co/m7h6u9jctO",
//                         expanded_url:
//                             "https://saraacarter.com/exclusive-google-insider-turns-over-950-pages-of-docs-and-laptop-to-doj/",
//                         display_url: "saraacarter.com/exclusive-goog…",
//                         indices: [136, 159]
//                     }
//                 ],
//                 user_mentions: [],
//                 symbols: []
//             }
//         },
//         quote_count: 41,
//         reply_count: 61,
//         retweet_count: 1054,
//         favorite_count: 1644,
//         entities: {
//             hashtags: [
//                 { text: "Google", indices: [3, 10] },
//                 { text: "Whistleblower", indices: [90, 104] }
//             ],
//             urls: [
//                 {
//                     url: "https://t.co/LYg1tuAgfg",
//                     expanded_url:
//                         "https://twitter.com/i/web/status/1174888411204915202",
//                     display_url: "twitter.com/i/web/status/1…",
//                     indices: [117, 140]
//                 }
//             ],
//             user_mentions: [],
//             symbols: []
//         },
//         filter_level: "low",
//         lang: "en"
//     },
//     quote_count: 0,
//     reply_count: 0,
//     retweet_count: 0,
//     favorite_count: 0,
//     entities: {
//         hashtags: [
//             { text: "Google", indices: [21, 28] },
//             { text: "Whistleblower", indices: [108, 122] }
//         ],
//         urls: [],
//         user_mentions: [
//             {
//                 screen_name: "SaraCarterDC",
//                 name: "Sara A. Carter",
//                 id: 25202268,
//                 id_str: "25202268",
//                 indices: [3, 16]
//             }
//         ],
//         symbols: []
//     },
//     filter_level: "low",
//     lang: "en",
//     timestamp_ms: "1568955126255"
// };
import moment from "moment";

export default {
    props: {
        tweet: Object
    },
    data: () => ({
        //
    }),
    methods: {
        getDateTime(timestamp) {
            return moment(timestamp).format("MMM Do YYYY, h:mm:ss a");
        }
    }
};
</script>