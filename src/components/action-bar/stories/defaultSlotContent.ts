export const slotContent = `
            <ath-button-link icon="transfers">Transferencias</ath-button-link>
            <ath-button-link icon="internal_transfer">Traspasos</ath-button-link>
            <ath-button-link icon="loan">Domiciliaciones</ath-button-link>
            <ath-button color="primary" size="sm" icon="download" icon-position="icon-only" clear>Continuar</ath-button>
`;

export const slotContentWithDividers = `
            <ath-button-link icon="transfers">Transferencias</ath-button-link>
            <ath-divider></ath-divider>
            <ath-button-link icon="internal_transfer">Traspasos</ath-button-link>
            <ath-divider></ath-divider>
            <ath-button-link icon="loan">Domiciliaciones</ath-button-link>
            <ath-divider></ath-divider>
            <ath-icon icon="gear" clear></ath-icon>`;

export const slotContentButtons = `
            <ath-button color="primary">Button</ath-button>
            <ath-button-link color="primary">Button Link</ath-button-link>
            <ath-button-expandable size="lg" collapse-target="collapse-playground">Button expandable</ath-button-expandable>
         </ath-action-bar>
         <ath-collapse id="collapse-playground" style="padding: 20px 0">
             <p>Este el contenido del componente Collapse</p>
         </ath-collapse>
`;
export const slotContentNoButtons = `
            <ath-link>Link</ath-link>
            <ath-menu-button ath-aria-label="Label">
              <ath-menu-button-item text="Opción 1"></ath-menu-button-item>
              <ath-menu-button-item text="Opción 2"></ath-menu-button-item>
              <ath-menu-button-item text="Opción 3"></ath-menu-button-item>
              <ath-menu-button-item text="Opción 4"></ath-menu-button-item>
              <ath-menu-button-item text="Opción 5"></ath-menu-button-item>
            </ath-menu-button>
            <ath-badge color="accent" label="Mensajes pendientes" type="numeric" value="5">
              <ath-button>Badge</ath-button>
            </ath-badge>
            <ath-tooltip heading-text="This is a tooltip" position="bottom" has-arrow="true" color="primary" trigger="hover">
              <ath-button>Tooltip</ath-button>
            </ath-tooltip>
            <ath-segmented-control color="primary" feedback="none" type="select">
              <ath-segmented-control-item>Opción 1</ath-segmented-control-item>
              <ath-segmented-control-item>Opción 2</ath-segmented-control-item>
              <ath-segmented-control-item>Opción 3</ath-segmented-control-item>
            </ath-segmented-control>
`;
