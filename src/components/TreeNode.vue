<template>
<div class="tree-branch"
     :class="{ selected: selected }">
  <div class="tree-node"
       :class="{ 'has-child-nodes': hasChildren, 'tree-node-expanded': expanded, 'drop-active': nodeDragOver }"
       @drop.prevent="drop"
       @dragover.prevent="dragover"
       :draggable="draggable"
       @dragstart.stop="dragstart"
       @dragend="dragend"
       @dragenter.prevent.stop="dragEnter"
       @dragleave.prevent.stop="dragLeave">
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
       v-show="expanded && data[childrenProp] && Array.isArray(data[childrenProp])">
    <drop-between-zone @nodeDrop="dropNodeAtPosition(0)">
    </drop-between-zone>
  <template v-for="(nodeData, index) in data[childrenProp]">
    <tree-node
       :data="nodeData"
       :key="nodeData[keyProp]"
       ref="childNodes"
       :draggable="draggable"
       @nodeSelected="childNodeSelected"
       @nodeDeselected="childNodeDeselected"
       @nodeDragStart="nodeDragStart">
    </tree-node>
    <drop-between-zone
      @nodeDrop="dropNodeAtPosition(index + 1)">
    </drop-between-zone>
  </template>
  </div>
</div>

</template>

<script>
import EventBus from '../EventBus';
import DropBetweenZone from './DropBetweenZone.vue';

export default {
  name: 'tree-node',
  components: {
    DropBetweenZone
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    keyProp: {
      type: String,
      default: 'id'
    },
    childrenProp: {
      type: String,
      default: 'children'
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
      nodeDragOver: false,
      enterLeaveCounter: 0,
      draggedNode: null
    }
  },
  watch: {
    selected() {
      this.$emit(this.selected ? 'nodeSelected' : 'nodeDeselected', this)
    }
  },
  computed: {
    hasChildren() {
      return this.data[this.childrenProp] !== undefined && this.data[this.childrenProp].length > 0
    }
  },
  methods: {
    toggle() {
      if (this.data[this.childrenProp] && Array.isArray(this.data[this.childrenProp]) && this.data[this.childrenProp].length > 0) {
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
    nodeDragStart() {
      EventBus.$on('dropOK', this.cutNode)
    },
    cutNode() {
      EventBus.$off('dropOK')
      let idx = this.data[this.childrenProp].indexOf(window._bTreeView.draggedNodeData)
      this.data[this.childrenProp].splice(idx, 1)
      // let's notify that node data was successfully cut (removed from array)
      EventBus.$emit('cutOK')
    },
    getChildNodes() {
      return this.$refs.childNodes || []
    },
    dragstart(ev) {
      ev.dataTransfer.dropEffect = 'none'
      this.$emit('nodeDragStart')
      EventBus.$emit('nodeDragStart', this)
      // didn't use dataTransfer it's not fully supported by ie
      // and beacuse it's not available in the dragover event handler
      if (window._bTreeView === undefined) {
        window._bTreeView = {}
      }
      _bTreeView.draggedNodeData = this.data
      _bTreeView.draggedNodeKey = this.data[this.keyProp]
    },
    drop(ev) {
      if (window._bTreeView !== undefined
        && window._bTreeView.draggedNodeData !== undefined) {
        if (this.data[this.childrenProp] === undefined) {
          Vue.set(this.data, 'children', [])
        }
        // let's listen for the cutOK event, which means data has been successfully cut,
        // so we can paste it (append data to the 'children' array)
        EventBus.$on('cutOK', this.appendChild)
        EventBus.$emit('dropOK')
        this.nodeDragOver = false
      }
    },
    appendChild() {
      EventBus.$off('cutOK')
      this.data[this.childrenProp].push(window._bTreeView.draggedNodeData)
      if (!this.expanded) {
        this.expanded = true
      }
      delete window._bTreeView.draggedNodeKey
      delete window._bTreeView.draggedNodeData
    },
    dragEnter(ev) {
      this.enterLeaveCounter++
      this.dropEffect = ev.dataTransfer.dropEffect = window._bTreeView !== undefined
      && window._bTreeView.draggedNodeKey !== undefined
      && this.data[this.keyProp] !== window._bTreeView.draggedNodeKey
      && (this.data[this.childrenProp] === undefined
      || this.data[this.childrenProp].indexOf(window._bTreeView.draggedNodeData) < 0)
      && !this.isDescendantOf(window._bTreeView.draggedNodeData)
        ? 'move' : 'none'
      if (this.dropEffect === 'move' && this.enterLeaveCounter === 1) {
        this.nodeDragOver = true
      }
    },
    dragLeave() {
      this.enterLeaveCounter--
      if (this.enterLeaveCounter !== 1) {
        this.nodeDragOver = false
      }
    },
    dragend(ev) {
      EventBus.$emit('nodeDragEnd')
    },
    dragover(ev) {
      ev.dataTransfer.dropEffect = this.dropEffect || 'none'
    },
    isDescendantOf(nodeData) {
      if (nodeData[this.childrenProp] === undefined) {
        return false
      }
      let nodes = [
        nodeData
      ]
      for (let i = 0; i < nodes.length; i++) {
        let tmpNode = nodes[i]
        if (tmpNode[this.childrenProp] !== undefined) {
          for (let child of tmpNode[this.childrenProp]) {
            if (child === this.data) {
              return true
            }
          }
          nodes.push(...tmpNode[this.childrenProp])
        }
      }
    },
    draggingStarted(draggedNode) {
      this.draggedNode = draggedNode
      this.enterLeaveCounter = 0
      // let's listen for the drag end event
      EventBus.$on('nodeDragEnd', this.draggingEnded)
    },
    draggingEnded() {
      // stop listening for the dragging end event
      EventBus.$off('nodeDragEnd', this.draggingEnded)
      this.draggedNode = null
    },
    dropNodeAtPosition(pos) {
      // position can change if we move node within the same parent node (same level)
      // so it's better to remember node at previous position
      let insertAfter = pos - 1 < 0 ? null : this.data[this.childrenProp][pos - 1]
      EventBus.$on('cutOK', () => {
        let pos = this.data[this.childrenProp].indexOf(insertAfter) + 1
        this.data[this.childrenProp].splice(pos, 0, window._bTreeView.draggedNodeData)
        delete window._bTreeView.draggedNodeKey
        delete window._bTreeView.draggedNodeData
        EventBus.$off('cutOK')
      })
      EventBus.$emit('dropOK')
    }
  },
  created() {
    EventBus.$on('nodeDragStart', this.draggingStarted)
    this.$watch(`data.${this.childrenProp}`, function (children) {
      if (children.length === 0 && this.expanded) {
        this.expanded = false
      }
    })
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

.tree-node.drop-active {
  border: 1px dashed #D2D2D2;
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
</style>
