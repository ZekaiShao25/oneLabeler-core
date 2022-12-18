<script lang="ts">
import { computed, defineComponent, ref, toRefs } from 'vue'
import type { PropType, Ref } from 'vue'
import VDialog from '../../../packages/VDialog/index.vue'
import { AnnotationType } from '../types'
import type { Annotation } from '../types'
import useLabel from './useLabel'
import type { AnnotationFreeformText } from './types'

export default defineComponent({
  name: 'BaseToolSingle',
  components: { VDialog },
  props: {
    annotations: {
      type: [Array, null] as PropType<Annotation[] | null>,
      default: null,
      required: true,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['upsertLabels', 'clickClose'],
  setup(props, { emit }) {
    const { annotations } = toRefs(props)
    const dialog: Ref<boolean> = ref(false)
    const buttonTitle = computed<string>(() => {
      const label
        = annotations.value === null
          ? null
          : (annotations.value.find(
              (d) => d.type === AnnotationType.FreeformText,
            ) as AnnotationFreeformText | undefined)
      if (label === null) return 'note'
      return `note: ${label?.value}`
    })

    const onSetLabelText = (
      partialFreeformText: Partial<AnnotationFreeformText>,
    ): void => {
      emit('upsertLabels', partialFreeformText)
    }

    const { text, syncLabel, setLabelText } = useLabel(
      annotations,
      onSetLabelText,
    )
    const clickCloseDialog = (): void => {
      dialog.value = false
      syncLabel()
      emit('clickClose')
    }

    return {
      text,
      syncLabel,
      setLabelText,
      dialog,
      buttonTitle,
      clickCloseDialog,
    }
  },
  data() {
    return {
      maxWidth: '600px',
      buttonText: 'note',
      dialogTitle: 'Freeform Text Annotation',
    }
  },
})
</script>

<template>
  <div>
    <VDialog :dialog="dialog">
      <template #activator>
        <!-- The activation button. -->
        <slot name="button">
          <button
            :title="buttonTitle"
            :disabled="disabled"
            class="font-medium text-sm tracking-normal"
            @click="dialog = !dialog"
          >
            <div class="i-fa6-solid:envelope-open-text" />
            {{ buttonText }}
          </button>
        </slot>
      </template>
      <!-- A list of freeform-texts -->
      <div class="px-6 py-4 bg-white rounded-md">
        <div class="flex flex-row bg-gray-100 py-2 rounded-t-md">
          <slot name="dialog-header">
            <span class="px-2 font-normal text-xl tracking-normal select-none">
              {{ dialogTitle }}
            </span>

            <div style="flex: 0 1 2%" />
            <button
              class="px-1 border border-gray-200 rounded flex items-center gap-1 text-xl"
              type="submit"
              @click="setLabelText"
            >
              submit
            </button>
            <div class="grow" />
            <button
              class="px-2 rounded-md border-hidden bg-transparent text-xl"
              title="Close"
              @click="clickCloseDialog"
            >
              <div class="i-fa6-solid:xmark" />
            </button>
          </slot>
        </div>
        <textarea
          class="resize-none w-192 h-192 text-base border-gray-200 rounded-b-md"
          :value="text ?? ''"
          @change="text = ($event.target as HTMLInputElement).value"
        />
      </div>
    </VDialog>
  </div>
</template>
