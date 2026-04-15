---
title: ath-input-text
component: ath-input-text
status: stable
source:
  figma:
    documentation: https://www.figma.com/design/ts8uR3OicudYSr8L7E0lrd/-v.2.0.0--Aletheia-Web-components?node-id=40012244-146346&m=dev
    componentSet: https://www.figma.com/design/ts8uR3OicudYSr8L7E0lrd/-v.2.0.0--Aletheia-Web-components?node-id=5194-264&m=dev
  storybook:
    title: Componentes/Input Text
    stories:
      - Playground
      - Autofocus
      - Con Clear Button
      - Con Counter
      - Disabled
      - Con Feedback
      - No Enfocable
      - Con Helper Text
      - Con Icon
      - Con Label
      - Placeholder
      - Read Only
      - Required
      - Search Type
      - Size
      - Con Tooltip
  code:
    path: packages/stencil-library/src/components/input-text/input-text.tsx
lastUpdated: 2026-03-02
---

# ath-input-text

Campo de entrada de texto para formularios con soporte de estados de validacion, ayudas y variantes de tipo.

## API publica

### Props
- autocomplete: string
- autofocus: boolean
- clearButtonAriaLabel: string (default 'Borrar')
- counter: boolean
- counterLabel: string (default '[length] de [max] caracteres. Quedan [rest]')
- disabled: boolean (default false)
- feedback: "error" | "none" (default InputFeedbackTypes.None)
- feedbackText: string
- hasClear: boolean (default false)
- helperText: string
- hideRequired: boolean (default false)
- icon: string
- iconPosition: "left" | "right" (default InputIconPositions.Left)
- inputAriaLabel: string
- inputTabindex: string (default '0')
- label: string
- maxlength: number
- name: string
- pattern: string
- placeholder: string
- readonly: boolean (default false)
- required: boolean (default false)
- size: "lg" | "md" | "sm" (default InputSizes.Medium)
- submitOnEnter: boolean (default false)
- tooltipText: string
- tooltipWidth: any
- type: "email" | "search" | "tel" | "text" | "url" (default InputTextTypes.Text)
- value: string

### Eventos
- athBlur
- athChange
- athClear
- athFocus
- athInput

### Metodos
- setFocus() => Promise<void>

## Variantes de diseno
- type: text, search, url, email, tel
- size: sm, md, lg
- feedback: none, error
- state: default, focus, disabled, readonly, error
- counter: off, on
- hasClear: off, on

## Accesibilidad
- Requiere etiqueta visible o aria-label (input-aria-label) cuando no existe label.
- El boton de borrado debe exponer clear-button-aria-label cuando hasClear=true.
- Para busqueda (type=search) se usa role searchbox en el input.
- Mantener feedback textual para errores; no depender solo del color.

## Dependencias
- Depende de: ninguna.

