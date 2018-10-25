import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {IndentTextCommand} from "./indent-text-command";
import {upcastAttributeToAttribute} from "@ckeditor/ckeditor5-engine/src/conversion/upcast-converters";
import {INDENT_TEXT_ATTRIBUTE, INDENT_TEXT_COMMAND, INDENT_TEXT_DEFAULT_MEASURE} from "./constants";
import {downcastAttributeToAttribute} from "@ckeditor/ckeditor5-engine/src/conversion/downcast-converters";

/**
 * Indent text editing plugin
 */
export class IndentTextEditing extends Plugin {
    /**
     * Initialize
     */
    init() {
        const editor = this.editor;
        const schema = editor.model.schema;
        const options = editor.config.get('indentText.options');
        const indentMeasure = (options && options.indentMeasure) ? options.indentMeasure : INDENT_TEXT_DEFAULT_MEASURE;

        schema.extend('$block', {allowAttributes: INDENT_TEXT_ATTRIBUTE});

        editor.conversion.for('downcast').add(downcastAttributeToAttribute({
            model: INDENT_TEXT_ATTRIBUTE,
            view: modelAttributeValue => ({
                key: 'style',
                value: {
                    'padding-left': `${modelAttributeValue}${indentMeasure}`,
                },
            })
        }));

        editor.conversion.for('upcast').add(upcastAttributeToAttribute({
            view: {
                key: 'style',
                value: /padding-left-[\S]+/
            },
            model: {
                key: INDENT_TEXT_ATTRIBUTE,
                value: viewElement => {
                    return parseInt(viewElement.getStyle('padding-left'));
                },
            },
        }));

        editor.commands.add(INDENT_TEXT_COMMAND, new IndentTextCommand(editor));
    }
}