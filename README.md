## CKEditor 5 text indent feature ##

This package implements text indent feature support for CKEditor 5.

#### Installation ####

```bash
npm install --save ckeditor5-indent-text
```

#### Usage and available options #### 

```js
//...
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import IndentTextPlugin from 'ckeditor5-indent-text/src/indent-text';

export default class ClassicEditor extends ClassicEditorBase {
}

ClassicEditor.builtinPlugins = [
    //...
    IndentTextPlugin,
    //...
];

ClassicEditor.defaultConfig = {
    //...
    toolbar: {
        items: [
            //...
            'indentLeft',
            'indentRight',
            //...
        ]
    },
    //...
    indentText: {
        options: {
            indentLength: 40,
            indentMeasure: 'px',
        },
    },
    //...
};
```