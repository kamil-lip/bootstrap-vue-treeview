<template>

<context-menu id="context-menu" ref="ctxMenu">
  <li class="ctx-item" @click="deleteNode">Delete</li>
</context-menu>

</template>

<script>
import EventBus from '../EventBus';
import ContextMenu from 'vue-context-menu'

export default {
  components: {
    ContextMenu
  },
  data() {
    return {
      activeNodeKey: null
    }
  },
  methods: {
    deleteNode() {
      EventBus.$emit('deleteNode', this.activeNodeKey)
    },
    open(nodeKey) {
      this.activeNodeKey = nodeKey
      this.$refs.ctxMenu.open()
    }
  },
  created() {
    EventBus.$on('openNodeContextMenu', this.open)
  }
}

</script>

<style>

.ctx-item {
  cursor: pointer;
  user-select: none;
}

</style>