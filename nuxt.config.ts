// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {
        enabled: true,
        timeline: {
            enabled: true
        }
    },

    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'rovert Chat App',
            meta: [
                {name: 'description', content: 'rovert Chat App'},
                {name: 'author', content: 'R-udren'}
            ]
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

    css: ["~/assets/css/main.css"],

    modules: ["nitro-cloudflare-dev", "@nuxtjs/supabase", "@nuxt/ui"]
})