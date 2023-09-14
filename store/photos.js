const state = () => ({
  page: 1,
  photos: {
    loading: true,
    items: []
  },
  search: {
    lastSearch: null,
    listSearch: []
  }
})

const mutations = {
  SET_PHOTOS (state, data) {
    state.photos.items.push(...data)
    state.photos.loading = false
  },
  SET_SEARCH (state, data) {
    state.search.lastSearch = data.lastSearch
    state.search.listSearch.push(...data.lastSearch)
  },

  SET_PAGE (state, data) {
    state.page += data
  },
  CLEAN_PHOTO (state) {
    state.page = 1
    state.photos.items = []
  }
}

const actions = {
  async all ({ commit, state }, data) {
    if (data.type === 'infinity') {
      commit('SET_PAGE', 1)
    }
    await this.$axios.$get(`v1/curated?per_page=${data.perPage}&page=${state.page}`).then((response) => {
      if (data.infitityState !== null) {
        if (response.photos.length) {
          data.infitityState.loaded()
        } else {
          data.infitityState.complete()
        }
      }
      const photos = []
      response.photos.map((item, index) => {
        return photos.push({
          id: item.id,
          alt: item.alt,
          avgColor: item.avg_color,
          height: item.height,
          width: item.width,
          liked: item.liked,
          photographer: item.photographer,
          photographerId: item.photographer_id,
          photographerUrl: item.photographer_url,
          url: item.url,
          src: {
            landscape: item.src.landscape,
            large: item.src.large,
            large2x: item.src.large2x,
            medium: item.src.medium,
            original: item.src.original,
            portrait: item.src.portrait,
            small: item.src.small,
            tiny: item.src.tiny
          }
        })
      })

      commit('SET_PHOTOS', photos)
      return photos
    }).catch((e) => {
      if (data.infitityState !== null) {
        data.infitityState.complete()
      }

      return e
    })
  },

  async search ({ commit, state }, data) {
    if (data.type === 'infinity') {
      commit('SET_PAGE', 1)
    }
    await this.$axios.$get(`v1/search?query=${data.search}&per_page=${data.perPage}&page=${state.page}`).then((response) => {
      commit('SET_SEARCH', {
        lastSearch: data.search
      })
      if (data.infitityState !== null) {
        if (response.photos.length) {
          data.infitityState.loaded()
        } else {
          data.infitityState.complete()
        }
      }
      const photos = []
      response.photos.map((item, index) => {
        return photos.push({
          id: item.id,
          alt: item.alt,
          avgColor: item.avg_color,
          height: item.height,
          width: item.width,
          liked: item.liked,
          photographer: item.photographer,
          photographerId: item.photographer_id,
          photographerUrl: item.photographer_url,
          url: item.url,
          src: {
            landscape: item.src.landscape,
            large: item.src.large,
            large2x: item.src.large2x,
            medium: item.src.medium,
            original: item.src.original,
            portrait: item.src.portrait,
            small: item.src.small,
            tiny: item.src.tiny

          }
        })
      })

      commit('SET_PHOTOS', photos)
      return photos
    }).catch((e) => {
      if (data.infitityState !== null) {
        data.infitityState.complete()
      }

      return e
    })
  }
}

export default {
  state,
  mutations,
  actions
}
