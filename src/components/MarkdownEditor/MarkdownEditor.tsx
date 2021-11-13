import React, { useMemo } from 'react';
import ReactDOMServer from 'react-dom/server';
import SimpleMDE, { SimpleMDEReactProps } from 'react-simplemde-editor';
import { Options } from 'easymde';
import { merge } from 'lodash';
import MarkdownRender from '@/components/MarkdownRender';
import 'easymde/dist/easymde.min.css';

const Index: React.FC<SimpleMDEReactProps> = ({ options, ...otherProps }) => {
  const presetOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      minHeight: '300px',
      maxHeight: '400px',
      previewRender: (text) => {
        return ReactDOMServer.renderToString(
          <MarkdownRender>{text}</MarkdownRender>,
        );
      },
    } as Options;
  }, []);

  return <SimpleMDE options={merge(presetOptions, options)} {...otherProps} />;
};

export default Index;
