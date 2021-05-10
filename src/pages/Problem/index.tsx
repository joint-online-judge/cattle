import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Typography,
} from 'antd';
import { useParams } from 'umi';
import { useRequest } from 'ahooks';
import { ProblemService, UserService } from '@/client';
import { SettingsMenuItem } from '@/components/Settings/typings';
import SideBar from './SideBar';
import Home from './Home';

const Index: React.FC = () => {
  const { problemId } = useParams<{ problemId: string }>();

  const { data: ownerUserResp, run: getOwner } = useRequest(
    (uid: string) => UserService.getUserApiV1UsersUidGet(uid), {
      manual: true,
      onSuccess: (res) => {
        // todo: errCode
        console.info('get owner success');
      },
    });

  const { data: problemResp, run: getProblem } = useRequest(
    (problem: string) => ProblemService.getProblemApiV1ProblemsProblemGet(
      problem), {
      manual: true,
      onSuccess: (res) => {
        // todo: errCode
        console.info('get problem success');
        getOwner(res.data?.owner as string);
      },
      onError: (res) => {
        console.error('get problem fail');
      },
    });

  useEffect(() => {
    getProblem(problemId);
  }, [problemId]);

  const menuItems: SettingsMenuItem[] = [
    {
      key: 'PROBLEM.HOME',
      component: (<Home problem={problemResp?.data} />),
    },
    {
      key: 'PROBLEM.SUBMIT_CODE',
      // TODO: component: (<General />),
    },
    {
      key: 'PROBLEM.SUBMIT_RECORD',
      // TODO: component: (<General />),
    },
    {
      key: 'PROBLEM.SETTINGS',
      // TODO: component: (<General />),
    },
  ];

  const [key, setKey] = useState<string>(menuItems[0].key);

  return (
    <>
      <Row gutter={[{ lg: 24, xl: 32 }, 24]}>
        <Col xs={24} sm={24} lg={18}>
          {key ? menuItems.find((o) => o.key === key)?.component : null}
        </Col>
        <Col xs={24} sm={24} lg={6}>
          <SideBar
            user={ownerUserResp?.data}
            items={menuItems}
            selectedKeys={[key]}
            onChange={({ key: menuKey }) => setKey(menuKey as string)}
          />
        </Col>
      </Row>
    </>
  );
};

export default Index;
