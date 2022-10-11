<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { AnnotationSpan } from './types'

const toThreeDecimalPlaces = (num: number): string => {
  const parts = num.toString().split('.')
  return parts.length === 1 ? num.toString() : num.toFixed(3)
}

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
    enableLink: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    isSelected: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    isLinking: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: {
    selectSpan: null,
    removeSpan: null,
    linkSpan: null,
  },
  methods: {
    toThreeDecimalPlaces,
  },
})
</script>

<template>
  <div
    class="border border-gray-200 pa-1 rounded"
    :class="{ 'ring ring-black': isSelected }"
    @click="$emit('selectSpan', span)"
  >
    <div class="flex">
      <!-- The category legend. -->
      <div class="px-1 border border-gray-200 rounded flex items-center gap-1">
        <div class="i-fa6-solid:square" :style="{ color }" />
        {{ span.value.category }}
      </div>
      <div class="grow" />
      <div class="px-1 border border-gray-200 rounded">
        range: [{{ toThreeDecimalPlaces(span.value.start) }},
        {{ toThreeDecimalPlaces(span.value.end) }})
      </div>

      <!-- The remove button. -->
      <button
        title="remove"
        class="icon-btn"
        @click.stop="$emit('removeSpan', span)"
      >
        <div class="i-fa6-solid:trash" />
      </button>

      <!-- The link button. -->
      <button
        v-if="enableLink"
        class="icon-btn rounded"
        :class="{ 'ring ring-black': isLinking }"
        @click.stop="$emit('linkSpan', span)"
      >
        <div class="i-fa6-solid:link" />
      </button>
    </div>
    <div class="mx-1">
      {{ span.value.text }}
    </div>
  </div>
</template>
