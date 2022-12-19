<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRefs, watch } from 'vue'
import type { PropType, Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { StatusType } from '../../../../../label-tasks/store'
// import { Status } from '../../../../../label-tasks/store'
import type { useStore as useAnnotationStore } from '../../../../../label-tasks/store'
import type { DataObjectImage } from '../../../../../data-types/image'
import type { DataObject } from '../../../../../data-types/types'
import type { AnnotationFreeformText } from '../../../../../label-tasks/freeform-text'
import type { Annotation } from '../../../../../label-tasks/types'
import TheBody from './TheBody.vue'
import VPagination from './pagination.vue'
// import { Annotation } from '../../../../../label-tasks/types'

export default defineComponent({
  name: 'TheSingleObjectBoard',
  components: { TheBody, VPagination },
  props: {
    dataObjects: {
      type: Array as PropType<DataObject[]>,
      required: true,
    },
    useAnnotationStore: {
      type: Function as PropType<typeof useAnnotationStore>,
      required: true,
    },
  },
  setup(props) {
    const { useAnnotationStore } = toRefs(props)
    const dataObjects = toRefs(props).dataObjects as Ref<DataObjectImage[]>
    const store = useAnnotationStore.value()
    const { annotations, statuses } = storeToRefs(store)
    // statuses初始化
    statuses.value = dataObjects.value.map((d) => ({ uuid: d.uuid, value: StatusType.New }))

    const page: Ref<number> = ref(1)

    const showDataObject = computed<boolean> (() => {
      return dataObjects.value !== null && dataObjects.value.length !== 0
    })
    const dataObject = computed<DataObjectImage> (() => {
      // if (!showDataObject.value) return null
      if (!showDataObject.value) {
        try {
          throw new Error('There must be a dataObject')
        }
        catch (error) {
          console.log('error')
        }
      }
      return dataObjects.value[page.value - 1]
    })
    const filteredAnnotations = computed<Annotation[] | null> (() => {
      if (!showDataObject.value) return null
      // 有了islabeled应该就不用看length了吧
      // if (annotations.value.length === 0) return null
      if (!store.isLabeled(dataObject.value.uuid as string)) return null
      return annotations.value.filter((d) => d.uuid === dataObject.value.uuid)
    })
    const enablePagination = computed<boolean> (() => {
      if (!showDataObject.value) return false
      return dataObjects.value.length >= 2
    })
    const nPages = computed<number> (() => {
      if (!showDataObject.value) return 0
      return dataObjects.value.length
    })

    watch(dataObjects, () => {
      page.value = 1
    })

    onMounted(() => {
      page.value = 1
    })

    const onUpsertLabels = (partialLabel: Partial<AnnotationFreeformText>) => {
      // if (dataObject.value === null) return
      console.log('onUpsertLabels')
      console.log(partialLabel)
      if (!store.isLabeled(dataObject.value.uuid as string)) {
        store.add({ uuid: dataObject.value.uuid, ...partialLabel } as AnnotationFreeformText)
        // 这个更新状态的操作应该写在store里吗？
        const index = statuses.value.findIndex((d) => d.uuid === dataObject.value.uuid)
        statuses.value[index].value = StatusType.Labeled
      }
      else store.update({ uuid: dataObject.value.uuid, ...partialLabel } as AnnotationFreeformText)
    }

    return {
      page,
      showDataObject,
      dataObject,
      filteredAnnotations,
      enablePagination,
      nPages,
      onUpsertLabels,
    }
  },
})
</script>

<!-- :style="styleCardElevated" -->
<template>
  <div
    style="display: flex; flex-direction: column"
  >
    <div
      v-if="showDataObject"
      style="flex: 1 1 auto display: flex flex-direction: column"
    >
      <TheBody
        style="height: 10px flex: 1 1 auto"
        :data-object="dataObject"
        :annotations="filteredAnnotations"
        @upsert-labels="onUpsertLabels"
      />
      <template v-if="enablePagination">
        <div
          class="divide-y"
        />
        <VPagination
          :current="page"
          :total="nPages"
          :page-range="Math.min(5, nPages)"
          @page-changed="page = $event"
        />
      </template>
    </div>
    <div
      v-else
      class="subtitle-1 mx-auto"
      style="flex: 1 1 auto display: flex align-items: center"
    >
      No Data Objects Queried
    </div>
  </div>
</template>
