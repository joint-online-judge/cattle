import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();

export const MarkdownEditor = (
  <MdEditor
    renderHTML={(text) => mdParser.render(text)}
  />
);
