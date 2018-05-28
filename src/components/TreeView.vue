<template> 

<div class="tree-view">
	<tree-node
		v-for="nodeData in data"
		:data="nodeData"
		:key="nodeData[keyPropName]"
		:draggable="draggableNodes"
		ref="rootNodes"
		@nodeSelected="nodeSelected"
		@nodeDeselected="nodeDeselected"
		@deleteMe="deleteNode">
	</tree-node>
</div>

</template>

<script>

import TreeNode from './TreeNode.vue'

export default {
	props: {
		data: {
			type: Array,
			required: true
		},
		allowMultiple: {
			type: Boolean,
			default: false
		},
		keyPropName: {
			type: String,
			default: 'id'
		},
		draggableNodes: {
			type: Boolean,
			default: false
		}
	},
	components: {
		TreeNode
	},
	methods: {
		createNodeMap() {
			if(this.nodeMap === undefined) {
				let nodeMap = this.nodeMap = new Map()

				let nodes = this.$refs.rootNodes.slice();

				for(let i=0; i<nodes.length; i++) {
					let tmpNode = nodes[i]
					nodes.push(...tmpNode.getChildNodes())
				}

				for(let tmpNode of nodes) {
					nodeMap.set(tmpNode.data[this.keyPropName], tmpNode) // TODO: change to getter
				}
			}
		},
		getNodeByKey(key) {
			return this.nodeMap.get(key)
		},
		nodeSelected(node) {
			if(this.selectedNode !== null) {
				this.selectedNode.deselect();
			}
			this.selectedNode = node;
		},
		nodeDeselected(node) {
			if(node === this.selectedNode) {
				this.selectedNode = null
			}
		},
		deleteNode(node) {
			var index = this.data.indexOf(node.data);
			this.data.splice(index, 1);
		}
	},
	created() {
		this.selectedNode = null
		this.$nextTick(() => {
			this.createNodeMap()
  		})
	}
}


</script>

<style>

</style>
