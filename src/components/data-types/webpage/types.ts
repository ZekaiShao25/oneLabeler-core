import type { DataObject } from '../types'

/** The interface of an image data object. */
export interface DataObjectWebpage extends DataObject {
  /** The universal unique id of the data object. */
  uuid: string
  /** The webpage url. */
  value: string
}
