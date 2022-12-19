<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'VPagination',
  props: {
    current: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 20,
    },
    perPage: {
      type: Number,
      default: 1,
    },
    pageRange: {
      type: Number,
      default: 10,
    },
    // textBeforeInput: {
    //   type: String,
    //   default: 'Go to page',
    // },
    // textAfterInput: {
    //   type: String,
    //   default: 'Go',
    // },
  },
  emits: ['pageChanged'],
  computed: {
    pages() {
      const pages = []
      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i)
      }
      return pages
    },
    rangeStart() {
      const start = this.current - this.pageRange
      return (start > 0) ? start : 1
    },
    rangeEnd() {
      const end = this.current + this.pageRange
      return (end < this.totalPages) ? end : this.totalPages
    },
    totalPages() {
      return Math.ceil(this.total / this.perPage)
    },
    nextPage() {
      return this.current + 1
    },
    prevPage() {
      return this.current - 1
    },
  },
  methods: {
    hasFirst() {
      return this.rangeStart !== 1
    },
    hasLast() {
      return this.rangeEnd < this.totalPages
    },
    hasPrev() {
      return this.current > 1
    },
    hasNext() {
      return this.current < this.totalPages
    },
    changePage(page: number) {
      if (page > 0 && page <= this.totalPages) {
        this.$emit('pageChanged', page)
      }
    },
  },
})
</script>

<template>
  <div class="min-w-max">
    <section class="flex justify-between bg-white rounded-lg border border-gray-200 px-10 py-3 text-gray-700 font-montserrat">
      <ul class="flex items-center">
        <li v-if="hasPrev()" class="pr-6 list-none">
          <a href="#" class="no-underline" @click.prevent="changePage(prevPage)">
            <div class="flex items-center justify-center hover:bg-gray-200 rounded-md transform  h-6 w-6">
              <div class="transform ">
                <svg
                  class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </div>
          </a>
        </li>
        <li v-if="hasFirst()" class="pr-6 list-none">
          <a href="#" class="no-underline" @click.prevent="changePage(1)">
            <div class="flex hover:bg-gray-200 rounded-md transform  h-6 w-6 items-center justify-center">
              <span class="transform ">
                1
              </span>
            </div>
          </a>
        </li>
        <li v-if="hasFirst()" class="pr-6 list-none">
          ...
        </li>
        <li
          v-for=" (page, i) in pages"
          :key="i"
          class="pr-6 list-none"
        >
          <a href="#" class="no-underline" @click.prevent="changePage(page)">
            <div
              :class="{ 'bg-gradient-to-r from-gray-400 to-indigo-400': current === page }"
              class="flex hover:bg-gray-200 rounded-md transform  h-6 w-6 items-center justify-center"
            >
              <span class="transform ">{{ page }}</span>
            </div>
          </a>
        </li>
        <li v-if="hasLast()" class="pr-6 list-none">
          ...
        </li>
        <li v-if="hasLast()" class="pr-6 list-none">
          <a href="#" class="no-underline" @click.prevent="changePage(totalPages)">
            <div class="flex hover:bg-gray-200 rounded-md transform  h-6 w-6 items-center justify-center">
              <span class="transform ">
                {{ totalPages }}
              </span>
            </div>
          </a>
        </li>
        <li v-if="hasNext()" class="pr-6 list-none">
          <a href="#" class="no-underline" @click.prevent="changePage(nextPage)">
            <div class="flex items-center justify-center hover:bg-gray-200 rounded-md transform  h-6 w-6">
              <div class="transform ">
                <svg
                  class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>
