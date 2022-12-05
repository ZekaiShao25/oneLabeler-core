# freeform-text label task

Declaration of the freeform-text label task.

## API

### BasePanel (_Optional_)

The vue component to show freeform-text annotations.

#### Props

| Name          | Type          | Description |
| ------------- | ------------- | ----------- | -------------------------------------- |
| `annotations` | `Annotation[] | null`       | The annotations of current dataObject. |

### BaseToolSingle (_Optional_)

The vue component to show toolbar widgets of freeform-text label task.

#### Props

| Name          | Type          | Description |
| ------------- | ------------- | ----------- | -------------------------------------- |
| `annotations` | `Annotation[] | null`       | The annotations of current dataObject. |

## Usage

### BasePanel (_Optional_)

```vue
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { dataTypeImage, labelTaskFreeformText } from '@onelabeler/core'

export default defineComponent({
  components: {
    BaseDisplay: dataTypeImage.BaseDisplay,
    BasePanel: labelTaskFreeformText.BasePanel,
  },
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
      :data-object="dataObject"
      :style="{
        width: `${dataObject.value.width as number / 4}px`,
        height: `${dataObject.value.height as number / 4}px`,
      }"
    />
    <!-- The interaction panels of label tasks. -->
    <BasePanel
      style="flex: 0 1 20%"
      :annotations="annotations"
      @upsert-labels="$emit('upsertLabels', $event)"
    />
  </div>
</template>
```
