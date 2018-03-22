import Vue from 'vue'
import Vuex,{Payload, Store} from 'vuex'
import VuexPersistence from 'vuex-persist'

import mutations from './mutations'
import actions from './actions'
const vuexLocal = new VuexPersistence({
	storage: window.localStorage,
	asyncStorage:false
})

Vue.use(Vuex);

export default new Vuex.Store({
	modules:{
		mutations
	},
	actions,
	plugins: [vuexLocal.plugin]
});

