<script lang="ts">
import { v4 as uuidv4 } from 'uuid'
import type { PropType } from 'vue'
import { defineComponent, ref, toRefs, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { onKeyDown, useElementVisibility } from '@vueuse/core'
import { useStore as useAnnotationStore } from '../store'
import { AnnotationType } from '../types'
import useBoxes from './composables/useBoxes'
import useSpan from './composables/useSpan'
import { useStore as useToolbarStore } from './composables/useStore'
import type { AnnotationSpan } from './types'

export default defineComponent({
  name: 'BaseOverlay',
  props: {
    /** Get the node that contains the text. */
    getTextNode: {
      type: Function as PropType<() => Text>,
      required: true,
    },
    /** Get the node on which interaction events are triggered. */
    getEventNode: {
      type: Function as PropType<() => HTMLElement>,
      required: true,
    },
  },
  setup(props) {
    const { getTextNode } = toRefs(props)

    const annotationStore = useAnnotationStore()
    const toolbarStore = useToolbarStore()

    const { category2color, selection } = storeToRefs(annotationStore)
    const { stroke } = storeToRefs(toolbarStore)

    const { spans, removeSpan, selectSpan, isSelected }
      = useSpan(annotationStore)

    const container = ref<HTMLDivElement>()
    const isVisible = useElementVisibility(container)
    onKeyDown('Delete', () => {
      if (isVisible.value === false) return
      selection.value.forEach((d) => {
        if (d.type === AnnotationType.Span) {
          removeSpan(d as AnnotationSpan)
        }
      })
    })

    const onTryCreateSpan = (): void => {
      if (stroke.value === null) return
      const selection = document.getSelection()
      if (selection === null) return
      const { anchorNode } = selection
      const textNode = getTextNode.value()
      // Check if the selection starts at the text node.
      if (anchorNode !== textNode) return

      const text: string = selection.toString()
      // Note: the index is zero based (first letter has index 0).
      const start: number = Math.min(
        selection.anchorOffset,
        selection.focusOffset,
      )
      const end: number = Math.max(
        selection.anchorOffset,
        selection.focusOffset,
      )
      // Clear the text selection.
      selection.empty()
      if (start === end || end < 0) return
      const span: AnnotationSpan = {
        uuid: uuidv4(),
        type: AnnotationType.Span,
        value: {
          start,
          end,
          category: stroke.value,
          text,
        },
      }
      annotationStore.add(span)
      selectSpan(null)
    }
    watch(stroke, () => {
      // When changing brush category,
      // try to create a span if there exists a text selection
      // for which a span has not been created.
      onTryCreateSpan()

      // If there exist a label span selection, change its category.
      if (stroke.value === null) return
      const updated: AnnotationSpan[] = selection.value
        .filter((d) => d.type === AnnotationType.Span)
        .map((d) => ({ ...(d as AnnotationSpan), category: stroke.value }))
      annotationStore.updateBulk(updated)
    })
    const onClickMedium = (e: MouseEvent): void => {
      // Broadcast the click event from the medium to the text box.
      // Find the top box that contains the clicked position.
      const x = e.clientX
      const y = e.clientY
      const elements = document.elementsFromPoint(x, y) as HTMLElement[]
      const element = elements.find((d) => container.value?.contains(d))
      if (element !== undefined) {
        element.click()
      }
      else {
        selectSpan(null)
      }
      onTryCreateSpan()
    }

    const { boxes, updateBoxes } = useBoxes(spans, getTextNode, container)

    return {
      container,
      boxes,
      selectSpan,
      isSelected,
      onClickMedium,
      updateBoxes,
      category2color,
      stroke,
    }
  },
  mounted() {
    const medium = this.getEventNode()
    medium.onclick = this.onClickMedium
    medium.onscroll = this.updateBoxes
  },
})
</script>

<template>
  <div ref="container" style="pointer-events: none">
    <div
      v-for="(box, i) in boxes"
      :key="i"
      style="position: fixed; pointer-events: initial"
      :style="{
        'width': `${box.right - box.left}px`,
        'height': `${box.bottom - box.top}px`,
        'left': `${box.left}px`,
        'top': `${box.top}px`,
        // 8-digit hex notation with opacity stored
        'background-color': `${category2color(box.span.value.category)}80`,
        'border': isSelected(box.span) ? 'gray 3px solid' : undefined,
      }"
      @click="selectSpan(box.span)"
    />
  </div>
</template>
