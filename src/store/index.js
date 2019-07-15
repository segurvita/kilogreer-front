import Vue from 'vue';
import Vuex from 'vuex';

import weights from './modules/weights';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    weights,
  },
});
