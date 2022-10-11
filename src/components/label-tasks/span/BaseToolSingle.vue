<script lang="ts">
import { storeToRefs } from 'pinia'
import { defineComponent, toRefs } from 'vue'
import type { PropType } from 'vue'
import type { useStore as useAnnotationStore } from '../store'
import type { useStore as useToolbarStore } from './composables/useStore'

/** The toolbar widgets of this label task. */
export default defineComponent({
  name: 'BaseToolSingle',
  props: {
    /** The pinia store to store annotations. */
    useAnnotationStore: {
      type: Function as PropType<typeof useAnnotationStore>,
      required: true,
    },
    /** The pinia store to store toolbar states. */
    useToolbarStore: {
      type: Function as PropType<typeof useToolbarStore>,
      required: true,
    },
  },
  setup(props) {
    const { useAnnotationStore, useToolbarStore } = toRefs(props)

    const annotationStore = useAnnotationStore.value()
    const toolbarStore = useToolbarStore.value()

    const { categories, category2color } = storeToRefs(annotationStore)
    const { stroke } = storeToRefs(toolbarStore)

    return {
      categories,
      category2color,
      stroke,
      toggleStroke: toolbarStore.toggleStroke,
    }
  },
})
</script>

<template>
  <div class="flex gap-1">
    <button
      v-for="category in categories"
      :key="category"
      class="btn gap-1"
      :class="stroke === category ? 'selected' : ''"
      @click="toggleStroke(category)"
    >
      <div
        class="i-fa6-solid:square"
        :style="{ color: category2color(category) }"
      />
      {{ category }}
    </button>
  </div>
</template>
