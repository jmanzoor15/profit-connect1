export default defineNuxtConfig({
  css: [
    "assets/scss/global.scss",
    "assets/scss/formkit.scss",
    "assets/scss/app.scss",
  ],

  plugins: [{ src: "~/plugins/bootstrap.client", mode: "client" }],
  modules: [
    "@pinia/nuxt",
    "@nuxt/image",
    "@formkit/nuxt",
    "@vueuse/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-lodash",
  ],
  formkit: {
    autoImport: true,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@import "@/assets/scss/_tools/_variables.scss";@import "@/assets/scss/_tools/mixins";@import "@/assets/scss/_tools/helpers";',
        },
      },
    },
  },
  image: {
    none: {},
  },
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    storage: 'localStorage'
  },
  runtimeConfig: {
    // private variable
    API_URL: process.env.API_URL,
    CDN_URL: process.env.CDN_URL,
    public: {
      // for any variable which need to access in both ssr and client side
    },
  },
});
