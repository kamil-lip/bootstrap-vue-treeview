import bTreeView from './components/TreeView.vue';

const VuePlugin = {
	install(Vue) {
		Vue.component('BTreeView', bTreeView)
	}
}

export { bTreeView }

export default VuePlugin