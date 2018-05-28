// This is not the best way to go with the tree component. I recommend you to use webpack with babel as described in the README file.
Vue.use(bootstrap4VueTreeview['default']);

var app = new Vue({
	template: `
	<div class="row">
		<div class="col-md-4">
			<div class="card">
				<div class="card-body">
					<b-tree-view :data="treeData" ref="tree" :draggableNodes="true"></b-tree-view>
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
			]
		}
	}
})


// add "tree is ready" event
setTimeout( () => {
	console.log(app.$refs.tree.getNodeByKey(5).data.id) // TO DO: remove it, only for temporary testing, add professional tests
}, 1000)
