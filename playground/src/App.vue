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
  <div class="w-1/1 h-1/1 border-l border-gray-200 flex flex-col">
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
