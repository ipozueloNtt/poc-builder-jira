# ath-checkbox-group



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description                                                                | Type                             | Default             |
| ------------------- | --------------------- | -------------------------------------------------------------------------- | -------------------------------- | ------------------- |
| `disabled`          | `disabled`            | Indica si esta deshabilitado                                               | `boolean`                        | `false`             |
| `feedback`          | `feedback`            | Indica el tipo de feedback                                                 | `"error" \| "none" \| "success"` | `FeedbackType.None` |
| `feedbackText`      | `feedback-text`       | Texto feedback                                                             | `string`                         | `undefined`         |
| `helperText`        | `helper-text`         | Texto ayuda                                                                | `string`                         | `undefined`         |
| `label`             | `label`               | Texto para el Label                                                        | `string`                         | `undefined`         |
| `name`              | `name`                | Atributo name a aplicar a todo el grupo                                    | `string`                         | `undefined`         |
| `readonly`          | `readonly`            | Indica si es solo lectura                                                  | `boolean`                        | `false`             |
| `requiredAriaLabel` | `required-aria-label` | Texto oculto para lectores de pantalla indicando que el grupo es requerido | `string`                         | `undefined`         |
| `showRequired`      | `show-required`       | Indica si se muestra el asterisco                                          | `boolean`                        | `false`             |
| `tooltipText`       | `tooltip-text`        | Indica el texto del tooltip                                                | `string`                         | `undefined`         |
| `tooltipWidth`      | `tooltip-width`       | Indica el ancho de la burbuja tooltip                                      | `number`                         | `0`                 |


## Events

| Event        | Description                                | Type                                       |
| ------------ | ------------------------------------------ | ------------------------------------------ |
| `athChecked` | Emite el array de checkboxes seleccionados | `CustomEvent<CheckboxChangeEventDetail[]>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
