<template>
	<div class="tree-branch" :class="{ selected: selected }">
		<div class="tree-node"
			:class="{ 'has-child-nodes': hasChildren, 'tree-node-expanded': expanded }"
			@drop.prevent="drop"
			@dragover.prevent="dragover"
			:draggable="draggable"
			@dragstart.stop="dragstart"
			@dragend="dragend"
			@dragenter="dragenter">
			<transition name="rotateArrow">
				<svg width="12" height="12" @click.prevent="toggle" class="tree-node-icon">
					<path
					d="M2 1 L10 6 L2 11 Z" />
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
		<div class="drop-after-dropzone">

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
	computed: {
		hasChildren() {
			return this.data.children !== undefined && this.data.children.length > 0
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
			let dataKey = data[this.keyPropName]
			if(this.data.children.findIndex(c => c[this.keyPropName] === dataKey) > -1) {
				ev.dataTransfer.dropEffect = "none"
			} else {
				this.data.children.push(data)
			}
		},
		dragover(ev) {
			ev.dataTransfer.dropEffect = "move"
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
	transition: transform 0.3s;
}

.tree-node.has-child-nodes .tree-node-icon {
	cursor: pointer;
}

.tree-node-expanded .tree-node-icon {
	transform: rotate(90deg);
	transition: transform 0.3s;
}

.tree-node-children {
	margin-left: 16px;
}

.tree-branch {
	position: relative;
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

.tree-node svg > path {
	fill: none;
	opacity:1;
	stroke:currentColor;
	stroke-width: 1.5;
	stroke-linecap:round;
	stroke-linejoin:round;
	stroke-miterlimit:4;
	stroke-dasharray:none;
	stroke-opacity:1
}

.tree-node.has-child-nodes > svg > path {
	fill: currentColor;
}

.tree-node.tree-node-expanded > svg > path {
	fill: none;
}

.drop-after-dropzone {
	position: absolute;
	bottom: -2px;
	height: 5px;
	width: 100%;
	background-color: yellow;
	border: 1px dashed #D2D2D2;
	display: none;
}

</style>
