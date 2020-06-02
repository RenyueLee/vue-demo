const state = {
  // 查询参数
  params: {
    startDate: '',
    endDate: '',
    acceptingState: -1,
    queryString: '',
    page: 1,
    limit: 10
  },
  selectedIds: ''
}

const mutations = {
  // 设置参数
  SET_PARAMS: (state, params) => {
    state.params = params
  },
  GET_PARAMS: (state) => {
    return state.page
  },
  // 设置选中项
  SET_SELECTED: (state, selectedIds) => {
    state.selectedIds = selectedIds
  },
  GET_SELECTED: (state) => {
    return state.selectedIds
  }
}

const actions = {
  setParams({ commit }, params) {
    commit('SET_PARAMS', params)
  },
  setSelectedIds({ commit }, selectedIds) {
    commit('SET_SELECTED', selectedIds)
  },
  getParams({ commit }) {
    commit('GET_PARAMS')
  },
  getSelectedIds({ commit }) {
    commit('GET_SELECTED')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
