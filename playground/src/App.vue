<script setup lang="ts">
import { dataTypeText } from '@onelabeler/core'

const dataObject = {
  uuid: '123',
  value: 'my data object',
}
const { BaseDisplay } = dataTypeText
</script>

<template>
  <div style="border-width: 2px; border-style: solid; border-color: black; display: inline-flex">
    <BaseDisplay :data-object="dataObject" style="width: 100px; height: 100px" />
  </div>
</template>
