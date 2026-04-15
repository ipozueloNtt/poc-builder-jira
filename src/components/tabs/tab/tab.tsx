import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'ath-tab',
  scoped: true,
})
export class AthTab {
  /**
   * Etiqueta accesible de la tab
   */
  @Prop() label: string;

  /**
   * Si la tab está deshabilitada o no
   */
  @Prop() disabled: boolean;

  /**
   * Código del icono en caso de que la tab deba llevar icono
   */
  @Prop() icon: string;

  /**
   * Etiqueta accesible del icono
   */
  @Prop() iconAriaLabel: string;

  /**
   * Ruta de navegación de la tab
   */
  @Prop() navigationData: string;

  /**
   * Si la tab está seleccionada por defecto
   */
  @Prop() selected: boolean;

  render() {
    return null;
  }
}
