import { h } from './index-Bf9CG7gQ.js';

const getHelpDescriptionClassNames = (position = 'right', hasArrow = false) => ({
    '_ath-help-description': true,
    [`_ath-help-description--${position}`]: !!position,
    '_ath-help-description--has-arrow': hasArrow,
});
const FcHelpDescription = props => {
    return [
        h("div", { class: getHelpDescriptionClassNames(props.position, props.hasArrow), id: props.id }, h("div", { class: "content" }, h("div", { class: "text" }, props.text))),
    ];
};

export { FcHelpDescription as F };
//# sourceMappingURL=index-D0VVo5qG.js.map

//# sourceMappingURL=index-D0VVo5qG.js.map