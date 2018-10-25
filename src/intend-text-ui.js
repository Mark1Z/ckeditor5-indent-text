import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import intendLeft from "../theme/icons/left-indent-text-editor-svgrepo-com.svg";
import intendRight from "../theme/icons/right-indent-text-editor-svgrepo-com.svg";
import {INTEND_TEXT_COMMAND, INTEND_TEXT_DEFAULT_VALUE} from "./constants";

/**
 * Intend text ui plugin
 */
export class IntendTextUI extends Plugin {
    /**
     * Init plugin
     */
    init() {
        const editor = this.editor;
        const options = editor.config.get('intendText.options');
        const intendValue = (options && options.intendLength) ? options.intendLength : INTEND_TEXT_DEFAULT_VALUE;

        editor.ui.componentFactory.add('intendLeft', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: 'Intend left',
                icon: intendLeft,
                tooltip: true,
                class: 'intend-left',
            });

            view.on('execute', () => {
                editor.execute(INTEND_TEXT_COMMAND, {value: -intendValue});
                // editor.editing.view.focus();
            });

            return view;
        });

        editor.ui.componentFactory.add('intendRight', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: 'Intend right',
                icon: intendRight,
                tooltip: true,
                class: 'intend-right',
            });

            view.on('execute', () => {
                editor.execute(INTEND_TEXT_COMMAND, {value: intendValue});
                // editor.editing.view.focus();
            });

            return view;
        });
    }
}