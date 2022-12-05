<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRefs, watch } from 'vue'
import type { PropType, Ref } from 'vue'
import VDialog from '../../../packages/VDialog/index.vue'
import { AnnotationType } from '../types'
import type { Annotation } from '../types'
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

    const text: Ref<string | null> = ref(null)
    const dialog: Ref<boolean> = ref(false)
    // All these written as ref but not fixed in template
    // because the values of these parameters may need to be adjusted
    // during the iteration process and may be exposed as props later
    const maxWidth: Ref<string> = ref('600px')
    const buttonText: Ref<string> = ref('note')
    const buttonIcon: Ref<string> = ref('i-fa6-solid:envelope-open-text')
    const dialogTitle: Ref<string> = ref('Freeform Text Annotation')
    const label
      = annotations.value === null
        ? null
        : (annotations.value.find(
            (d) => d.type === AnnotationType.FreeformText,
          ) as AnnotationFreeformText | undefined)
    const buttonTitle = computed<string>(() => {
      if (label === null) return 'note'
      return `note: ${label?.value}`
    })
    const syncLabel = (): void => {
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

    const clickCloseDialog = (): void => {
      dialog.value = false
      syncLabel()
      emit('clickClose')
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
      dialog,
      maxWidth,
      buttonIcon,
      buttonText,
      buttonTitle,
      dialogTitle,
      clickCloseDialog,
    }
  },
})
</script>

<template>
  <!-- Using tailwind to implement dialog may require more effort (written as <div>s) -->
  <VDialog :dialog="dialog">
    <template #activator>
      <!-- The activation button. -->
      <slot name="button">
        <!-- what's the card-header-button? -->
        <button
          :title="buttonTitle"
          :disabled="disabled"
          class="font-medium text-sm tracking-normal"
          @click="dialog = !dialog"
        >
          <div :class="buttonIcon" />
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
  <!-- </v-dialog> -->
</template>
