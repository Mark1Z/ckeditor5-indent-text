import Command from '@ckeditor/ckeditor5-core/src/command';
import {INDENT_TEXT_ATTRIBUTE} from "./constants";
import first from '@ckeditor/ckeditor5-utils/src/first';

/**
 * Indent text command
 */
export class IndentTextCommand extends Command {
    /**
     * @inheritDoc
     */
    refresh() {
        const firstBlock = first(this.editor.model.document.selection.getSelectedBlocks());

        this.isEnabled = !!firstBlock;
        this.value = (this.isEnabled && firstBlock.hasAttribute(INDENT_TEXT_ATTRIBUTE)) ? firstBlock.getAttribute(INDENT_TEXT_ATTRIBUTE) : 0;
    }

    /**
     * Executes the command. Applies the `value` of the {@link #attributeKey} to the selection.
     * If no `value` is passed, it removes the attribute from the selection.
     *
     * @protected
     * @param {Object} [options] Options for the executed command.
     * @param {String} [options.value] The value to apply.
     * @fires execute
     */
    execute(options = {}) {
        const model = this.editor.model;
        const document = model.document;
        const value = options.value;

        model.change(writer => {
            const blocks = document.selection.getSelectedBlocks();

            for (const block of blocks) {
                const newValue = (block.getAttribute(INDENT_TEXT_ATTRIBUTE) || 0) + value;

                if (newValue > 0) {
                    writer.setAttribute(INDENT_TEXT_ATTRIBUTE, newValue, block);
                } else {
                    writer.removeAttribute(INDENT_TEXT_ATTRIBUTE, block);
                }
            }
        });
    }
}