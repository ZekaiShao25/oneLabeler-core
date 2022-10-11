import type { Annotation, AnnotationType } from '../types'

/** The relation annotation. */
export interface AnnotationRelation extends Annotation {
  /** The uuid of the annotation. */
  uuid: string
  /** The type of the annotation. */
  type: AnnotationType.Relation
  /** The content of the annotation. */
  value: {
    /** The uuid of the source annotation. */
    sourceUuid: string
    /** The uuid of the target annotation. */
    targetUuid: string
    /** The category of the relation. */
    category?: string
  }
}
