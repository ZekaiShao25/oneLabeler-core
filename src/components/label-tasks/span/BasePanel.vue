<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'
import type { PropType, Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import type { useStore as useAnnotationStore } from '../store'
import { AnnotationType } from '../types'
import type { AnnotationRelation } from '../relation/types'
import VLabelSpan from './VLabelSpan.vue'
import useSpan from './composables/useSpan'
import type { AnnotationSpan } from './types'

export default defineComponent({
  name: 'BasePanel',
  components: { VLabelSpan },
  props: {
    /** The pinia store to store annotations. */
    useAnnotationStore: {
      type: Function as PropType<typeof useAnnotationStore>,
      required: true,
    },
  },
  setup(props) {
    const { useAnnotationStore } = toRefs(props)

    const store = useAnnotationStore.value()
    const { category2color } = storeToRefs(store)

    const sourceUuid: Ref<string | null> = ref(null)
    const linkSpan = (span: AnnotationSpan): void => {
      if (sourceUuid.value === null) {
        sourceUuid.value = span.uuid
        return
      }
      const relation: AnnotationRelation = {
        uuid: uuidv4(),
        type: AnnotationType.Relation,
        value: {
          sourceUuid: sourceUuid.value,
          targetUuid: span.uuid,
        },
      }
      store.add(relation)
      sourceUuid.value = null
    }
    const isLinking = (span: AnnotationSpan): boolean =>
      sourceUuid.value !== null && sourceUuid.value === span.uuid

    return {
      ...useSpan(store),
      isLinking,
      category2color,
      linkSpan,
    }
  },
})
</script>

<template>
  <div class="flex flex-col">
    <div class="h-9.5 border-b border-gray-200 flex items-center gap-2 px-2">
      <div class="i-fa6-solid:circle-info" />
      <div>Spans</div>
    </div>
    <!-- A list of spans. -->
    <div class="flex-1 flex flex-col gap-1 p-1 overflow-auto">
      <VLabelSpan
        v-for="span in spans"
        :key="span.uuid"
        :span="span"
        :color="category2color(span.value.category)"
        :is-selected="isSelected(span)"
        :is-linking="isLinking(span)"
        @select-span="selectSpan"
        @remove-span="removeSpan"
        @link-span="linkSpan"
      />
    </div>
  </div>
</template>
