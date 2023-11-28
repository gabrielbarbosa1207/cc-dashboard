// src/components/QuillEditor.js
import React from 'react';
import ReactQuill from 'react-quill';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

// You don't need to register anything for tables because Quill has a built-in table module.

const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image', 'video'],
      [{'table': 'insert'}, {'table': 'delete'}]
    ]
  };
  

const QuillEditor = ({ value, onChange, defaultValue }) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      defaultValue={defaultValue}
    />
  );
};

export default QuillEditor;
