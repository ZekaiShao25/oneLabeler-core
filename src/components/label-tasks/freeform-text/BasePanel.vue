<script lang="ts">
import { defineComponent, ref, toRefs, watch } from 'vue'
import type { PropType, Ref } from 'vue'
import type { Annotation } from '../types'
import useLabel from './useLabel'
import type { AnnotationFreeformText } from './types'

export default defineComponent({
  name: 'BasePanel',
  props: {
    annotations: {
      type: [Array, null] as PropType<Annotation[] | null>,
      default: null,
      required: true,
    },
  },
  emits: ['upsertLabels'],
  setup(props, { emit }) {
    const { annotations } = toRefs(props)

    const onSetLabelText = (
      partialFreeformText: Partial<AnnotationFreeformText>,
    ): void => {
      emit('upsertLabels', partialFreeformText)
    }

    const { text, syncLabel, setLabelText } = useLabel(
      annotations,
      onSetLabelText,
    )
    return {
      text,
      syncLabel,
      setLabelText,
    }
  },
})
</script>

<template>
  <div class="flex flex-col">
    <div class="h-9.5 border-b border-gray-200 flex items-center gap-2 px-2">
      <div class="i-fa6-solid:circle-info" />
      <div>Freeform Text</div>
    </div>
    <!-- A list of freeform-texts -->
    <div class="flex-1 flex flex-col gap-1 p-1">
      <textarea
        class="flex-1 resize-none auto-cols-auto auto-rows-auto"
        :value="text ?? ''"
        @change="text = ($event.target as HTMLInputElement).value"
      />
      <button
        class="border border-gray-200 rounded items-center"
        type="submit"
        @click="setLabelText"
      >
        submit
      </button>
    </div>
  </div>
</template>
