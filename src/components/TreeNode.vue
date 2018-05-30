<template> 
	<div class="tree-branch" :class="{ selected: selected }">
		<div class="tree-node" @drop.prevent="drop" @dragover.prevent="dragover" :draggable="draggable" @dragstart.stop="dragstart" @dragend="dragend">
			<transition name="rotateArrow">
				<svg width="12" height="12" @click.prevent="toggle" class="tree-node-icon" :class="{ 'tree-node-expanded': expanded }">
					<path
					d="M2 1 L10 6 L2 11 Z"
					style="opacity:1;fill:currentColor;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
				</svg>
			</transition>
			<span class="tree-node-label" @click="toggleSelection">{{ data.name }}</span>
		</div>
		<div class="tree-node-children" v-show="expanded && data.children && Array.isArray(data.children)">
			<tree-node
				v-for="nodeData in data.children"
				:data="nodeData" :key="nodeData[keyPropName]"
				ref="childNodes"
				:draggable="draggable"
				@nodeSelected="childNodeSelected"
				@nodeDeselected="childNodeDeselected"
				@nodeDragged="childNodeDragged"
				@deleteMe="deleteChildNode">	
			</tree-node>
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
		},
		keyPropName: {
			type: String,
			default: 'id'
		},
		draggable: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			expanded: false,
			selected: false
		}
	},
	watch: {
		selected() {
			this.$emit(this.selected ? 'nodeSelected' : 'nodeDeselected', this)
		},
		'data.children': function() {
			this.expanded = this.data.children === undefined || this.data.children.length === 0 ? false : true
		}
	},
	methods: {
		toggle() {
			if(this.data.children && Array.isArray(this.data.children) && this.data.children.length > 0) {
				this.expanded = !this.expanded
			}
		},
		toggleSelection() {
			this.selected = !this.selected
		},
		select() {
			this.selected = true
		},
		deselect() {
			this.selected = false
		},
		childNodeSelected(selectedNode) {
			// forward event to the parent node
			this.$emit('nodeSelected', selectedNode)
		},
		childNodeDeselected(deselectedNode) {
			// forward event to the parent node
			this.$emit('nodeDeselected', deselectedNode)
		},
		childNodeDragged(draggedNode) {
			// forward event to the parent node
			this.$emit('nodeDragged', draggedNode)
		},
		getChildNodes() {
			return this.$refs.childNodes || [];
		},
		dragstart(ev) {
			ev.dataTransfer.dropEffect = "none";
			this.$emit('nodeDragged', this)
			ev.dataTransfer.setData('Text', this.data.name);
			let data = JSON.stringify(this.data)
			ev.dataTransfer.setData('btreenodedata/json', data)
		},
		drop(ev) {
			let data = JSON.parse(ev.dataTransfer.getData("btreenodedata/json"))
			if(this.data.children === undefined) {
				Vue.set(this.data, 'children', [])
			}
			this.data.children.push(data)
		},
		dragover(ev) {
			ev.dataTransfer.dropEffect = "move"
		},
		dragend(ev) {
			if(ev.dataTransfer.dropEffect === 'move') {
				this.$emit('deleteMe', this)
			}
		},
		appendChild(node) {
			if(this === node || this.data.children === undefined || this.data.children.indexOf(node.data) >= 0) return
			if(typeof this.data.children === 'undefined') {
				Vue.set(this.data, 'children', [])
			}
			this.data.children.push(node.data)
		},
		deleteChildNode(node) {
			let index = this.data.children.indexOf(node.data);
			this.data.children.splice(index, 1);
		}
	}
}


</script>

<style>

.tree-node-label {
	cursor: pointer;
	padding: 2px 4px;
	border-radius: 3px;
	-ms-user-select: none;
	user-select: none;
}

.tree-node-label:hover {
	background-color: #EBECEE;
}

.tree-node-icon {
	cursor: pointer;
	transition: transform 0.3s;
}

.tree-node-icon.tree-node-expanded {
	transform: rotate(90deg);
	transition: transform 0.3s;
}

.tree-node-children {
	margin-left: 16px;
}

.tree-branch.selected > .tree-node > .tree-node-label {
	background-color: #007bff;
	color: #fff;
}

.tree-node > svg {
	display: inline-block;
	-ms-user-select: none;
	user-select: none;
}

</style>
