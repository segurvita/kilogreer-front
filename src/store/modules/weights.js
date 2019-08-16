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

      // 今日の日付
      const today = moment(new Date());

      // 日付単位のリストを作成開始
      const dailyList = [list[0]]; // 初期値は先頭値
      list.reduce((prev, current) => {
        // 今注目している日付
        const currentDate = moment(current.createdDate);

        if (today.diff(currentDate, 'days') >= 28) {
          // 今日よりも一定日数以上古いデータは破棄
          dailyList[0] = current;
          return current;
        }
        if (prev.createdDate === current.createdDate) {
          // 前の測定と日付が同じなら、最小値を更新
          dailyList[dailyList.length - 1].weightValue = Math.min(
            dailyList[dailyList.length - 1].weightValue,
            current.weightValue,
          );
        } else {
          // 前の測定との差を計算
          const prevDate = moment(prev.createdDate);
          const diffDay = currentDate.diff(prevDate, 'days');

          // 測定値がない日付のデータを追加
          for (let i = 0; i < diffDay - 1; i += 1) {
            const iteDate = prevDate.add(1, 'd').format('YYYY/MM/DD');
            dailyList.push({
              createdDate: iteDate,
              weightValue: current.weightValue,
            });
          }

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
