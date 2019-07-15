import dayjs from 'dayjs';

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
      const res = await window.axios.get('/weight');
      commit('loading', false);

      // 取得データを加工して格納
      const list = res.data.body.measuregrps
        // 要素を算出
        .map((item) => {
          // 日時
          const createdDate = dayjs(item.created * 1000).format('YYYY/MM/DD HH:mm:ss');

          // 体重
          const weightUnit = 10 ** item.measures[0].unit;
          const weightValue = item.measures[0].value * weightUnit;

          return {
            createdDate,
            weightValue,
          };
        })
        // 逆順: 日付昇順にする
        .reverse();

      commit('list', list);

      // 更新完了
      commit('refreshList', false);
      return res;
    },
  },
};
