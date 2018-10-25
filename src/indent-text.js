import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {IndentTextEditing} from "./indent-text-editing";
import {IndentTextUi} from "./indent-text-ui";

/**
 * Indent plugin
 */
export default class IndentText extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'IndentText';
    }

    /**
     * @inheritDoc
     */
    static get requires() {
        return [IndentTextEditing, IndentTextUi];
    }
}