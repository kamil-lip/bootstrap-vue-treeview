<template> 

<div class="tree-node">
	<svg width="12" height="12" @click.prevent="toggle">
		<path
		 d="M2 1 L10 6 L2 11 Z"
		 style="opacity:1;fill:currentColor;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
	</svg>
	<span>{{ data.name }}</span>
	<div class="tree-node-children" v-if="expanded && data.children && Array.isArray(data.children)">
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
	},
	data() {
		return {
			expanded: false
		}
	},
	methods: {
		toggle() {
			this.expanded = !this.expanded
		}
	}
}


</script>

<style>

.tree-node-children {
	margin-left: 10px;
}

.tree-node svg {
	display: inline-block;
}

</style>
