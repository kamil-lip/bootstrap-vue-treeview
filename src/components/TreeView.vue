<template> 

<div class="tree-view">
	<tree-node v-for="nodeData in data" :data="nodeData" :key="nodeData.id" ref="childNodes"></tree-node>
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
		}
	},
	components: {
		TreeNode
	},
	methods: {
		createNodeMap() {
			if(this.nodeMap === undefined) {
				let nodeMap = this.nodeMap = new Map()

				let nodes = this.$refs.childNodes.slice();

				for(let tmpNode of nodes) {
					nodes.push(...tmpNode.getChildNodes())
				}

				console.log(nodes)
			}
		}
	},
	created() {
		this.$nextTick(() => {
			this.createNodeMap()
  		})
	}
}


</script>

<style>

</style>
