import { CopyOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import type React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useTranslation } from 'react-i18next'
import style from './style.module.less'

const Index: React.FC = ({ children }) => {
  const { t } = useTranslation()

  return (
    <pre className={style.copyPre} style={{ padding: '0.6em 0.8em' }}>
      <CopyToClipboard
        text={children?.toString() ?? ''}
        onCopy={(_text, success): void => {
          if (success) {
            message.success(t('CopyablePre.copySuccess'))
          } else {
            message.error(t('CopyablePre.copyFailed'))
          }
        }}
      >
        <Button className={style.hoverButton} icon={<CopyOutlined />} />
      </CopyToClipboard>
      {children}
    </pre>
  )
}

export default Index
