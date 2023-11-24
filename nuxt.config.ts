export default defineNuxtConfig({
  css: [
    "assets/scss/formkit.scss",
    "assets/scss/app.scss",
  ],

  plugins: [
    { src: '~/plugins/bootstrap.client', mode: 'client' },
  ],
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@formkit/nuxt',
    '@vueuse/nuxt',
  ],
  formkit: {
    autoImport: true
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/global.scss";',
        },
      },
    },
  },
  image: {
    dir: 'assets/images'
  },
  runtimeConfig: {
    // private variable
    API_URL: process.env.API_URL,
    CDN_URL: process.env.CDN_URL,
    public: {
      // for any variable which need to access in both ssr and client side
    },
},
})
