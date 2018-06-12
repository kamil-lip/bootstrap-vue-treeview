<template>
<div class="tree-view">
  <div class="before-after-dropzone"
       :class="{ 'drop-active': dzPrependActive }"
       v-if="draggedNode"
       @drop.prevent="prependDrop"
       @dragover.prevent="dragoverBeforeAfter"
       @dragenter.prevent.stop="dzPrependActive = true"
       @dragleave.prevent.stop="dzPrependActive = false">
  </div>
  <tree-node v-for="nodeData in data"
             :data="nodeData"
             :key="nodeData[keyPropName]"
             :draggable="nodesDraggable"
             ref="rootNodes"
             @nodeSelected="nodeSelected"
             @nodeDeselected="nodeDeselected"
             @draggingStarted="listenForDropOKEvent"
             @insertAfter="insertAfter">
  </tree-node>
</div>

</template>

<script>
import TreeNode from './TreeNode.vue';
import EventBus from '../EventBus';

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
      draggedNode: null,
      dzPrependActive: false
    }
  },
  components: {
    TreeNode
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
    listenForDropOKEvent() {
      EventBus.$on('dropOK', this.cutNodeData)
    },
    draggingStarted(draggedNode) {
      this.draggedNode = draggedNode
      // let's listen for the drag end event
      EventBus.$on('draggingEnded', this.draggingEnded)
    },
    draggingEnded() {
      // stop listening for the dragging end event
      EventBus.$off('draggingEnded', this.draggingEnded)
      this.draggedNode = null
    },
    prependDrop() {
      if (window._bTreeView !== undefined
        && window._bTreeView.draggedNodeData !== undefined) {
        EventBus.$on('cutOK', this.prependNode)
        EventBus.$emit('dropOK')
      }
      this.dzAfterActive = false
    },
    prependNode() {
      EventBus.$on('cutOK', this.prependNode)
      this.data.splice(0, 0, window._bTreeView.draggedNodeData)
      delete window._bTreeView.draggedNodeKey
      delete window._bTreeView.draggedNodeData
    },
    cutNodeData() {
      EventBus.$off('dropOK')
      let idx = this.data.indexOf(window._bTreeView.draggedNodeData)
      this.data.splice(idx, 1)
      // let's notify that node data was successfully cut (removed from array)
      EventBus.$emit('cutOK')
    },
    dragoverBeforeAfter(ev) {
      ev.dataTransfer.dropEffect = 'move'
    },
    insertAfter(afterData) {
      let dropIdx = this.data.indexOf(afterData) + 1
      this.data.splice(dropIdx, 0, window._bTreeView.draggedNodeData)
      delete window._bTreeView.draggedNodeKey
      delete window._bTreeView.draggedNodeData
    }
  },
  created() {
    this.selectedNode = null
    EventBus.$on('draggingStarted', this.draggingStarted)
    this.$nextTick(() => {
      this.createNodeMap()
    })
  }
}

</script>

<style>
</style>
