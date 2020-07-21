import AlertDialog from "./alertDialog.js";
import Alert from "./alert.js";
import InputDialog from "./inputDialog.js"
import Popover from "./popover.js"
import ColorPicker from "./colorPicker.js"
import Checkbox from "../src/components/checkbox.js";
import Panel from "../src/components/panel.js";
import Textbox from "../src/components/textbox.js"
import Dialog from "../src/components/dialog.js"
import GenericContainer from "./genericContainer.js"
import { UIUtils } from '../node_modules/igv-utils/src/index.js'
import embedCSS from "./embedCSS.js"

if(!stylesheetExists("igv-ui.css")) {
    console.log('igv-ui. will call embedCSS() ...');
    embedCSS();
    console.log('... done.');
}

function stylesheetExists(stylesheetName) {
    for (let ss of document.styleSheets) {
        ss = ss.href ? ss.href.replace(/^.*[\\\/]/, '') : '';
        if (ss === stylesheetName) {
            return true;
        }
    }
    return false;
}


export {
    AlertDialog,
    Alert,
    InputDialog,
    Popover,
    ColorPicker,
    Checkbox,
    Panel,
    Textbox,
    Dialog,
    UIUtils,
    GenericContainer
}
