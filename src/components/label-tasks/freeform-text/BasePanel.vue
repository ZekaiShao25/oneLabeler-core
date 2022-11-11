<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, watch } from 'vue'
import type { PropType, Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { AnnotationType } from '../types'
import type { useStore as useAnnotationStore } from '../store'
import type { AnnotationFreeformText } from './types'

export default defineComponent({
  name: 'BasePanel',
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
    const { annotations } = storeToRefs(store)

    const text: Ref<string | null> = ref(null)

    const syncLabel = (): void => {
      const label = annotations.value.find(
        (d) => d.type === AnnotationType.FreeformText,
      ) as AnnotationFreeformText | undefined
      text.value = label?.value ?? null
    }

    const setLabelText = (): void => {
      const freeformText: AnnotationFreeformText = {
        uuid: uuidv4(),
        type: AnnotationType.FreeformText,
        value: text.value,
      }
      syncLabel()
      store.add(freeformText)
    }

    watch(store, () => {
      syncLabel()
    })

    onMounted(() => {
      syncLabel()
    })

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
    <div class="flex-1 flex flex-col gap-1 p-1 overflow-scroll">
      <!-- the css (props) not fully modified yet;
      does I rewrite auto-grow in tailwind properly?
      what about label='Annotation' in v-textarea? -->
      <textarea
        class="resize-none auto-rows-auto auto-cols-auto"
        :value="text ?? ''"
        @change="text = ($event.target as HTMLInputElement).value"
      />
      <button
        class="px-1 border border-gray-200 rounded flex items-center gap-1"
        type="submit"
        @click="setLabelText"
      >
        submit
      </button>
    </div>
  </div>
</template>
