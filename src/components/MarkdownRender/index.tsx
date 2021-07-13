import React from 'react';
import ReactMarkdown, { ReactMarkdownOptions } from 'react-markdown';
import { merge } from 'lodash-es';

const Index: React.FC<ReactMarkdownOptions> = (props) => {

  return (
    <ReactMarkdown
      {
        ...merge({
          children: '',
          components: {
            code: 'kbd',
          },
        }, props)
      }
    />
  );
};

export default Index;
