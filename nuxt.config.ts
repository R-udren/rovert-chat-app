// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

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

    routeRules: {
        '/**': {isr: true}
    },

    nitro: {
        preset: "cloudflare-pages"
    },

    supabase: {
        redirectOptions: {
            login: "/login",
            callback: "/confirm",
            exclude: ["/", "/confirm", "/login"],
            cookieRedirect: true
        }
    },

    css: ["~/assets/css/main.css"],

    vite: {
        plugins: [
            tailwindcss(),
        ],
    },

    modules: ["nitro-cloudflare-dev", "@nuxtjs/supabase", "@nuxt/ui"]
})