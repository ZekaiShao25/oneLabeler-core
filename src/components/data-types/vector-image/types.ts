import type { DataObject } from '../types'

/** The interface of an image data object. */
export interface DataObjectVectorImage extends DataObject {
  /** The universal unique id of the data object. */
  uuid: string
  /** The content of the vector-image. */
  value: string | null
}
