# ath-input-textarea



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description                                                                              | Type                   | Default                                         |
| ---------------- | ------------------ | ---------------------------------------------------------------------------------------- | ---------------------- | ----------------------------------------------- |
| `autocomplete`   | `autocomplete`     | Whether the input will be autocompleted.                                                 | `string`               | `undefined`                                     |
| `autofocus`      | `autofocus`        | Whether the input is focused on page load.                                               | `boolean`              | `undefined`                                     |
| `counter`        | `counter`          | Shows a counter                                                                          | `boolean`              | `undefined`                                     |
| `counterLabel`   | `counter-label`    | SThe label of the counter                                                                | `string`               | `'[length] de [max] caracteres. Quedan [rest]'` |
| `disabled`       | `disabled`         | If true, the user cannot interact with the input.                                        | `boolean`              | `false`                                         |
| `feedback`       | `feedback`         | The type of the feedback. If 'error' the error feedback will be shown                    | `"error" \| "none"`    | `InputFeedbackTypes.None`                       |
| `feedbackText`   | `feedback-text`    | The feedback message.                                                                    | `string`               | `undefined`                                     |
| `helperText`     | `helper-text`      | Message to help the user fills the input value                                           | `string`               | `undefined`                                     |
| `hideRequired`   | `hide-required`    | If true, the * asterisk will be hidden when required = true.                             | `boolean`              | `false`                                         |
| `inputAriaLabel` | `input-aria-label` | The aria-label attribute of the input                                                    | `string`               | `undefined`                                     |
| `inputTabindex`  | `input-tabindex`   | Set tabindex                                                                             | `string`               | `'0'`                                           |
| `label`          | `label`            | Represents the caption of the input                                                      | `string`               | `undefined`                                     |
| `maxlength`      | `maxlength`        | Specifies the maximum number of characters allowed in the input element                  | `number`               | `undefined`                                     |
| `name`           | `name`             | The name of the input. Submitted with the form as part of a name/value pair              | `string`               | `undefined`                                     |
| `placeholder`    | `placeholder`      | Instructional text that shows before the input has a value.                              | `string`               | `undefined`                                     |
| `readonly`       | `readonly`         | If true, the user cannot modify the value.                                               | `boolean`              | `false`                                         |
| `required`       | `required`         | If true, the user must fill in a value before submitting a form.                         | `boolean`              | `false`                                         |
| `rows`           | `rows`             | Number of visible rows.                                                                  | `number`               | `undefined`                                     |
| `size`           | `size`             | The size of the input                                                                    | `"lg" \| "md" \| "sm"` | `InputSizes.Medium`                             |
| `tooltipText`    | `tooltip-text`     | The text to be shown in the tooltip                                                      | `string`               | `undefined`                                     |
| `tooltipWidth`   | `tooltip-width`    | The max width to the text in the tooltip                                                 | `number`               | `0`                                             |
| `value`          | `value`            | Current value of the form control. Submitted with the form as part of a name/value pair. | `string`               | `undefined`                                     |
| `width`          | `width`            | The max width to the text in the tooltip                                                 | `string`               | `undefined`                                     |


## Events

| Event       | Description                                                                                | Type                  |
| ----------- | ------------------------------------------------------------------------------------------ | --------------------- |
| `athBlur`   | Emitted when the input loses focus                                                         | `CustomEvent<void>`   |
| `athChange` | Emitted when the value has changed. This event doesn't fire until the control loses focus. | `CustomEvent<string>` |
| `athFocus`  | Emitted when the input gains focus                                                         | `CustomEvent<void>`   |
| `athInput`  | Emitted every time the value is updated by introducing a change                            | `CustomEvent<string>` |


## Methods

### `setFocus() => Promise<void>`

Method to set the focus on the input element

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
