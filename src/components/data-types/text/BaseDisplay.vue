<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { DataObjectText } from './types'

export default defineComponent({
  name: 'BaseDisplay',
  props: {
    /** The data object to be rendered. */
    dataObject: {
      type: Object as PropType<DataObjectText>,
      required: true,
    },
  },
  methods: {
    /**
     * Get the node that contains the text.
     * Needed by span label task.
     */
    getTextNode(): Text {
      const element = this.$refs.text as HTMLElement
      const node = [...element.childNodes].find(
        (d) => d.nodeType === Node.TEXT_NODE,
      ) as Text | undefined
      if (node === undefined) throw new Error('Text node does not exist.')
      return node
    },
    /**
     * Get the node on which interaction events are triggered.
     * Needed by span label task.
     */
    getEventNode(): HTMLElement {
      return this.$refs.medium as HTMLElement
    },
  },
})
</script>

<template>
  <div style="display: grid">
    <!-- Expose getTextNode and getEventNode to label task's overlay. -->
    <slot
      name="overlay"
      :get-text-node="getTextNode"
      :get-event-node="getEventNode"
    />
    <div
      ref="medium"
      class="data-object-container"
      style="grid-area: 1 / 1 / 2 / 2"
    >
      <p ref="text" class="data-object-content">
        {{ dataObject.value }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.data-object-container {
  position: relative;
  overflow-y: auto;
  line-height: initial;
}

.data-object-content {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
