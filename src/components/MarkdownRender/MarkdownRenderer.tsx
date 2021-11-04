import React from 'react';
import { Typography } from 'antd';
import ReactMarkdown, { ReactMarkdownOptions } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const Index: React.FC<ReactMarkdownOptions> = (props) => {
  return (
    <Typography>
      <ReactMarkdown
        components={{
          pre: ({ children }) => <pre style={{ padding: 0 }}>{children}</pre>,
          code: ({ inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className ?? '');
            return !inline && match ? (
              // @ts-expect-error follow demo code
              <SyntaxHighlighter
                language={match[1]}
                PreTag="div"
                customStyle={{
                  margin: 0,
                }}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <kbd className={className} {...props}>
                {children}
              </kbd>
            );
          },
        }}
        remarkPlugins={[remarkGfm]}
        {...props}
      />
    </Typography>
  );
};

export default Index;
