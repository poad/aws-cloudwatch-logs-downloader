import React from 'react';
import Layout from '../components/Layout';
import { CloudWatchLogsClient, LogGroup } from '@aws-sdk/client-cloudwatch-logs';
import { listLogGroups } from '../utils/aws-logs-api';
import LogGroupList from '../components/LogGroupList';
import { Typography } from '@mui/material';

type Props = {
  items: LogGroup[]
  pathname: string
};

const IndexPage = ({ items }: Props) => {
  return (
    <Layout title="Home | AWS CloudWatch Logs Downloder">
      <Typography variant='h6'>Log Groups</Typography>
      <LogGroupList items={items} />
    </Layout>
  );
};

export async function getStaticProps() {
  const client = new CloudWatchLogsClient({});

  const items: LogGroup[] = await listLogGroups(client);

  return {
    props: {
      items: items.map(item => ({
        logGroupName: item.logGroupName,
        arn: item.arn,
      })),
    },
  };
}

export default IndexPage;
