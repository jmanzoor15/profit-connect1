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
})
