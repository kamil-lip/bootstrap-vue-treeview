// This is not the best way to go with the tree component. I recommend you to use webpack with babel as described in the README file.
Vue.use(bootstrap4VueTreeview['default']);

var app = new Vue({
	template: `
	<div class="row">
		<div class="col-md-4">
			<div class="card">
				<div class="card-body">
					<b-tree-view :data="treeData"></b-tree-view>
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
