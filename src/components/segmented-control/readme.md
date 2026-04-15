# ath-segmented-control



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description                                                      | Type                           | Default                             |
| ------------------- | --------------------- | ---------------------------------------------------------------- | ------------------------------ | ----------------------------------- |
| `ariaLabel`         | `aria-label`          | Text to show when the label of segmented control its not visible | `string`                       | `undefined`                         |
| `color`             | `color`               | Color of the segmented control                                   | `"primary" \| "secondary"`     | `SegmentedControlColors.Primary`    |
| `disabled`          | `disabled`            | The segmented control is disabled                                | `boolean`                      | `false`                             |
| `feedback`          | `feedback`            | Type of feedback to show                                         | `"error" \| "none"`            | `SegmentedControlFeedbackType.None` |
| `feedbackText`      | `feedback-text`       | Feedback text                                                    | `string`                       | `undefined`                         |
| `helperText`        | `helper-text`         | Helper text for the segmented control                            | `string`                       | `undefined`                         |
| `hideRequired`      | `hide-required`       | Show if is required in the label                                 | `boolean`                      | `false`                             |
| `label`             | `label`               | Label text for the segmented control                             | `string`                       | `undefined`                         |
| `name`              | `name`                | The name of the segmented control to use with forms              | `string`                       | `undefined`                         |
| `required`          | `required`            | Show if is required                                              | `boolean`                      | `false`                             |
| `requiredAriaLabel` | `required-aria-label` | Show if is required in the label                                 | `any`                          | `undefined`                         |
| `size`              | `size`                | Size of the segmented control                                    | `"lg" \| "md" \| "sm" \| "xl"` | `SegmentedControlSizes.Medium`      |
| `tooltipText`       | `tooltip-text`        | Show the tooltip text                                            | `string`                       | `undefined`                         |
| `tooltipWidth`      | `tooltip-width`       | Show the width of the tooltip                                    | `number`                       | `0`                                 |
| `type`              | `type`                | Types of the segmented control                                   | `"action" \| "select"`         | `SegmentedControlTypes.Select`      |
| `value`             | `value`               | Set the value to select the checked ath-radio-button             | `string`                       | `undefined`                         |


## Events

| Event            | Description | Type                                              |
| ---------------- | ----------- | ------------------------------------------------- |
| `athChangeValue` |             | `CustomEvent<HTMLAthSegmentedControlItemElement>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
