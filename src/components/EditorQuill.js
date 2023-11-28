// CustomQuill.js
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
        [{ 'list': 'bullet' }],
        ['bold', 'link'],
    ]
};

const EditorQuill = ({ onChange, value, id, ref }) => {
    return (
        <ReactQuill 
            value={value}
            id={id} 
            modules={modules} 
            onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
            ref={ref}
        />
    );
}

export default EditorQuill;
