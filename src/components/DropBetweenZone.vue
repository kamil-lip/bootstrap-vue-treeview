<template>

<div class="drop-between-zone"
     :class="{ 'active': nodeDragOver }"
     v-if="draggedNode"
     @drop.prevent.stop="drop"
     @dragover.prevent="dragover"
     @dragenter.prevent.stop="nodeDragOver = true"
     @dragleave.prevent.stop="nodeDragOver = false">
</div>

</template>

<script>
import EventBus from '../EventBus';

export default {
  props: {

  },
  data() {
    return {
      nodeDragOver: false,
      draggedNode: null
    }
  },
  methods: {
    draggingEnded() {
      EventBus.$off('draggingEnded', this.draggingEnded)
      this.draggedNode = null
    },
    draggingStarted(draggedNode) {
      this.nodeDragOver = false
      this.draggedNode = draggedNode
      // let's listen for the drag end event
      EventBus.$on('nodeDragEnd', this.draggingEnded)
    },
    dragover(ev) {
      ev.dataTransfer.dropEffect = 'move'
    },
    drop() {
      this.$emit('nodeDrop')
    }
  },
  created() {
    EventBus.$on('nodeDragStart', this.draggingStarted)
  }
}

</script>

<style>

.drop-between-zone {
  height: 4px;
  width: 100%;
  z-index: 1;
}

.drop-between-zone.active {
  position: static;
  top: 0;
  border: 1px dashed #D2D2D2;
  height: 24px;
}

</style>
