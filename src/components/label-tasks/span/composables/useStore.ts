import { acceptHMRUpdate, defineStore } from 'pinia'

export const useStore = defineStore('toolbar', {
  state: () => ({
    stroke: null as string | null,
  }),
  actions: {
    setStroke(category: string): void {
      this.stroke = category
    },
    toggleStroke(category: string): void {
      this.stroke = this.stroke === category ? null : category
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
