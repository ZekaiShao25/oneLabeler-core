<script lang="ts">
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import { useStore as useAnnotationStore } from '../store'
import { useStore as useToolbarStore } from './composables/useStore'

/** The toolbar widgets of this label task. */
export default defineComponent({
  name: 'BaseToolSingle',
  setup() {
    const annotationStore = useAnnotationStore()
    const toolbarStore = useToolbarStore()

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
