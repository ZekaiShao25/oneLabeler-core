<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
// import type { DataObject } from '../../../../../data-types/types'
import { BaseDisplay } from '../../../../../data-types/image'
// import type { DataObject } from '../../../../../data-types/types'
import type { DataObjectImage } from '../../../../../data-types/image'
import { BasePanel, BaseToolSingle } from '../../../../../label-tasks/freeform-text'
import type { Annotation } from '../../../../../label-tasks/types'
// import type { AnnotationFreeformText } from '../../../../../label-tasks/freeform-text'

export default defineComponent({
  name: 'TheBody',
  components: { BaseDisplay, BaseToolSingle, BasePanel },
  props: {
    dataObject: {
      type: Object as PropType<DataObjectImage>,
      required: true,
    },
    annotations: {
      type: [Array, null] as PropType<Annotation[] | null>,
      required: true,
    },
  },
  emits: ['upsertLabels'],
})
</script>

<template>
  <div style="display: flex; gap: 4px; padding: 4px;">
    <!-- The content of the data object. -->
    <BaseDisplay
      class="p-2 flex-1 whitespace-pre-wrap"
      :dataObject="dataObject"
      :style="{
        width: `${dataObject.value.width as number / 4}px`,
        height: `${dataObject.value.height as number / 4}px`,
      }"
    />
    <!-- The interaction panels of label tasks. -->
    <BaseToolSingle
      style="flex: 0 1 20%"
      :annotations="annotations"
      @upsert-labels="$emit('upsertLabels', $event)"
    />
  </div>
</template>
