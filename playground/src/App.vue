<script lang="ts">
import { defineComponent } from 'vue'
import { useAnnotationStore } from '@onelabeler/core'
import TheSingleObjectBoard from '../../src/components/wips-modules/interactive-labeling/single-object-display/interface/TheSingleObjectBoard/index.vue'

export default defineComponent({
  components: {
    BaseBoard: TheSingleObjectBoard,
  },
  setup() {
    const dataObjects = [{
      uuid: '123',
      value: {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Playfair_TimeSeries-2.png/640px-Playfair_TimeSeries-2.png',
        width: 2067,
        height: 1527,
        filename: 'Playfair TimeSeries-2.png',
      },
    },
    {
      uuid: '3fbbcb0a-9d01-51b0-aa57-76e406c6f1f1',
      value: {
        url: 'https://media.davidrumsey.com/rumsey/Size4/RUMSEY~8~1/190/14247037.jpg',
        width: 1536,
        height: 1167,
      },
    },
    {
      uuid: '3ad6fa67-0d8f-5c7a-a02b-f01581f0b483',
      value: {
        url: 'https://media.davidrumsey.com/rumsey/Size4/RUMSEY~8~1/195/14350030.jpg',
        width: 1536,
        height: 1043,
      },
    },
    {
      uuid: 'c793fb53-0025-57f2-93c3-5a824d100c0a',
      value: {
        url: 'https://media.davidrumsey.com/rumsey/Size4/RUMSEY~8~1/168/12114000.jpg',
        width: 1317,
        height: 1536,
      },
    },
    {
      uuid: 'e32a858f-77a5-53fc-89c3-3795da15d6a0',
      value: {
        url: 'https://media.davidrumsey.com/rumsey/Size4/RUMSEY~8~1/179/13201048.jpg',
        width: 1277,
        height: 1536,
      },
    },
    {
      uuid: 'f1dda4c2-7a89-5018-b852-fbc2675a6fc3',
      value: {
        url: 'https://media.davidrumsey.com/rumsey/Size4/D0120/1642011.jpg',
        width: 1536,
        height: 1067,
      },
    },
    {
      uuid: '6fadcf1d-d087-5914-ad47-7eaa8edcbce7',
      value: {
        url: 'https://media.davidrumsey.com/rumsey/Size4/D0094/00944052.jpg',
        width: 1536,
        height: 1058,
      },
    },
    {
      uuid: '08de3757-ebd9-58ee-808e-7fd6ee855835',
      value: {
        url: 'https://media.davidrumsey.com/rumsey/Size4/RUMSEY~8~1/190/14247040.jpg',
        width: 1536,
        height: 1164,
      },
    },
    {
      uuid: 'c738de38-cd82-5bb8-a642-2a691ad069b6',
      value: {
        url: 'https://media.davidrumsey.com/rumsey/Size4/RUMSEY~8~1/190/14256242.jpg',
        width: 1141,
        height: 1536,
      },
    },
    {
      uuid: 'b73f2ff1-8898-545f-a320-ce38791ba165',
      value: {
        url: 'https://media.davidrumsey.com/rumsey/Size4/D0116/2152155.jpg',
        width: 1536,
        height: 908,
      },
    },
    ]

    return {
      dataObjects,
      useAnnotationStore,
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
    <BaseBoard
      class="p-2 flex-1 whitespace-pre-wrap"
      :data-objects="dataObjects"
      :use-annotation-store="useAnnotationStore"
    />
  </div>
</template>
