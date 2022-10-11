# span label task

Declaration of the span label task.

## API

### BaseOverlay (_Required_)

The vue component for interaction overlay to be superimposed on data object display to enable the label task.
Must be used to enable span annotation.

#### Props

| Name           | Type                | Description                                             |
| -------------- | ------------------- | ------------------------------------------------------- |
| `getTextNode`  | `() => Text`        | Get the node that contains the text.                    |
| `getEventNode` | `() => HTMLElement` | Get the node on which interaction events are triggered. |

### BasePanel (_Optional_)

The vue component for showing span annotations.

### BaseToolSingle (_Required_)

The vue component for showing toolbar widgets of this label task.
