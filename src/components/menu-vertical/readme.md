# ath-menu-vertical



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description            | Type                       | Default                           |
| ------------ | ------------ | ---------------------- | -------------------------- | --------------------------------- |
| `appearance` | `appearance` | Appearance of the menu | `"primary" \| "secondary"` | `MenuVerticalAppearances.Primary` |


## Events

| Event         | Description                                   | Type                                                                                                                                                                                                                                            |
| ------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `athSelected` | Emitted when link or action Button is clicked | `CustomEvent<MenuItemBase & { tagName: "ath-MENU-VERTICAL-ITEM-ACTION"; } \| MenuItemBase & { tagName: "ath-MENU-VERTICAL-ITEM-LINK"; href?: string; target?: "self" \| "parent" \| "blank" \| "top"; rel?: string; externalLabel?: string; }>` |


## Dependencies

### Depends on

- [ath-section-title](../section-title)
- [ath-icon](../icon)

### Graph
```mermaid
graph TD;
  ath-menu-vertical --> ath-section-title
  ath-menu-vertical --> ath-icon
  ath-section-title --> ath-icon
  ath-section-title --> ath-tooltip
  ath-section-title --> ath-tooltip-trigger
  ath-tooltip-trigger --> ath-icon
  style ath-menu-vertical fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
