# span label task

Declaration of the span label task.

## API

### BaseOverlay (_Required_)

The vue component for interaction overlay to be superimposed on data object display to enable the label task.
Must be used to enable span annotation.

#### Props

| Name                 | Type                        | Description                                             |
| -------------------- | --------------------------- | ------------------------------------------------------- |
| `useAnnotationStore` | `typeof useAnnotationStore` | The pinia store to store annotations.                   |
| `useToolbarStore`    | `typeof useToolbarStore`    | The pinia store to store toolbar states.                |
| `getTextNode`        | `() => Text`                | Get the node that contains the text.                    |
| `getEventNode`       | `() => HTMLElement`         | Get the node on which interaction events are triggered. |

### BasePanel (_Optional_)

The vue component to show span annotations.

#### Props

| Name                 | Type                        | Description                           |
| -------------------- | --------------------------- | ------------------------------------- |
| `useAnnotationStore` | `typeof useAnnotationStore` | The pinia store to store annotations. |

### BaseToolSingle (_Required_)

The vue component to show toolbar widgets of this label task.

#### Props

| Name                 | Type                        | Description                              |
| -------------------- | --------------------------- | ---------------------------------------- |
| `useAnnotationStore` | `typeof useAnnotationStore` | The pinia store to store annotations.    |
| `useToolbarStore`    | `typeof useToolbarStore`    | The pinia store to store toolbar states. |

### useToolbarStore (_Required_)

The pinia store to store toolbar states.
