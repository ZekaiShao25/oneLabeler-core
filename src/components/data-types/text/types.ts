import type { DataObject } from '../types'

/** The interface of an image data object. */
export interface DataObjectText extends DataObject {
  /** The universal unique id of the data object. */
  uuid: string
  /** The content of the data object. The text string. */
  value: string
}
