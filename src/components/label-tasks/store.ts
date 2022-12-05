import { defineStore } from 'pinia'
import { scaleOrdinal } from 'd3-scale'
import { schemePaired } from 'd3-scale-chromatic'
import type { Annotation } from './types'

/** The enum of label status types. */
export enum StatusType {
  /** The data object is not viewed and not labeled. */
  New = 'New',
  /** The data object is viewed but not yet labeled. */
  Viewed = 'Viewed',
  /** The data object is viewed but skipped. */
  Skipped = 'Skipped',
  /** The data object is labeled. */
  Labeled = 'Labeled',
}

/** The base Status interface. */
export interface Status {
  uuid: string
  value: StatusType
}

export const useStore = defineStore('annotation', {
  state: () => ({
    /** The list of annotations. */
    annotations: [] as Annotation[],
    /** The selected annotations. */
    selection: [] as Annotation[],
    /** The label categories. */
    categories: [] as string[],
    /** The label statuses of the data objects. */
    statuses: [] as Status[],
  }),
  getters: {
    /** The status mapping for data objects. */
    uuidToStatus(): Record<string, StatusType> {
      const { statuses } = this
      return Object.fromEntries(statuses.map((d) => [d.uuid, d.value]))
    },
    /** The color mapping for label categories. */
    category2color(): (category: string) => string {
      const { categories } = this
      const scale = scaleOrdinal(schemePaired).domain(categories)
      return (category: string): string => scale(category)
    },
  },
  actions: {
    isLabeled(uuid: string): boolean {
      const { uuidToStatus } = this
      return uuid in uuidToStatus && uuidToStatus[uuid] === StatusType.Labeled
    },
    /** Add an annotation. */
    add(annotation: Annotation): void {
      this.annotations.push(annotation)
    },
    /** Add multiple annotations. */
    addBulk(annotations: Annotation[]): void {
      this.annotations = [...this.annotations, ...annotations]
    },
    /** Update an annotation. */
    update(updated: Annotation): void {
      const index = this.annotations.findIndex((d) => d.uuid === updated.uuid)
      this.annotations[index] = updated
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
