# ath-menu-lateral



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                        | Type                          | Default     |
| -------- | --------- | ---------------------------------- | ----------------------------- | ----------- |
| `items`  | `items`   | (JSON) Object of items to generate | `MenuLateralItem[] \| string` | `undefined` |


## Events

| Event         | Description | Type                                                                                               |
| ------------- | ----------- | -------------------------------------------------------------------------------------------------- |
| `athSelected` | Events      | `CustomEvent<{ item: HTMLAthMenuLateralItemActionElement \| HTMLAthMenuLateralItemLinkElement; }>` |


## Dependencies

### Depends on

- [ath-icon](../icon)
- [ath-badge](../badge)

### Graph
```mermaid
graph TD;
  ath-menu-lateral --> ath-icon
  ath-menu-lateral --> ath-badge
  style ath-menu-lateral fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
