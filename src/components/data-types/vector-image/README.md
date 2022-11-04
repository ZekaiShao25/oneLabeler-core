# webpage data type

Declaration of the vector-image data type display.

## API

### BaseDisplay

The vue component to display a single data object.

#### Props

| Name         | Type                    | Description                      |
| ------------ | ----------------------- | -------------------------------- |
| `dataObject` | `DataObjectVectorImage` | The data object to be displayed. |

#### Slots

| Name      | Description                                              |
| --------- | -------------------------------------------------------- |
| `overlay` | Use this slot to overlay label tasks' interaction layer. |

## Usage

```vue
<script setup lang="ts">
import { dataTypeVectorImage } from '@onelabeler/core'

const dataObject = {
  uuid: '123',
  value:
    '<svg width="400" height="180"><rect x="50" y="20" rx="20" ry="20" width="150" height="150" style="fill:red;stroke:black;stroke-width:5;opacity:0.5" /></svg>',
}
const { BaseDisplay } = dataTypeVectorImage
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
