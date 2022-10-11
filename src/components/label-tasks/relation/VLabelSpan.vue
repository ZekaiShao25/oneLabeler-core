<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { AnnotationSpan } from '../span/types'

export default defineComponent({
  name: 'VLabelSpan',
  props: {
    span: {
      type: Object as PropType<AnnotationSpan>,
      required: true,
    },
    color: {
      type: String as PropType<string>,
      default: '#bbb',
    },
  },
})
</script>

<template>
  <div>
    <button class="px-1 border border-gray-200 rounded flex items-center gap-1">
      <div class="i-fa6-solid:square" :style="{ color }" />
      {{ span.value.category }}
    </button>
    <div class="mx-1">
      {{ span.value.text }}
    </div>
  </div>
</template>
