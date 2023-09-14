import createPersistedState from 'vuex-persistedstate'

// Ubah data vuex menjadi cookie supaya ketika di refresh data tidak hilang
export default ({ store }) => {
  createPersistedState({
    // nama cookie di local storage, hal ini juga bisa mengahapus cookie atau cache pada semua browser
    key: 'staticInterviewPersistedState'
  })(store)
}
