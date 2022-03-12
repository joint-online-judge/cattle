import React, { useMemo } from 'react';
import ReactDOMServer from 'react-dom/server';
import SimpleMDE, { SimpleMDEReactProps } from 'react-simplemde-editor';
import { Options } from 'easymde';
import { merge } from 'lodash';
import MarkdownRender from '@/components/MarkdownRender';
import './style.less';

const Index: React.FC<SimpleMDEReactProps> = ({ options, ...otherProps }) => {
  const presetOptions: Options = useMemo(
    () => ({
      autofocus: false,
      spellChecker: false,
      minHeight: '300px',
      maxHeight: '400px',
      previewRender: (text) =>
        ReactDOMServer.renderToString(<MarkdownRender>{text}</MarkdownRender>),
    }),
    [],
  );

  return <SimpleMDE options={merge(presetOptions, options)} {...otherProps} />;
};

export default Index;
