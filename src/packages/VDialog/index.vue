<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref, toRefs, watch } from 'vue'

export default defineComponent({
  props: {
    dialog: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const { dialog } = toRefs(props)
    const value = ref(dialog.value)
    watch(dialog, () => (value.value = dialog.value))
    return { value }
  },
})
</script>

<template>
  <slot name="activator">
    <button
      class="icon-btn border-l border-r px-4 mx-4 border-gray-200"
      @click="value = !value"
    />
  </slot>
  <Teleport to="#app">
    <div
      v-if="value"
      class="fixed w-1/1 h-1/1 flex bg-gray bg-opacity-50"
      style="z-index: 1"
    >
      <div class="m-auto">
        <slot>
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700" />
        </slot>
      </div>
    </div>
  </Teleport>
</template>
