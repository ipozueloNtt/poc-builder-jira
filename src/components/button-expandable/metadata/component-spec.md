---
title: ath-button-expandable
component: ath-button-expandable
status: stable
source:
  figma:
    documentation: https://www.figma.com/design/ts8uR3OicudYSr8L7E0lrd/-v.2.0.0--Aletheia-Web-components?node-id=40012118-8029&m=dev
    componentSet: https://www.figma.com/design/ts8uR3OicudYSr8L7E0lrd/-v.2.0.0--Aletheia-Web-components?node-id=40002005-38156&m=dev
  storybook:
    title: Componentes/Button Expandable
    stories:
      - Playground
      - Icon
      - Disabled
      - Size
  code:
    path: packages/stencil-library/src/components/button-expandable/button-expandable.tsx
lastUpdated: 2026-02-27
---

# ath-button-expandable

Boton que permite expandir o contraer contenido relacionado. Se usa tipicamente junto a `ath-collapse` y expone evento para sincronizar estado.

## API publica

### Props
- `collapseTarget`: `string`
- `icon`: `string`
- `disabled`: `boolean` (default `false`)
- `size`: `sm | md | lg` (default `lg`)

### Eventos
- `athToggleCollapse`: emite el id (`string`) del destino colapsable al alternar estado.

### Metodos
- `setFocus(): Promise<void>`

### Slots
- `default`: texto del boton expandible.

## Variantes de diseno (Figma)
- `size`: `sm`, `md`, `lg`
- `state`: `enabled`, `disabled`
- `content`: con o sin icono inicial

## Accesibilidad
- Expone comportamiento keyboard de boton (`Enter` y `Space`).
- Gestiona `aria-controls`, `aria-expanded` y `aria-disabled` cuando aplica.
- Requiere etiqueta textual visible y comprensible en el slot para lectores de pantalla.

## Buenas practicas de uso
- Asociar siempre `collapse-target` a un `id` real de `ath-collapse`.
- Mantener textos breves orientados a la accion.
- Usar `disabled` cuando la accion no este disponible y evitar handlers manuales alternos.

## Dependencias
- Depende de `ath-icon`.