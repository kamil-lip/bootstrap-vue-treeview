<template>
	<div class="tree-branch" :class="{ selected: selected }">
		<div class="tree-node" @drop.prevent="drop" @dragover.prevent="dragover" :draggable="draggable" @dragstart.stop="dragstart" @dragend="dragend" @dragenter.prevent="dragenter">
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
				@nodeDropped="childNodeDropped"
				@nodeMoved="childNodeMoved">
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
		"data.children"(children) {
			if(children.length === 0 && this.expanded) {
				this.expanded = false
			}
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
		childNodeDropped(targetNode) {
			// forward event to the parent node
			this.$emit('nodeDropped', targetNode)
		},
		getChildNodes() {
			return this.$refs.childNodes || [];
		},
		childNodeMoved(childNodeData) {
			let idx = this.data.children.indexOf(childNodeData)
			this.data.children.splice(idx, 1)
			delete window._bTreeView.draggedNodeKey
			delete window._bTreeView.draggedNodeData
		},
		dragstart(ev) {
			ev.dataTransfer.dropEffect = "none"
			this.$emit('nodeDragged', this)
			// didn't use dataTransfer it's not fully supported by ie
			// and beacuse it's not available in the dragover event handler
			if(window._bTreeView === undefined) {
				window._bTreeView = {}	
			}
			_bTreeView['draggedNodeData'] = this.data
			_bTreeView['draggedNodeKey'] = this.data[this.keyPropName]
		},
		drop(ev) {
			if(window._bTreeView !== undefined
				&& window._bTreeView.draggedNodeData !== undefined) {
				if(this.data.children === undefined) {
					Vue.set(this.data, "children", [])
				}
				this.data.children.push(window._bTreeView.draggedNodeData)
				if(!this.expanded) {
					this.expanded = true
				}
				this.$emit('nodeDropped', this)
			}
		},
		dragend(ev) {
			if(ev.dataTransfer.dropEffect === 'move') {
				this.$emit('nodeMoved', this.data)
			}
		},
		dragenter(ev) {
			this.dropEffect = ev.dataTransfer.dropEffect = window._bTreeView !== undefined
				&& window._bTreeView.draggedNodeKey !== undefined
				&& this.data[this.keyPropName] !== window._bTreeView.draggedNodeKey
				&& (this.data.children === undefined
					|| this.data.children.indexOf(window._bTreeView.draggedNodeData) < 0)
				&& !this.isDescendantOf(window._bTreeView.draggedNodeData)
				? "move" : "none"
		},
		dragover(ev) {
			ev.dataTransfer.dropEffect = this.dropEffect || "none"
		},
		isDescendantOf(nodeData) {
			if(nodeData.children === undefined) return false;
			let nodes = [nodeData]
			for(let i=0; i<nodes.length; i++) {
				let tmpNode = nodes[i]
				if(tmpNode.children !== undefined) {
					for(let child of tmpNode.children) {
						if(child === this.data) {
							return true
						}
					}
					nodes.push(...tmpNode.children)
				}
			}
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
