import { MoreOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Empty, Spin } from 'antd'
import type { DataNode } from 'antd/lib/tree'
import DirectoryTree from 'antd/lib/tree/DirectoryTree'
import copy from 'copy-to-clipboard'
import { useMessage } from 'hooks'
import { t } from 'i18next'
import { findLast } from 'lodash-es'
import type React from 'react'
import { useEffect, useState } from 'react'
import type { ObjectStatsList } from 'utils/service'
import Horse, { PathTypeEnum } from 'utils/service'

interface IProps {
  domainUrl: string
  problemId: string
  initObjList: ObjectStatsList | undefined
  initiating: boolean
}

const mapObjectStatsToTreeData = (
  objectStatsList: ObjectStatsList,
  prefix: string
): DataNode[] => {
  const { pagination, results } = objectStatsList
  const fileList: DataNode[] = results.map(o => ({
    key: o.path,
    title: findLast(o.path.split('/'), s => s.length > 0),
    isLeaf: o.path_type !== PathTypeEnum.CommonPrefix
  }))
  if (pagination.has_more) {
    fileList.push({
      title: t('CommittedFileTree.loadMore'),
      key: `${prefix}_more`,
      isLeaf: true,
      icon: <MoreOutlined />
    })
  }
  return fileList
}

const onSelect = (keys: React.Key[]) => {
  if (keys[0]) copy(keys[0].toString())
}

const Index: React.FC<IProps> = ({
  domainUrl,
  problemId,
  initObjList,
  initiating
}) => {
  const msg = useMessage()
  const [treeData, setTreeData] = useState<DataNode[]>([])

  useEffect(() => {
    if (initObjList) setTreeData(mapObjectStatsToTreeData(initObjList, ''))
  }, [initObjList])

  const { runAsync: fetchFiles } = useRequest(
    async (prefix: string) => {
      const res =
        await Horse.problemConfig.v1ListLatestProblemConfigObjectsUnderAGivenPrefix(
          domainUrl,
          problemId,
          {
            delimiter: '/',
            amount: 100,
            prefix
          }
        )
      return res.data.data
    },
    {
      manual: true,
      onError: () => {
        msg.error.fetch(t('CommittedFileTree.fileList'))
      }
    }
  )

  const updateTreeData = (
    list: DataNode[],
    key: React.Key,
    children: DataNode[]
  ): DataNode[] =>
    list.map(node => {
      if (node.key === key) {
        return {
          ...node,
          children
        }
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children)
        }
      }
      return node
    })

  const onLoadData = async ({
    key,
    children
  }: {
    key: number | string
    children?: DataNode[]
  }) => {
    if (children) return

    const resp = await fetchFiles(key.toString())
    if (resp) {
      setTreeData(origin =>
        updateTreeData(
          origin,
          key,
          mapObjectStatsToTreeData(resp, key.toString())
        )
      )
    }
  }

  return (
    <Spin spinning={initiating}>
      {treeData.length === 0 ? (
        <Empty />
      ) : (
        <DirectoryTree
          onSelect={onSelect}
          loadData={onLoadData}
          treeData={treeData}
          height={512}
        />
      )}
    </Spin>
  )
}

export default Index
