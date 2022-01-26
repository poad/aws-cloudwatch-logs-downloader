import React, { useState } from 'react';
// import { NextPageContext } from 'next'
import Layout from '../../components/Layout';
import { CloudWatchLogsClient, LogGroup, LogStream } from '@aws-sdk/client-cloudwatch-logs';
import { getLogGroup, listLogGroups } from '../../utils/aws-logs-api';
import LogGroupDetail from '../../components/LogGroupDetail';
import { GetStaticPaths, GetStaticProps } from 'next';
import AlertDialog from '../../components/AlertDialog';

type Params = {
  id?: string
};

type Props = {
  item?: {
    logGroupName: string,
    logStreams?: LogStream[],
    arn: string
  }
  errors?: string
};

const InitialPropsDetail = ({ item, errors }: Props) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [contentText, setContentText] = useState('');
  const onSaved = () => { };

  const onError = (error: unknown) => {
    setTitle('error');
    setContentText((error as Error).message);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setContentText('');
  };

  if (errors) {
    return (
      <Layout title={'Error'}>
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${item ? item.logGroupName : 'Detail'}`}
    >
      <AlertDialog title={title} contentText={contentText} open={open} handleClose={handleClose} />
      {item && <LogGroupDetail onSaved={onSaved} onError={onError} item={item} />}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = new CloudWatchLogsClient({});
  const items: LogGroup[] = await listLogGroups(client);
  const paths = items.map((item) => `/detail/${Buffer.from(JSON.stringify({
    logGroupName: item.logGroupName,
    arn: item.arn,
  })).toString('base64')}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = new CloudWatchLogsClient({});
  const { id } = params as Params;
  const { logGroupName, arn } = JSON.parse(Buffer.from(id, 'base64').toString());

  try {
    const logStreams = await getLogGroup(client, Array.isArray(logGroupName) ? logGroupName[0] : logGroupName);
    return {
      props: {
        item: {
          logGroupName,
          arn,
          logStreams,
        },
      },
    };
  } catch (err) {
    return {
      props: {
        errors: err.message,
      },
    };
  }
};

export default InitialPropsDetail;
