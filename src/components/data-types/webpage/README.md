# webpage data type

Declaration of the webpage data type display.

## API

### BaseDisplay

The vue component to display a single data object.

#### Props

| Name         | Type                | Description                      |
| ------------ | ------------------- | -------------------------------- |
| `dataObject` | `DataObjectWebpage` | The data object to be displayed. |

#### Slots

| Name      | Description                                              |
| --------- | -------------------------------------------------------- |
| `overlay` | Use this slot to overlay label tasks' interaction layer. |

## Usage

```vue
<script setup lang="ts">
import { dataTypeWebpage } from '@onelabeler/core'

const dataObject = {
  uuid: '123',
  value: 'https://github.com/microsoft/OneLabeler-core',
}
const { BaseDisplay } = dataTypeWebpage
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
