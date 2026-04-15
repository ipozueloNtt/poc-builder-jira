---
title: ath-radio-button
component: ath-radio-button
status: stable
source:
  figma:
    documentation: https://www.figma.com/design/ts8uR3OicudYSr8L7E0lrd/-v.2.0.0--Aletheia-Web-components?node-id=40012244-146346&m=dev
    componentSet: https://www.figma.com/design/ts8uR3OicudYSr8L7E0lrd/-v.2.0.0--Aletheia-Web-components?node-id=40006151-113538&m=dev
  storybook:
    title: Componentes/Radio Button/Radio Button
    stories:
      - Playground
      - Checked
      - Disabled
      - Read Only
  code:
    path: packages/stencil-library/src/components/radio-button/radio-button.tsx
lastUpdated: 2026-03-02
---

# ath-radio-button

Control de seleccion excluyente para formularios.

## API publica

### Props
- ariaLabel: string
- checked: boolean (default false)
- disabled: boolean (default false)
- label: string
- name: string
- readonly: boolean (default false)
- value: string

### Eventos
- athBlur
- athChange
- athFocus

### Metodos
- setFocus() => Promise<void>
- setTabindex(tabIndex: any) => Promise<void>
- unCheck() => Promise<void>

## Variantes de diseno
- state: default, checked, focus, disabled, readonly
- checked: false, true
- disabled: false, true
- readonly: false, true

## Accesibilidad
- Usa role radio y estados aria-checked / aria-disabled.
- Debe tener label visible o aria-label.
- Soporta activacion por teclado con Enter y Space.

## Dependencias
- Depende de: ninguna.
- Consumido por: ath-table-row.

