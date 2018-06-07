<template>
<div class="tree-branch"
     :class="{ selected: selected }">
  <div class="tree-node"
       :class="{ 'has-child-nodes': hasChildren, 'tree-node-expanded': expanded }"
       @drop.prevent="drop"
       @dragover.prevent="dragover"
       :draggable="draggable"
       @dragstart.stop="dragstart"
       @dragend="dragend"
       @dragenter="dragenter">
    <transition name="rotateArrow">
      <svg width="12"
           height="12"
           @click.prevent="toggle"
           class="tree-node-icon">
        <path d="M2 1 L10 6 L2 11 Z" />
      </svg>
    </transition>
    <span class="tree-node-label"
          @click="toggleSelection">{{ data.name }}</span>
  </div>
  <div class="tree-node-children"
       v-show="expanded && data.children && Array.isArray(data.children)">
    <tree-node v-for="nodeData in data.children"
               :data="nodeData"
               :key="nodeData[keyPropName]"
               ref="childNodes"
               :draggable="draggable"
               @nodeSelected="childNodeSelected"
               @nodeDeselected="childNodeDeselected"
               @nodeDragged="childNodeDragged"
               @nodeDropped="childNodeDropped"
               @nodeMoved="childNodeMoved"
               @dropAfter="dropAfterChild">
    </tree-node>
  </div>
  <div class="drop-after-dropzone"
  	   :class="{ 'drop-active': dzAfterActive }"
       v-if="draggedNode"
       @drop.prevent="dropAfter"
       @dragover.prevent="dragoverAfter"
       @dragenter.prevent.stop="dzAfterActive = true"
       @dragleave.prevent.stop="dzAfterActive = false">
  </div>
</div>

</template>

<script>
import EventBus from '../EventBus';

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
      selected: false,
      draggedNode: null,
      dzAfterActive: false
    }
  },
  watch: {
    selected() {
      this.$emit(this.selected ? 'nodeSelected' : 'nodeDeselected', this)
    },
    'data.children'(children) {
      if (children.length === 0 && this.expanded) {
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
      if (this.data.children && Array.isArray(this.data.children) && this.data.children.length > 0) {
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
      return this.$refs.childNodes || []
    },
    childNodeMoved(childNodeData) {
      let idx = this.data.children.indexOf(childNodeData)
      this.data.children.splice(idx, 1)
      delete window._bTreeView.draggedNodeKey
      delete window._bTreeView.draggedNodeData
    },
    dragstart(ev) {
      ev.dataTransfer.dropEffect = 'none'
      this.$emit('nodeDragged', this)
      EventBus.$emit('nodeDragged', this)
      // didn't use dataTransfer it's not fully supported by ie
      // and beacuse it's not available in the dragover event handler
      if (window._bTreeView === undefined) {
        window._bTreeView = {}
      }
      _bTreeView.draggedNodeData = this.data
      _bTreeView.draggedNodeKey = this.data[this.keyPropName]
    },
    drop(ev) {
      if (window._bTreeView !== undefined
        && window._bTreeView.draggedNodeData !== undefined) {
        if (this.data.children === undefined) {
          Vue.set(this.data, 'children', [])
        }
        this.data.children.push(window._bTreeView.draggedNodeData)
        if (!this.expanded) {
          this.expanded = true
        }
        this.$emit('nodeDropped', this)
      }
    },
    dragover(ev) {
      ev.dataTransfer.dropEffect = 'move'
    },
    dragend(ev) {
      if (ev.dataTransfer.dropEffect === 'move') {
        this.$emit('nodeMoved', this.data)
      }
      EventBus.$emit('nodeDragEnd')
    },
    dragenter(ev) {
      this.dropEffect = ev.dataTransfer.dropEffect = window._bTreeView !== undefined
      && window._bTreeView.draggedNodeKey !== undefined
      && this.data[this.keyPropName] !== window._bTreeView.draggedNodeKey
      && (this.data.children === undefined
      || this.data.children.indexOf(window._bTreeView.draggedNodeData) < 0)
      && !this.isDescendantOf(window._bTreeView.draggedNodeData)
        ? 'move' : 'none'
    },
    dragover(ev) {
      ev.dataTransfer.dropEffect = this.dropEffect || 'none'
    },
    isDescendantOf(nodeData) {
      if (nodeData.children === undefined) {
        return false
      }
      let nodes = [
        nodeData
      ]
      for (let i = 0; i < nodes.length; i++) {
        let tmpNode = nodes[i]
        if (tmpNode.children !== undefined) {
          for (let child of tmpNode.children) {
            if (child === this.data) {
              return true
            }
          }
          nodes.push(...tmpNode.children)
        }
      }
    },
    nodeDragged(draggedNode) {
      this.draggedNode = draggedNode
    },
    nodeDragEnd() {
      this.draggedNode = null
    },
    dropAfter() {
    	this.$emit('dropAfter', this.data)
    },
    dragoverAfter(ev) {
    	ev.dataTransfer.dropEffect = 'move'
    },
    dropAfterChild(afterData) {
    	let dropIdx = this.data.children.indexOf(afterData) + 1
    	this.data.children.splice(dropIdx, 0, window._bTreeView.draggedNodeData)
    }
  },
  created() {
    EventBus.$on('nodeDragged', this.nodeDragged)
    EventBus.$on('nodeDragEnd', this.nodeDragEnd)
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

.tree-branch.selected>.tree-node>.tree-node-label {
  background-color: #007bff;
  color: #fff;
}

.tree-node>svg {
  display: inline-block;
  -ms-user-select: none;
  user-select: none;
}

.tree-node svg>path {
  fill: none;
  opacity: 1;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 4;
  stroke-dasharray: none;
  stroke-opacity: 1
}

.tree-node.has-child-nodes>svg>path {
  fill: currentColor;
}

.tree-node.tree-node-expanded>svg>path {
  fill: none;
}

.drop-after-dropzone {
  height: 8px;
  width: 100%;
  border: 1px dashed #D2D2D2;
  z-index: 1;
}

.drop-after-dropzone.drop-active {
  background-color: yellow;
}


</style>
