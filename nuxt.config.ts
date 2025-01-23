// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {
        enabled: true,
        timeline: {
            enabled: true
        }
    },

    // runtimeConfig: {
    //     apiSecret: process.env.API_SECRET,
    //     public: {
    //         apiBase: process.env.API_BASE
    //     }
    // },

    routeRules: {
        '/**': {isr: true}
    },

    nitro: {
        preset: "cloudflare-pages"
    },

    supabase: {
        redirect: false
    },

    modules: ["nitro-cloudflare-dev", "@nuxtjs/supabase"]
})