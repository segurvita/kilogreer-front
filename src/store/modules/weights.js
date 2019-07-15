import axios from 'axios';

export default {
  namespaced: true,
  state: {
    list: [],
    loading: false,
    refreshList: true, // 初期化
  },
  getters: {
    list: state => state.list,
    loading: state => state.loading,
  },
  mutations: {
    list(state, payload) {
      state.list = payload;
    },
    loading(state, payload) {
      state.loading = payload;
    },
    refreshList(state, payload) {
      state.refreshList = payload;
    },
  },
  actions: {
    async getList({ commit, state }) {
      // リフレッシュしない
      if (!state.refreshList) {
        return state.list;
      }

      commit('loading', true);
      const res = await axios.get('/weight');
      commit('loading', false);

      // 取得データを加工して格納
      const list = res.data.body.measuregrps.map(item => ({
        created: item.created,
        date: item.date,
        grpid: item.grpid,
        value: item.measures[0].value,
      }));

      commit('list', list);

      // 更新完了
      commit('refreshList', false);
      return res;
    },
  },
};
