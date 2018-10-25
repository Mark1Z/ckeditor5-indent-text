import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import indentLeft from "../theme/icons/left-indent-text-editor-svgrepo-com.svg";
import indentRight from "../theme/icons/right-indent-text-editor-svgrepo-com.svg";
import {INDENT_TEXT_COMMAND, INDENT_TEXT_DEFAULT_VALUE} from "./constants";

/**
 * Indent text ui plugin
 */
export class IndentTextUi extends Plugin {
    /**
     * Init plugin
     */
    init() {
        const editor = this.editor;
        const options = editor.config.get('indentText.options');
        const indentValue = (options && options.indentLength) ? options.indentValue : INDENT_TEXT_DEFAULT_VALUE;

        editor.ui.componentFactory.add('indentLeft', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: 'Indent left',
                icon: indentLeft,
                tooltip: true,
                class: 'indent-left',
            });

            view.on('execute', () => {
                editor.execute(INDENT_TEXT_COMMAND, {value: -indentValue});
            });

            return view;
        });

        editor.ui.componentFactory.add('indentRight', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: 'Indent right',
                icon: indentRight,
                tooltip: true,
                class: 'indent-right',
            });

            view.on('execute', () => {
                editor.execute(INDENT_TEXT_COMMAND, {value: indentValue});
            });

            return view;
        });
    }
}