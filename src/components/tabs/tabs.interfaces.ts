export interface Tab {
    id: string;
    label: string;
    disabled: boolean;
    icon: string;
    iconAriaLabel: string;
    selected: boolean;
    panelId: string
}
export interface Panel {
    id: string; 
    slot: string; 
    title: string; 
    tabindex: number; 
    'aria-labelledby': string; 
    isActive: boolean
}