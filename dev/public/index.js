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
						:contextMenuItems="contextMenuItemsObj"
						:renameNodeOnDblClick="true"
						:showIcons="true"
						iconClassProp="icon"
						prependIconClass="fas"
						@contextMenuItemSelect="menuItemSelected"
						@nodeSelect="nodeSelect">
						<template slot="node-icon">
						  >
            </template>
          </b-tree-view>
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
                    "name": "Users",
                    "icon": "fa-users"
                },
                {
                    "id": 2,
                    "name": "Books",
                    "icon": "fa-book",
                    "type": "books",
                    "children": [
                        {
                            "id": 3,
                            "name": "Neptune",
                            "icon": "fa-book",
                            "type": "book"
                        }
                    ]
                },
                {
                    "id": 5,
                    "name": "Vehicles",
                    "expanded": true,
                    "children": [
                        {
                            "id": 23,
                            "name": "Cars",
                            "labelClass": "test",
                            "icon": "fa-car"
                        },
                        {
                            "id": 34,
                            "name": "Trucks",
                            "icon": "fa-truck",
                            "expanded": true,
                            "children": [
                                {
                                    "id": 101,
                                    "name": "Mars"
                                }
                            ]
                        }
                    ]
                }
            ],
            selectedNode: null,
            contextMenuItems: [
              { code: 'DELETE_NODE', label: 'Delete node'},
              { code: 'ADD_CHILD_NODE', label: 'Add child' },
              { code: 'RENAME_NODE', label: 'Rename' },
            ],
            contextMenuItemsObj: {
              default: [
                { code: 'DELETE_NODE', label: 'Delete node'},
                { code: 'ADD_CHILD_NODE', label: 'Add child' },
                { code: 'RENAME_NODE', label: 'Rename' },
              ],
              books: [
                { code: 'DELETE_NODE', label: 'Delete group'},
                { code: 'ADD_BOOK', label: 'Add book' },
              ],
              book: [
                { code: 'DELETE_BOOK', label: 'Delete book' },
              ]
            },
        }
    },
    methods: {
        nodeSelect(node, isSelected) {
            console.log('Node ' + node.data.name + ' has been ' + (isSelected ? 'selected' : 'deselected'))
            if (isSelected) {
                this.selectedNode = node.data
            } else if (node.data === this.selectedNode) {
                this.selectedNode = null
            }
        },
        menuItemSelected(item, node) {
            console.log('Menu item selected', item.code);
            if (item.code === 'ADD_CHILD_NODE' || item.code === 'ADD_BOOK') {
                node.appendChild({
                    id: count++,
                    name: 'My new node'
                })
            }

            if (item.code === 'DELETE_BOOK') {
                node.delete();
            }
        }
    }
})


// add "tree is ready" event
setTimeout(() => {
    console.log(app.$refs.tree.getNodeByKey(5).data.id) // TO DO: remove it, only for temporary testing, add professional tests
}, 1000)
