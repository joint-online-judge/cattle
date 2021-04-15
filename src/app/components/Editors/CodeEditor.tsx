import React from 'react';
import MonacoEditor from 'react-monaco-editor';

export const CodeEditor = () => (
  <MonacoEditor
    width="800"
    height="600"
    language="javascript"
    theme="vs-dark"
  />
);
