import Vue from "vue";
import Vuex from "vuex";
import api from "../api/api";

Vue.use(Vuex);

const state = {
  lists: {},
};

const mutations = {
  setLists(state, lists) {
    state.lists = lists;
  },
};

const actions = {
  fetchLists: ({ commit }) => {
    api.getLists().then((response) => {
      if (response) {
        commit("setLists", response);
      }
    });
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
});
