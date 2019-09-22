import moment from 'moment-timezone';

export default {
  namespaced: true,
  state: {
    list: [],
    dailyList: [],
    loading: false,
    refreshList: true, // 初期化
  },
  getters: {
    list: state => state.list,
    dailyList: state => state.dailyList,
    loading: state => state.loading,
  },
  mutations: {
    list(state, payload) {
      state.list = payload;
    },
    dailyList(state, payload) {
      state.dailyList = payload;
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
          const createdDate = moment(item.created * 1000)
            .tz(res.data.body.timezone)
            .format('YYYY/MM/DD');
          const createdTime = moment(item.created * 1000)
            .tz(res.data.body.timezone)
            .format('YYYY/MM/DD HH:mm:ss');

          // 体重
          const weightUnit = 10 ** item.measures[0].unit;
          const weightValue = item.measures[0].value * weightUnit;

          return {
            createdDate,
            createdTime,
            weightValue,
          };
        })
        // 逆順: 日付昇順にする
        .reverse();

      commit('list', list);

      // 日付単位のリストを作成開始
      const dailyList = [list[0]]; // 初期値は先頭値
      list.reduce((prev, current) => {
        if (prev.createdDate === current.createdDate) {
          // 前の測定と日付が同じなら、最小値を更新
          dailyList[dailyList.length - 1].weightValue = Math.min(
            dailyList[dailyList.length - 1].weightValue,
            current.weightValue,
          );
        } else {
          // dailyListに追加
          dailyList.push({
            createdDate: current.createdDate,
            weightValue: current.weightValue,
          });
        }
        return current;
      });

      commit('dailyList', dailyList);

      // 更新完了
      commit('refreshList', false);
      return res;
    },
  },
};
