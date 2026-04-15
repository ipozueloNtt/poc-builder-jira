# ath-switch



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                         | Type      | Default     |
| ---------- | ---------- | ----------------------------------------------------------------------------------- | --------- | ----------- |
| `disabled` | `disabled` | Determines if the switch is disabled and cannot be interacted with                  | `boolean` | `false`     |
| `name`     | `name`     | Name to identify the switch                                                         | `string`  | `undefined` |
| `readonly` | `readonly` | Makes the switch read-only, preventing user interaction while still being focusable | `boolean` | `false`     |
| `selected` | `selected` | Controls the selected/unselected state of the switch                                | `boolean` | `false`     |


## Events

| Event       | Description                                  | Type                                                 |
| ----------- | -------------------------------------------- | ---------------------------------------------------- |
| `athBlur`   | Event emitted when the switch loses focus    | `CustomEvent<void>`                                  |
| `athChange` | Event emitted when the switch state changes  | `CustomEvent<{ selected: boolean; name?: string; }>` |
| `athFocus`  | Event emitted when the switch receives focus | `CustomEvent<void>`                                  |


## Methods

### `setFocus() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
