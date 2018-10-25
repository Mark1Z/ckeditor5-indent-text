import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {IntendTextCommand} from "./intend-text-command";
import {upcastAttributeToAttribute} from "@ckeditor/ckeditor5-engine/src/conversion/upcast-converters";
import {INTEND_TEXT_ATTRIBUTE, INTEND_TEXT_COMMAND, INTEND_TEXT_DEFAULT_MEASURE} from "./constants";
import {downcastAttributeToAttribute} from "@ckeditor/ckeditor5-engine/src/conversion/downcast-converters";

/**
 * Intend text editing plugin
 */
export class IntendTextEditing extends Plugin {
    /**
     * Initialize
     */
    init() {
        const editor = this.editor;
        const schema = editor.model.schema;
        const options = editor.config.get('intendText.options');
        const intendMeasure = (options && options.intendMeasure) ? options.intendMeasure : INTEND_TEXT_DEFAULT_MEASURE;

        schema.extend('$block', {allowAttributes: INTEND_TEXT_ATTRIBUTE});

        editor.conversion.for('downcast').add(downcastAttributeToAttribute({
            model: INTEND_TEXT_ATTRIBUTE,
            view: modelAttributeValue => ({
                key: 'style',
                value: {
                    'padding-left': `${modelAttributeValue}${intendMeasure}`,
                },
            })
        }));

        editor.conversion.for('upcast').add(upcastAttributeToAttribute({
            view: {
                key: 'style',
                value: /padding-left-[\S]+/
            },
            model: {
                key: INTEND_TEXT_ATTRIBUTE,
                value: viewElement => {
                    return parseInt(viewElement.getStyle('padding-left'));
                },
            },
        }));

        editor.commands.add(INTEND_TEXT_COMMAND, new IntendTextCommand(editor));
    }
}