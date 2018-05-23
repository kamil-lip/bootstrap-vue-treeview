<template> 

<div class="tree-view">
	<tree-node v-for="nodeData in data" :data="nodeData" :key="nodeData.id"></tree-node>
</div>

</template>

<script>

import TreeNode from './TreeNode.vue'

export default {
	props: {
		data: {
			type: Array,
			required: true
		}
	},
	components: {
		TreeNode
	}
}


</script>

<style>

</style>
