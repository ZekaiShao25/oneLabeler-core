import type { DataObject } from '../types'

/** The interface of an image data object. */
export interface DataObjectVectorImage extends DataObject {
  /** The universal unique id of the data object. */
  uuid: string
  /** The content of the data object. The text string. */
  value: {
    /** The url of the vector-image. */
    url: string | null
  }
}
