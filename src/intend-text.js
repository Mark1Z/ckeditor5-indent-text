import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {IntendTextEditing} from "./intend-text-editing";
import {IntendTextUI} from "./intend-text-ui";

/**
 * Intend plugin
 */
export default class IntendText extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'IntendText';
    }

    /**
     * @inheritDoc
     */
    static get requires() {
        return [IntendTextEditing, IntendTextUI];
    }
}