export default function ({ $axios }) {
  $axios.onRequest((config) => {
    // Access key pexels api
    // config.headers.common['Authorization'] = '563492ad6f91700001000001d48388028f434c408dafd5916a8f3e2a';
    config.headers.common.Authorization = '563492ad6f9170000100000170de96432cdf4ecfb3826c3db04bafc1'
    window.$nuxt.$root.$loading.start()
  })

  // Hentikan loading ketika respon api dari server sudah selesai
  $axios.onResponse((config) => {
    window.$nuxt.$root.$loading.finish()
  })

  // Hentikan loading ketika respon api dari server error
  $axios.onError((res) => {
    window.$nuxt.$root.$loading.finish()
  })
}
