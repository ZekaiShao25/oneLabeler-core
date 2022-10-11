import { nextTick, onMounted, ref, watch } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import type { Ref } from 'vue'
import type { AnnotationSpan, Box } from '../types'

/** Compute the boxes to render for the span annotations. */
const useBoxes = (
  spans: Ref<AnnotationSpan[]>,
  getTextNode: Ref<() => Text>,
  container: Ref<HTMLElement | undefined>,
) => {
  // Implementation note: boxes depend on the rendering result of the text.
  // Thus it should not be a computed property,
  // as the HTML may not be updated when computed properties are computed.

  const getBoxes = (): Box[] => {
    if (container.value === undefined) return []

    const textNode = getTextNode.value()
    const boundingBox = container.value.getBoundingClientRect()

    const boxes = spans.value
      .filter((span: AnnotationSpan) => span.value.end < textNode.length)
      .reduce((acc: Box[], span: AnnotationSpan) => {
        const range = document.createRange()
        range.setStart(textNode, span.value.start)
        range.setEnd(textNode, span.value.end)

        // Do not plot the spans outside the viewport.
        const rects = [...range.getClientRects()].filter(
          (rect) =>
            rect.top <= boundingBox.bottom
            && rect.bottom >= boundingBox.top
            && rect.left <= boundingBox.right
            && rect.right >= boundingBox.left,
        )

        // Clip the spans to fit inside the viewport.
        return acc.concat(
          rects.map((d) => ({
            top: Math.max(d.top, boundingBox.top),
            bottom: Math.min(d.bottom, boundingBox.bottom),
            left: Math.max(d.left, boundingBox.left),
            right: Math.min(d.right, boundingBox.right),
            span,
          })),
        )
      }, [])
    return boxes
  }

  const boxes: Ref<Box[]> = ref([])
  const updateBoxes = (): void => {
    boxes.value = getBoxes()
  }
  onMounted(async () => {
    await nextTick()
    updateBoxes()
  })
  watch(spans, async () => {
    await nextTick()
    updateBoxes()
  })
  useResizeObserver(container, updateBoxes)

  return { boxes, getBoxes, updateBoxes }
}

export default useBoxes
