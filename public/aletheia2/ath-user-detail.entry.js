import { r as registerInstance, e as createEvent, h, d as Host } from './index-Bf9CG7gQ.js';

const UserDetailTypes = {
    Default: 'default',
    Initials: 'initials',
    Image: 'image',
    HideAvatar: 'hide-avatar',
};

const userDetailCss = ":host .ath-user-detail{display:inline-flex;align-items:center;gap:var(--ath-spacing-user-detail-col-gap);font-family:var(--ath-font-family-body);font-style:normal;line-height:var(--ath-font-line-height-body)}:host .ath-user-detail__label{color:var(--ath-color-fg-default);font-size:var(--ath-font-size-body-md);font-weight:var(--ath-font-weight-medium)}:host .ath-user-detail__content{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-user-detail-content-row-gap)}:host .ath-user-detail__content__description{color:var(--ath-color-fg-subtle);font-size:var(--ath-font-size-body-sm);font-weight:var(--ath-font-weight-body-regular)}";

let userDetailSequence = 0;
const AthUserDetail = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athAction = createEvent(this, "athAction", 7);
    }
    userDetailId = `user-detail-${++userDetailSequence}`;
    descriptionId = `${this.userDetailId}-description`;
    /**
     * If true, the user can click the button-link.
     */
    clickable = false;
    /**
     * Avatar SRC image.
     */
    srcImage;
    /**
     * User Name.
     */
    userName;
    /**
     * Type of avatar.
     */
    type = undefined;
    /**
     * User initials.
     */
    initials;
    /**
     * User Description.
     */
    description;
    /**
     * The aria-label attribute of the button-link.
     */
    buttonAriaLabel;
    /**
     * Emmitted when button-link is clicked.
     */
    athAction;
    imgTag = () => {
        if (!!this.srcImage) {
            const src = this.srcImage;
            return h("img", { slot: "img", src: src, alt: this.userName });
        }
        else {
            return;
        }
    };
    handleClick(ev) {
        ev.stopPropagation();
        this.athAction.emit();
    }
    renderLabel = () => {
        if (this.clickable) {
            return (h("ath-button-link", { "icon-position": "right", icon: "edit_2", "aria-label": this.buttonAriaLabel }, this.userName));
        }
        else {
            return h("span", { class: "ath-user-detail__label" }, this.userName);
        }
    };
    getAttributes = () => ({
        'avatar-name': !!this.userName ? this.userName : undefined,
        'initials': !!this.initials ? this.initials.substring(0, 2) : undefined,
    });
    render() {
        const avatarAttributes = this.getAttributes();
        return (h(Host, { key: '09cadc667c0c68e54973db74fefc13e3296378fc' }, h("div", { key: '2837a69e5b5b6fba238200ff04f59b5139021f9a', class: "ath-user-detail" }, this.type !== UserDetailTypes.HideAvatar && (h("ath-avatar", { key: '5f56ad010bb4506e536e46986c51343137cdb7ca', size: "lg", type: this.type, ...avatarAttributes }, this.imgTag())), h("div", { key: 'de1b18d73c36e7c51c9e875b7b40c52dce287ea4', class: "ath-user-detail__content" }, this.renderLabel(), !!this.description && (h("span", { key: '3b07205b552488b1c5ff951f471bf7f273674fc7', id: this.descriptionId, class: "ath-user-detail__content__description" }, this.description)), h("slot", { key: '0cb227324586c3d0d812ed133a844ff46cb3c2f7' })))));
    }
};
AthUserDetail.style = userDetailCss;

export { AthUserDetail as ath_user_detail };
//# sourceMappingURL=ath-user-detail.entry.esm.js.map
