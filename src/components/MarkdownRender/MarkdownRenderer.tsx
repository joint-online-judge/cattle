import { Typography } from 'antd'
import type React from 'react'
import type { Options } from 'react-markdown'
import ReactMarkdown from 'react-markdown'
import type {
  CodeComponent,
  ReactMarkdownProps
} from 'react-markdown/lib/ast-to-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import remarkGfm from 'remark-gfm'

const Index: React.FC<Options> = props => {
  const pre: React.FC<ReactMarkdownProps> = ({ children }) => (
    <pre style={{ padding: 0 }}>{children}</pre>
  )

  const table: React.FC<ReactMarkdownProps> = ({ children }) => (
    <table className='border-collapse border border-solid border-gray-300'>
      {children}
    </table>
  )

  const td: React.FC<ReactMarkdownProps> = ({ children }) => (
    <td className='border border-solid border-gray-300 p-1.5'>{children}</td>
  )

  const th: React.FC<ReactMarkdownProps> = ({ children }) => (
    <th className='border border-solid border-gray-300 p-1.5'>{children}</th>
  )

  const code: CodeComponent = ({
    inline,
    className,
    children,
    ...otherProps
  }) => {
    const match = /language-(\w+)/.exec(className ?? '')
    return !inline && match ? (
      // @ts-expect-error package type not updated
      <SyntaxHighlighter
        language={match[1]}
        PreTag='div'
        customStyle={{
          margin: 0
        }}
        {...otherProps}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <kbd className={className} {...otherProps}>
        {children}
      </kbd>
    )
  }

  return (
    <Typography>
      <ReactMarkdown
        components={{
          pre,
          table,
          td,
          th,
          code
        }}
        remarkPlugins={[remarkGfm]}
        {...props}
      />
    </Typography>
  )
}

export default Index
