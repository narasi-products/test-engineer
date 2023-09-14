<template>
  <div class="container">
    <form @submit.prevent="onSubmit">
      <input v-model="search" v-debounce:800ms="onSubmit" type="text" class="search" placeholder="Cari gambar...">
    </form>
    <div class="photo-grid">
      <div v-for="(item, idx) in $store.state.photos.photos.items" :key="idx" class="photo-grid-item">
        <img v-if="item.src" :src="item.src.medium" alt="Pexels">
        <div class="description">
          <strong>{{ item.photographer }}</strong>
        </div>
      </div>
      <infinite-loading @infinite="infiniteHandler" />
      <div v-if="$store.state.photos.photos.items.length === 0 && search.length > 0" class="not-found">
        <span>Penelusuran Untuk “{{ $store.state.photos.search.lastSearch }}” Tidak Ditemukan </span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      search: '',
      page: 1
    }
  },
  mounted () {
    // Initial data ketika halaman dibuka
    this.$store.dispatch('photos/all', {
      perPage: 15,
      type: 'normal',
      infitityState: null
    })
  },
  methods: {
    // Function ketika user search di input search
    async onSubmit () {
      if (this.search.length > 0) {
        this.$store.commit('photos/CLEAN_PHOTO')
        await this.$store.dispatch('photos/search', {
          perPage: 15,
          search: this.search,
          type: 'normal',
          infitityState: null
        })
      } else {
        this.$store.commit('photos/CLEAN_PHOTO')
        await this.$store.dispatch('photos/all', {
          perPage: 15,
          type: 'normal',
          infitityState: null
        })
      }
    },
    // Function ketika user malakukan scroll ke bawah
    async infiniteHandler ($state) {
      if (this.search.length > 0) {
        await this.$store.dispatch('photos/search', {
          perPage: 15,
          search: this.search,
          type: 'infinity',
          infitityState: $state
        })
      } else {
        await this.$store.dispatch('photos/all', {
          perPage: 15,
          type: 'infinity',
          infitityState: $state
        })
      }
    }
  }
}
</script>
