import type { Annotation, AnnotationType } from '../types'

/** The relation annotation. */
export interface AnnotationFreeformText extends Annotation {
  /** The uuid of the annotation. */
  uuid: string
  /** The type of the annotation. */
  type: AnnotationType.FreeformText
  /** The text annotation. */
  value: string | null
}
