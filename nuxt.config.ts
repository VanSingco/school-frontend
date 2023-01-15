// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: {
        strict: true
    },

    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        'nuxt-icon',
        '@nuxt/image-edge',
    ],
   
    css: [
        '@/assets/scss/main.scss'
    ],
    
    runtimeConfig: {
        public: {
            apiBase: process.env.API_URL
        }
    }

})
