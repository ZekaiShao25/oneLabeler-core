import type { Annotation, AnnotationType } from '../types'

export interface Box {
  top: number
  bottom: number
  left: number
  right: number
  span: AnnotationSpan
}

/** The named entity annotation. */
export interface AnnotationSpan extends Annotation {
  /** The uuid of the annotation. */
  uuid: string
  /** The type of the annotation. */
  type: AnnotationType.Span
  /** The content of the annotation. */
  value: {
    /** The start of the span. */
    start: number
    /** The end of the span. */
    end: number
    /** The category of the span. */
    category: string
    /** The string of the entity. */
    text: string
  }
}
