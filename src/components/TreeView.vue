<template>

<div class="tree-view">
  <drop-between-zone
    @nodeDrop="dropNodeAtPosition(0)">
  </drop-between-zone>
  <template v-for="(nodeData, index) in data">
    <tree-node
             :data="nodeData"
             :key="nodeData[keyPropName]"
             :draggable="nodesDraggable"
             ref="rootNodes"
             @nodeSelected="nodeSelected"
             @nodeDeselected="nodeDeselected"
             @nodeDragStart="nodeDragStart">
    </tree-node>
    <drop-between-zone
      @nodeDrop="dropNodeAtPosition(index + 1)">
    </drop-between-zone>
  </template>
</div>

</template>

<script>

import TreeNode from './TreeNode.vue';
import EventBus from '../EventBus.js';
import DropBetweenZone from './DropBetweenZone.vue'

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
    nodesDraggable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      draggedNode: null
    }
  },
  components: {
    TreeNode,
    DropBetweenZone
  },
  methods: {
    createNodeMap() {
      if (this.nodeMap === undefined) {
        let nodeMap = this.nodeMap = new Map()

        let nodes = this.$refs.rootNodes.slice()

        for (let i = 0; i < nodes.length; i++) {
          let tmpNode = nodes[i]
          nodes.push(...tmpNode.getChildNodes())
        }

        for (let tmpNode of nodes) {
          nodeMap.set(tmpNode.data[this.keyPropName], tmpNode) // TODO: change to getter
        }
      }
    },
    getNodeByKey(key) {
      return this.nodeMap.get(key)
    },
    nodeSelected(node) {
      if (this.selectedNode !== null) {
        this.selectedNode.deselect()
      }
      this.selectedNode = node
    },
    nodeDeselected(node) {
      if (node === this.selectedNode) {
        this.selectedNode = null
      }
    },
    nodeDragStart() {
      EventBus.$on('dropOK', this.cutNode)
    },
    cutNode() {
      EventBus.$off('dropOK')
      let idx = this.data.indexOf(window._bTreeView.draggedNodeData)
      this.data.splice(idx, 1)
      // let's notify that node data was successfully cut (removed from array)
      EventBus.$emit('cutOK')
    },
    draggingStarted(draggedNode) {
      this.draggedNode = draggedNode
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
      let insertAfter = pos - 1 < 0 ? null : this.data[pos - 1]
      EventBus.$on('cutOK', () => {
        let pos = this.data.indexOf(insertAfter) + 1
        this.data.splice(pos, 0, window._bTreeView.draggedNodeData)
        delete window._bTreeView.draggedNodeKey
        delete window._bTreeView.draggedNodeData
        EventBus.$off('cutOK');
      })
      EventBus.$emit('dropOK')
    }
  },
  created() {
    this.selectedNode = null
    EventBus.$on('nodeDragStart', this.draggingStarted)
    this.$nextTick(() => {
      this.createNodeMap()
    })
  }
}

</script>

<style>


</style>
