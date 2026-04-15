export const combinedItems = `
      <div class="story__item">
        <ath-menu-lateral aria-label="Menu lateral">
        <ath-menu-lateral-item-link icon="home_estrecha" tooltip-text="Tipo: link, Target: blank, Estado: default" href="https://www.ibercaja.es" target="blank"></ath-menu-lateral-item-link>
        <ath-menu-lateral-item-link icon="download" tooltip-text="Tipo: link, Target: blank, Estado: selected" href="https://www.ibercaja.es" target="blank" selected></ath-menu-lateral-item-link>
        <ath-menu-lateral-item-link icon="finances" tooltip-text="Tipo: link, Target: blank, Estado: disabled" href="https://www.ibercaja.es" target="blank" disabled></ath-menu-lateral-item-link>
        <ath-menu-lateral-item-link icon="exit" tooltip-text="Tipo: link, Target: blank, Estado: default, Con badge-value" href="https://www.ibercaja.es" target="blank" badge-value="3" badge-label="3 avisos"></ath-menu-lateral-item-link>
        <ath-menu-lateral-item-link icon="folder" tooltip-text="Tipo: link, Target: blank, Estado: disabled, Con badge-value" href="https://www.ibercaja.es" target="blank" badge-value="3"  badge-label="3 avisos" disabled></ath-menu-lateral-item-link>      
        <ath-menu-lateral-item-action icon="finances" tooltip-text="Tipo: action, Estado: disabled" disabled></ath-menu-lateral-item-action>
        <ath-menu-lateral-item-action icon="exit" tooltip-text="Tipo: action, Estado: default, Con badge-value" badge-value="3" badge-label="3 avisos"></ath-menu-lateral-item-action>
        <ath-menu-lateral-item-action icon="folder" tooltip-text="Tipo: action, Estado: disabled, Con badge-value" badge-value="3" badge-label="3 avisos" disabled></ath-menu-lateral-item-action>
        </ath-menu-lateral>
      </div>
    `;

export const imperativeItems = [
  { icon: 'home_estrecha', tooltipText: 'Tipo: link, Target: blank, Estado: default', href: 'https://www.ibercaja.es', target: 'blank' },
  {
    icon: 'download',
    tooltipText: 'Tipo: link, Target: blank, Estado: selected',
    href: 'https://www.ibercaja.es',
    target: 'blank',
    selected: true,
  },
  {
    icon: 'finances',
    tooltipText: 'Tipo: link, Target: blank, Estado: disabled',
    href: 'https://www.ibercaja.es',
    target: 'blank',
    disabled: true,
  },
  {
    icon: 'exit',
    tooltipText: 'Tipo: link, Target: blank, Estado: default, Con badge-value',
    href: 'https://www.ibercaja.es',
    target: 'blank',
    badgeLabel: '3 avisos',
    badgeValue: '3',
  },
  {
    icon: 'folder',
    tooltipText: 'Tipo: link, Target: blank, Estado: disabled, Con badgeValue',
    href: 'https://www.ibercaja.es',
    target: 'blank',
    badgeLabel: '3 avisos',
    badgeValue: '3',
    disabled: true,
  },
  {
    icon: 'finances',
    tooltipText: 'Tipo: action, Estado: disabled',
    disabled: true,
  },
  {
    icon: 'exit',
    tooltipText: 'Tipo: action, Estado: default, Con badgeValue',
    badgeLabel: '3 avisos',
    badgeValue: '3',
  },
  {
    icon: 'folder',
    tooltipText: 'Tipo: action, Estado: disabled, Con badgeValue',
    badgeLabel: '3 avisos',
    badgeValue: '3',
    disabled: true,
  },
];
