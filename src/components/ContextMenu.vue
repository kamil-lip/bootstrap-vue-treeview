<template>

<vue-context-menu id="context-menu" ref="ctxMenu">
  <li class="ctx-item" @click.stop.prevent="menuItemSelected(item)" v-for="item in contextMenuItems">{{ item.label }}</li>
</vue-context-menu>

</template>

<script>

import EventBus from '../EventBus';
import VueContextMenu from 'vue-context-menu'

export default {
  components: {
    VueContextMenu
  },
  props: {
    contextMenuItems: {
      type: Array
    }
  },
  data() {
    return {
      activeNode: null
    }
  },
  methods: {
    open(node) {
      this.activeNode = node
      this.$refs.ctxMenu.open()
    },
    menuItemSelected(item) {
      EventBus.$emit('contextMenuItemSelect', item, this.activeNode)
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