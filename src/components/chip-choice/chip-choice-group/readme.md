# ath-chip-choice-group



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                       | Type           | Default                 |
| ---------- | ---------- | ----------------------------------------------------------------- | -------------- | ----------------------- |
| `disabled` | `disabled` | Weather the chips are disabled                                    | `boolean`      | `false`                 |
| `multiple` | `multiple` | Allow multiple selection of chips                                 | `boolean`      | `false`                 |
| `name`     | `name`     | The generic name for the chips                                    | `string`       | `undefined`             |
| `size`     | `size`     | The generic size of the chips                                     | `"md" \| "sm"` | `ChipChoiceSize.Medium` |
| `value`    | `value`    | The value for not multiple (use chip-choice-group as radio-group) | `string`       | `undefined`             |
| `width`    | `width`    | The width of the group                                            | `string`       | `undefined`             |


## Events

| Event            | Description                             | Type                                      |
| ---------------- | --------------------------------------- | ----------------------------------------- |
| `athChangeValue` | Event to emit the current chips checked | `CustomEvent<HTMLAthChipChoiceElement[]>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
