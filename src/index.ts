import 'uno.css'

import * as dataTypeImage from './components/data-types/image'
import * as dataTypeText from './components/data-types/text'
import * as labelTaskRelation from './components/label-tasks/relation'
import * as labelTaskSpan from './components/label-tasks/span'
import { useStore as useAnnotationStore } from './components/label-tasks/store'
import type { Annotation } from './components/label-tasks/types'

export {
  dataTypeImage,
  dataTypeText,
  labelTaskRelation,
  labelTaskSpan,
  useAnnotationStore,
}

export type { Annotation }
