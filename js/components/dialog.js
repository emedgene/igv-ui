import * as UIUtils from "../../node_modules/igv-utils/src/ui-utils.js"
import * as DOMUtils from "../../node_modules/igv-utils/src/dom-utils.js"
import makeDraggable from "../../node_modules/igv-utils/src/draggable.js"

class Dialog {

    constructor({label, content, okHandler, cancelHandler}) {

        const cancel = () => {
            DOMUtils.hide(this.elem);
            if (typeof cancelHandler === 'function') {
                cancelHandler(this);
            }
        }

        // dialog container
        this.elem = DOMUtils.div({class: 'igv-ui-generic-dialog-container'});

        // dialog header
        const header = DOMUtils.div({class: 'igv-ui-generic-dialog-header'});
        this.elem.appendChild(header);

        UIUtils.attachDialogCloseHandlerWithParent(header, cancel);

        // dialog label
        if(label) {
            const labelDiv = DOMUtils.div({class: 'igv-ui-dialog-one-liner'});
            this.elem.appendChild(labelDiv);
            labelDiv.innerHTML = label;
        }

        // input container
        content.elem.style.margin = '8px';
        this.elem.appendChild(content.elem);

        // ok | cancel
        const buttons = DOMUtils.div({class: 'igv-ui-generic-dialog-ok-cancel'});
        this.elem.appendChild(buttons);

        // ok
        this.ok = DOMUtils.div();
        buttons.appendChild(this.ok);
        this.ok.textContent = 'OK';

        // cancel
        this.cancel = DOMUtils.div();
        buttons.appendChild(this.cancel);
        this.cancel.textContent = 'Cancel';

        this.ok.addEventListener('click',  (e) => {
            DOMUtils.hide(this.elem);
            if (typeof okHandler === 'function') {
                okHandler(this);
            }
        });

        this.cancel.addEventListener('click', cancel);

        makeDraggable(this.elem, header);


        // Consume all clicks in component
        this.elem.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
        })

    }

    present(options, e) {

        this.label.textContent = options.label;
        this.input.value = options.value;
        this.callback = options.callback;

        const page = DOMUtils.pageCoordinates(e);
        this.clampLocation(page.x, page.y);

        DOMUtils.show(this.elem);
    }

    clampLocation(pageX, pageY) {

        let popoverRect = this.elem.getBoundingClientRect();
        let parentRect = this.parent.getBoundingClientRect();
        const y = Math.min(Math.max(pageY, parentRect.y), parentRect.y + parentRect.height - popoverRect.height);
        const x = Math.min(Math.max(pageX, parentRect.x), parentRect.x + parentRect.width - popoverRect.width);
        this.elem.style.left = x + "px";
        this.elem.style.top = y + "px";
    }
}

export default Dialog
