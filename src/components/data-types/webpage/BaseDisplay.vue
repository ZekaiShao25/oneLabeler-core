<script lang="ts">
import type { PropType } from 'vue'
import type { DataObjectWebpage } from './types'

export default {
  name: 'BaseDisplay',
  props: {
    /** The data object to be rendered. */
    dataObject: {
      type: Object as PropType<DataObjectWebpage>,
      required: true,
    },
  },
}
</script>

<template>
  <iframe :src="dataObject.value" />
</template>
