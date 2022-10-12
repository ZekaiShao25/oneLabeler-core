# span label task

Declaration of the span label task.

## API

### BaseOverlay (_Required_)

The vue component for interaction overlay to be superimposed on data object display to enable the label task.
Must be used to enable span annotation.

#### Props

| Name                 | Type                        | Description                                             |
| -------------------- | --------------------------- | ------------------------------------------------------- |
| `useAnnotationStore` | `typeof useAnnotationStore` | The pinia store to store annotations.                   |
| `useToolbarStore`    | `typeof useToolbarStore`    | The pinia store to store toolbar states.                |
| `getTextNode`        | `() => Text`                | Get the node that contains the text.                    |
| `getEventNode`       | `() => HTMLElement`         | Get the node on which interaction events are triggered. |

### BasePanel (_Optional_)

The vue component to show span annotations.

#### Props

| Name                 | Type                        | Description                           |
| -------------------- | --------------------------- | ------------------------------------- |
| `useAnnotationStore` | `typeof useAnnotationStore` | The pinia store to store annotations. |

### BaseToolSingle (_Required_)

The vue component to show toolbar widgets of this label task.

#### Props

| Name                 | Type                        | Description                              |
| -------------------- | --------------------------- | ---------------------------------------- |
| `useAnnotationStore` | `typeof useAnnotationStore` | The pinia store to store annotations.    |
| `useToolbarStore`    | `typeof useToolbarStore`    | The pinia store to store toolbar states. |

### useToolbarStore (_Required_)

The pinia store to store toolbar states.

## Usage

### BaseOverlay (_Required_)

```vue
<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  dataTypeText,
  labelTaskSpan,
  useAnnotationStore,
} from '@onelabeler/core'

export default defineComponent({
  components: {
    BaseDisplay: dataTypeText.BaseDisplay,
    BaseOverlay: labelTaskSpan.BaseOverlay,
  },
  setup() {
    const dataObject = ref({ uuid: '', value: 'my string' })
    return {
      dataObject,
      useAnnotationStore,
      useToolbarStore: labelTaskSpan.useToolbarStore,
    }
  },
})
</script>

<template>
  <div class="w-1/1 h-1/1 border-gray-200 flex flex-col">
    <div class="h-9.5 border-b border-gray-200 flex gap-2 px-2 items-center">
      <div class="i-fa6-solid:code" />
      <div>Data Object</div>
      <div class="grow" />
    </div>
    <BaseDisplay
      class="p-2 flex-1 whitespace-pre-wrap"
      :data-object="dataObject"
    >
      <template #overlay="props">
        <BaseOverlay
          v-bind="props"
          style="grid-area: 1 / 1 / 2 / 2"
          :use-annotation-store="useAnnotationStore"
          :use-toolbar-store="useToolbarStore"
        />
      </template>
    </BaseDisplay>
  </div>
</template>
```
