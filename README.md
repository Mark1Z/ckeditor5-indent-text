## CKEditor 5 text intend feature ##

This package implements text alignment support for CKEditor 5.

#### Installation ####

```bash
npm install --save ckeditor5-indent-text
```

#### Usage and available options #### 

```js
//...
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import IntendTextPlugin from 'ckeditor5-intend-text/src/intend-text';

export default class ClassicEditor extends ClassicEditorBase {
}

ClassicEditor.builtinPlugins = [
    //...
    IntendTextPlugin,
    //...
];

ClassicEditor.defaultConfig = {
    //...
    toolbar: {
        items: [
            //...
            'intendLeft',
            'intendRight',
            //...
        ]
    },
    //...
    intendText: {
        options: {
            intendLength: 40,
            intendMeasure: 'px',
        },
    },
    //...
};
```