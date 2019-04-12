export const strict = true

export const state = () => ({
  menus: []
})

export const mutations = {
  SET_MENUS(state, menus) {
    state.menus = menus
  }
}

export const getters = {
  menus(state, menus) {
    return state.menus
  }
}

export const actions = {
  addAll({ commit }, menus) {
    if (Array.isArray(menus) && menus.length) {
      commit('SET_MENUS', menus)
    }
  }
}
