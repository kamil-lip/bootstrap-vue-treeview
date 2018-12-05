<template>

<vue-context-menu id="context-menu" ref="ctxMenu">
  <li class="ctx-item" @click.stop.prevent="menuItemSelected(item)" v-for="item in ctxItemsForType">{{ item.label }}</li>
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
      type: [Array, Object]
    }
  },
  data() {
    return {
      activeNode: null
    }
  },
  computed: {
    ctxItemsForType() {
      if (this.activeNode === null) return [];
      const ctxIsArray = Array.isArray(this.contextMenuItems);
      const defaultMenu = this.contextMenuItems.default || this.contextMenuItems;
      const nodeType = this.activeNode.data.type;

      if (ctxIsArray) return defaultMenu;
      if (!nodeType) return defaultMenu;

      if (!this.contextMenuItems[nodeType]) return defaultMenu;

      return this.contextMenuItems[nodeType];
    }
  },
  methods: {
    open({ event, node }) {
      this.activeNode = node
      this.$refs.ctxMenu.open(event)
      EventBus.$emit('openNodeContextMenu', this)
    },
    menuItemSelected(item) {
      EventBus.$emit('contextMenuItemSelect', item, this.activeNode);
    }
  },
  created() {
    EventBus.$on('openNodeContextMenuInternal', this.open)
  }
}

</script>

<style>

.ctx-item {
  cursor: pointer;
  user-select: none;
}

</style>
