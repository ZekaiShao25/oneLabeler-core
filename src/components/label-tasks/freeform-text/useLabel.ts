import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { AnnotationType } from '../types'
import type { Annotation } from '../types'
import type { AnnotationFreeformText } from './types'

const useLabel = (
  annotations: Ref<Annotation[] | null>,
  onSetLabelText: (
    partialFreeformText: Partial<AnnotationFreeformText>,
  ) => void,
) => {
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
    onSetLabelText(partialFreeformText)
  }
  watch(annotations, () => {
    syncLabel()
  })
  return {
    text,
    syncLabel,
    setLabelText,
  }
}

export default useLabel
