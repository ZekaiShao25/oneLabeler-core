/** The types of annotations. */
export enum AnnotationType {
  /** Span tagging. */
  Span = 'Span',
  /** Relation between annotations. */
  Relation = 'Relation',
}

/** The base annotation interface. */
export interface Annotation {
  /** The uuid of the annotation. */
  uuid: string
  /** The type of the annotation. */
  type: string
  /** The content of the annotation. */
  value: unknown
}
