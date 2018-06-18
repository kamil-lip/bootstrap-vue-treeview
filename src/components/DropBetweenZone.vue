<template>

<div class="drop-between-zone"
     :class="{ 'active': nodeDragOver }"
     @drop.prevent.stop="drop"
     @dragover.prevent="dragover"
     @dragenter.prevent.stop="nodeDragOver = true"
     @dragleave.prevent.stop="nodeDragOver = false">
</div>

</template>

<script>
import EventBus from '../EventBus';

export default {
  data() {
    return {
      nodeDragOver: false,
    }
  },
  methods: {
    draggingEnded() {
      this.draggedNode = null
    },
    dragover(ev) {
      ev.dataTransfer.dropEffect = 'move'
    },
    drop() {
      this.$emit('nodeDrop')
    }
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
