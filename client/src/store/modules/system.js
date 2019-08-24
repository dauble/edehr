const state = {
  isSeeding: false,
  isLoading: false,
  isEditing: false,
  currentPageKey: '',
  loadingCnt: 0,
  apiError: '',
  sysMessage: ''
}

const getters = {}

const actions = {}

const mutations = {
  setLoading: (state, isLoading) => {
    if (isLoading) {
      state.loadingCnt++
    } else {
      state.loadingCnt--
    }
    state.isLoading = state.loadingCnt > 0
  },
  // TODO remove this once all grid work is done
  setEditing: (state, isEditing) => {
    state.isEditing = isEditing
  },
  setSeeding: (state, isSeeding) => {
    state.isSeeding = isSeeding
  },
  setCurrentPageKey: (state, pageKey) => {
    state.currentPageKey = pageKey
  },
  setSystemMessage: (state, msg) => {
    state.sysMessage = msg
  },
  setApiError: (state, error) => {
    if (error) {
      console.error('System api error:', error)
    }
    state.apiError = error
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
