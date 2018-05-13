const bTreeView = require('./components/TreeView').default;

const VuePlugin = {
	install(Vue) {
		Vue.component('BTreeView', bTreeView)
	}
}

export { bTreeView }

export default VuePlugin