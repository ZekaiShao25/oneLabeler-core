<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { DataObjectVectorImage } from './types'

export default defineComponent({
  name: 'BaseDisplay',
  props: {
    /** The data object to be rendered. */
    dataObject: {
      type: Object as PropType<DataObjectVectorImage>,
      required: true,
    },
  },
})
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <!-- use .value here (not the .html before) -->
  <div v-html="dataObject.value" />
</template>
