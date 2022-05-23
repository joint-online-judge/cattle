import { message } from 'antd'
import type { MessageType } from 'antd/es/message'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { ErrorCode } from 'utils/service'

interface CommonOperatios {
  fetch: (data?: string) => MessageType
  create: (data?: string) => MessageType
  update: (data?: string) => MessageType
  delete: (data?: string) => MessageType
}

interface CommonMessages {
  success: CommonOperatios
  error: CommonOperatios
  errorCode: (code?: ErrorCode) => MessageType
}

function useMessage(): CommonMessages {
  const { t } = useTranslation()

  const success: CommonOperatios = useMemo(
    () => ({
      fetch: (data?: string): MessageType => {
        if (data) {
          return message.success(t('msg.success.fetchItem', { data }))
        }
        return message.success(t('msg.success.fetch'))
      },
      create: (data?: string): MessageType => {
        if (data) {
          return message.success(t('msg.success.createItem', { data }))
        }
        return message.success(t('msg.success.create'))
      },
      update: (data?: string): MessageType => {
        if (data) {
          return message.success(t('msg.success.updateItem', { data }))
        }
        return message.success(t('msg.success.update'))
      },
      delete: (data?: string): MessageType => {
        if (data) {
          return message.success(t('msg.success.deleteItem', { data }))
        }
        return message.success(t('msg.success.delete'))
      }
    }),
    [t]
  )

  const error: CommonOperatios = useMemo(
    () => ({
      fetch: (data?: string): MessageType => {
        if (data) {
          return message.error(t('msg.error.fetchItem', { data }))
        }
        return message.error(t('msg.error.fetch'))
      },
      create: (data?: string): MessageType => {
        if (data) {
          return message.error(t('msg.error.createItem', { data }))
        }
        return message.error(t('msg.error.create'))
      },
      update: (data?: string): MessageType => {
        if (data) {
          return message.error(t('msg.error.updateItem', { data }))
        }
        return message.error(t('msg.error.update'))
      },
      delete: (data?: string): MessageType => {
        if (data) {
          return message.error(t('msg.error.deleteItem', { data }))
        }
        return message.error(t('msg.error.delete'))
      }
    }),
    [t]
  )

  const errorCode = useCallback(
    (code?: ErrorCode) => {
      if (code) {
        return message.error(
          t(`msg.errorCode.${code}`, {
            defaultValue: 'Oops! Something went wrong...'
          })
        )
      }
      return message.error('Oops! Something went wrong...')
    },
    [t]
  )

  return {
    success,
    error,
    errorCode
  }
}

export default useMessage
