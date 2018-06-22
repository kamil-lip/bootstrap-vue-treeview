// This is not the best way to go with the tree component. I recommend you to use webpack with babel as described in the README file.
Vue.use(bootstrapVueTreeview['default']);

let count = 100;

var app = new Vue({
	template: `
	<div class="row">
		<div class="col-md-4">
			<div class="card">
				<div class="card-body">
					<b-tree-view
						:data="treeData"
						ref="tree"
						:nodesDraggable="true"
						:contextMenu="true"
						:contextMenuItems="contextMenuItems"
						@contextMenuItemSelect="menuItemSelected"
						@nodeSelect="nodeSelect"></b-tree-view>
				</div>
			</div>
		</div>
		<div class="col-md-8" v-if="selectedNode">
			<div class="card">
				<div class="card-body">
					Node {{ selectedNode.name }} is selected
				</div>
			</div>
		</div>
	</div>`,
	el: '#app',
	data() {
		return {
			treeData: [
				{
					"id": 1,
					"name": "Mercury"
				},
				{
					"id": 2,
					"name": "Venus" ,
					"children": [
						{
							"id": 3,
							"name": "Neptune"
						},
						{
							"id": 4,
							"name": "Stratus",
							"children": [
								{
									"id": 5,
									"name": "Mars"
								}
							]
						}
					]
				}
			],
			selectedNode: null,
			contextMenuItems: [ { code: 'DELETE_NODE', label: 'Delete node' }, { code: 'ADD_CHILD_NODE', label: 'Add child' } ]
		}
	},
	methods: {
		nodeSelect(node, isSelected) {
			console.log('Node ' + node.data.name + ' has been ' + (isSelected ? 'selected' : 'deselected'))
			if(isSelected) {
				this.selectedNode = node.data
			} else if(node.data === this.selectedNode) {
				this.selectedNode = null
			}
		},
		menuItemSelected(item, node) {
			if(item.code === 'ADD_CHILD_NODE') {
				node.appendChild({
					id: count++,
					name: 'My new node'
				})
			}
		}
	}
})


// add "tree is ready" event
setTimeout( () => {
	console.log(app.$refs.tree.getNodeByKey(5).data.id) // TO DO: remove it, only for temporary testing, add professional tests
}, 1000)
