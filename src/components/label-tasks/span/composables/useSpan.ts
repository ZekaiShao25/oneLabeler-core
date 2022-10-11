import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import type { useStore } from '../../store'
import { AnnotationType } from '../../types'
import type { Annotation } from '../../types'
import type { AnnotationRelation } from '../../relation/types'
import type { AnnotationSpan } from '../types'

const useSpan = (store: ReturnType<typeof useStore>) => {
  const { annotations, selection } = storeToRefs(store)
  const removeBulk = store.removeBulk

  const spans = computed(
    () =>
      annotations.value.filter(
        (d) => d.type === AnnotationType.Span,
      ) as AnnotationSpan[],
  )
  const relations = computed(
    () =>
      annotations.value.filter(
        (d) => d.type === AnnotationType.Relation,
      ) as AnnotationRelation[],
  )

  const removeSpan = (span: AnnotationSpan): void => {
    const { uuid } = span
    const toRemove: string[] = [
      // Remove the label span itself.
      uuid,
      // Remove the relations that involve the span.
      ...relations.value
        ?.filter(
          (d) => d.value.sourceUuid === uuid || d.value.targetUuid === uuid,
        )
        .map((d) => d.uuid),
    ]
    removeBulk(toRemove)
  }

  const selectSpan = (span: AnnotationSpan | null): void => {
    store.selection = span === null ? [] : [span]
  }

  const isSelected = (annotation: Annotation): boolean =>
    selection.value.find((d) => d.uuid === annotation.uuid) !== undefined

  return {
    spans,
    removeSpan,
    selectSpan,
    isSelected,
  }
}

export default useSpan
