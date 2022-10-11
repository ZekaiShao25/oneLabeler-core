<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import type { PropType, Ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { useStore as useAnnotationStore } from '../store'
import { AnnotationType } from '../types'
import useSpan from '../span/composables/useSpan'
import type { AnnotationSpan } from '../span/types'
import VLabelRelation from './VLabelRelation.vue'
import type { AnnotationRelation } from './types'

export default defineComponent({
  name: 'BasePanel',
  components: { VLabelRelation },
  props: {
    /** The hook of store storing annotations. */
    useAnnotationStore: {
      type: Function as PropType<typeof useAnnotationStore>,
      required: true,
    },
  },
  setup(props) {
    const { useAnnotationStore } = toRefs(props)

    const store = useAnnotationStore.value()
    const { annotations, category2color } = storeToRefs(store)

    const { spans, selectSpan, isSelected } = useSpan(store)

    const relations = computed(
      () =>
        annotations.value.filter(
          (d) => d.type === AnnotationType.Relation,
        ) as AnnotationRelation[],
    )
    const removeRelation = (relation: AnnotationRelation): void => {
      store.remove(relation.uuid)
    }
    const uuid2span: Ref<Record<string, AnnotationSpan>> = computed(() => {
      if (spans.value === null) return {}
      return Object.fromEntries(spans.value.map((d) => [d.uuid, d]))
    })
    const getSpanByUuid = (uuid: string): AnnotationSpan | null =>
      uuid2span.value[uuid] ?? null

    return {
      relations,
      isSelected,
      category2color,
      removeRelation,
      selectSpan,
      getSpanByUuid,
    }
  },
})
</script>

<template>
  <div class="flex flex-col">
    <div class="h-9.5 border-y border-gray-200 flex items-center gap-2 px-2">
      <div class="i-fa6-solid:circle-info" />
      <div>Relations</div>
    </div>
    <!-- A list of relations. -->
    <div class="flex-1 flex flex-col gap-1 p-1 overflow-auto">
      <VLabelRelation
        v-for="relation in relations"
        :key="relation.uuid"
        :relation="relation"
        :source="getSpanByUuid(relation.value.sourceUuid)"
        :target="getSpanByUuid(relation.value.targetUuid)"
        :category2color="category2color"
        :is-selected="isSelected"
        @select-span="selectSpan($event)"
        @remove-relation="removeRelation(relation)"
      />
    </div>
  </div>
</template>
