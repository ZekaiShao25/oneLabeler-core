<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { AnnotationSpan } from '../span/types'
import type { Annotation } from '../types'
import VLabelSpan from './VLabelSpan.vue'

export default defineComponent({
  name: 'VLabelRelation',
  components: { VLabelSpan },
  props: {
    source: {
      type: Object as PropType<AnnotationSpan | null>,
      default: null,
    },
    target: {
      type: Object as PropType<AnnotationSpan | null>,
      default: null,
    },
    category2color: {
      type: Function as PropType<(label: string) => string>,
      required: true,
    },
    isSelected: {
      type: Function as PropType<(span: Annotation) => boolean>,
      default: null,
    },
  },
  emits: {
    selectSpan: null,
    removeRelation: null,
  },
})
</script>

<template>
  <div class="flex items-center gap-1">
    <!-- The source span on the left. -->
    <VLabelSpan
      v-if="source !== null"
      :span="source"
      :color="category2color(source.value.category)"
      :class="{ 'ring ring-black': isSelected !== null && isSelected(source) }"
      class="flex-1 border border-gray-200 rounded p-1"
      @click="$emit('selectSpan', source)"
    />

    <div class="i-fa6-solid:arrow-right" />

    <!-- The target span on the right. -->
    <VLabelSpan
      v-if="target !== null"
      :span="target"
      :color="category2color(target.value.category)"
      :class="{ 'ring ring-black': isSelected !== null && isSelected(target) }"
      class="flex-1 border border-gray-200 rounded p-1"
      @click="$emit('selectSpan', target)"
    />

    <!-- Delete relation button. -->
    <button title="remove" class="icon-btn" @click="$emit('removeRelation')">
      <div class="i-fa6-solid:trash" />
    </button>
  </div>
</template>
