<template>

<contextmenu id="context-menu" ref="ctxMenu">
  <contextmenu-item
    class="ctx-item"
    @click="menuItemSelected(item)"
    v-for="item in ctxItemsForType"
    :key="`vue-treeview-ctx-menu-${item.label}`"
  >{{ item.label }}</contextmenu-item>
</contextmenu>

</template>

<script>
import 'v-contextmenu/dist/index.css';
import EventBus from '../EventBus';
import { Contextmenu, ContextmenuItem } from 'v-contextmenu'

export default {
  components: {
    Contextmenu,
    ContextmenuItem,
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

      if (!this.contextMenuItems[nodeType]) return [];

      return this.contextMenuItems[nodeType];
    }
  },
  methods: {
    open({ event, node }) {
      this.activeNode = node
      if (!this.ctxItemsForType || this.ctxItemsForType.length === 0) return;
      this.$refs.ctxMenu.show({
        top: event.clientY,
        left: event.clientX,
      });
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
