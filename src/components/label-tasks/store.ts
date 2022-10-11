import { acceptHMRUpdate, defineStore } from 'pinia'
import { scaleOrdinal } from 'd3-scale'
import { schemePaired } from 'd3-scale-chromatic'
import type { Annotation } from './types'

export const useStore = defineStore('annotation', {
  state: () => ({
    /** The list of annotations. */
    annotations: [] as Annotation[],
    /** The selected annotations. */
    selection: [] as Annotation[],
    /** The label categories. */
    categories: [] as string[],
  }),
  getters: {
    /** The color mapping for label categories. */
    category2color(): (category: string) => string {
      const { categories } = this
      const scale = scaleOrdinal(schemePaired).domain(categories)
      return (category: string): string => scale(category)
    },
  },
  actions: {
    /** Add an annotation. */
    add(annotation: Annotation): void {
      this.annotations.push(annotation)
    },
    /** Add multiple annotations. */
    addBulk(annotations: Annotation[]): void {
      this.annotations = [...this.annotations, ...annotations]
    },
    /** Update multiple annotations. */
    updateBulk(updated: Annotation[]): void {
      const uuid2updated: Record<string, Annotation> = {}
      updated.forEach((d) => {
        uuid2updated[d.uuid] = d
      })
      this.annotations = this.annotations.map((d) =>
        d.uuid in uuid2updated ? uuid2updated[d.uuid] : d,
      )
    },
    /** Remove an annotation. */
    remove(uuid: string): void {
      const index = this.annotations.findIndex((d) => d.uuid === uuid)
      this.annotations.splice(index, 1)
    },
    /** Remove multiple annotations. */
    removeBulk(uuids: string[]): void {
      const toRemove = new Set(uuids)
      this.annotations = this.annotations.filter((d) => !toRemove.has(d.uuid))
    },
    /** Remove all annotations. */
    clear(): void {
      this.annotations = []
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
