<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, watch } from 'vue'
import type { PropType, Ref } from 'vue'
import { AnnotationType } from '../types'
import type { Annotation } from '../types'
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

    const text: Ref<string | null> = ref(null)

    const syncLabel = (): void => {
      const label
        = annotations.value === null
          ? null
          : (annotations.value.find(
              (d) => d.type === AnnotationType.FreeformText,
            ) as AnnotationFreeformText | undefined)
      text.value = label?.value ?? null
    }

    const setLabelText = (): void => {
      const partialFreeformText: Partial<AnnotationFreeformText> = {
        type: AnnotationType.FreeformText,
        value: text.value,
      }
      // syncLabel()
      emit('upsertLabels', partialFreeformText)
    }

    watch(annotations, () => {
      syncLabel()
    })

    // onMounted(() => {
    //   syncLabel()
    // })

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
      <!-- the css (props) not fully modified yet;
      does I rewrite auto-grow in tailwind properly?
      what about label='Annotation' in v-textarea? -->
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
