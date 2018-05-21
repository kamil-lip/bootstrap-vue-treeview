<template> 

<div class="tree-node">
	<div>{{ data.name }}</div>
	<div class="tree-node-children" v-if="data.children">
		<tree-node v-for="nodeData in data.children" :data="nodeData"></tree-node>
	</div>
</div>

</template>

<script>

// import TreeNode from './TreeNode.vue'

export default {
	name: 'tree-node',
	props: {
		data: {
			type: Object,
			required: true
		}
	}
}


</script>

<style>

.tree-node {
	margin-left: 10px;
}

</style>
