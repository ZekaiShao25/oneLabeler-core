# text data type

Declaration of the text data type display.

## API

### BaseDisplay

The vue component to display a single data object.

#### Props

| Name         | Type             | Description                      |
| ------------ | ---------------- | -------------------------------- |
| `dataObject` | `DataObjectText` | The data object to be displayed. |

#### Slots

| Name      | Description                                              |
| --------- | -------------------------------------------------------- |
| `overlay` | Use this slot to overlay label tasks' interaction layer. |

- Note: `getTextNode` and `getEventNode` are exposed to the `overlay` slot
  - `getTextNode`: Get the node that contains the text.
  - `getEventNode`: Get the node on which interaction events are triggered.

## Usage

```vue
<script setup lang="ts">
import { dataTypeText } from '@onelabeler/core'

const dataObject = {
  uuid: '123',
  value: 'my data object',
}
const { BaseDisplay } = dataTypeText
</script>

<template>
  <div
    style="border-width: 2px; border-style: solid; border-color: black; display: inline-flex"
  >
    <BaseDisplay
      :data-object="dataObject"
      style="width: 100px; height: 100px;"
    />
  </div>
</template>
```
