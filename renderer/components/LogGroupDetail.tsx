import React from 'react';

import { LogStream } from '@aws-sdk/client-cloudwatch-logs';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import LogStreamList from './LogStreamList';

type ListDetailProps = {
  item: {
    logGroupName: string,
    arn: string,
    logStreams?: LogStream[],
  },
  onSaved?: () => void,
  onError?: (error: unknown) => void,
};

const LogGroupDetail = ({ item, onSaved, onError }: ListDetailProps) => (
  <Box>
    <Typography variant='h5'>Detail for {item.logGroupName}</Typography>
    <Box>
      <Typography variant='h6'>Streams</Typography>
      <LogStreamList group={item.logGroupName} items={item.logStreams ? item.logStreams : []} onSaved={onSaved} onError={onError} />
    </Box>
  </Box>
);

export default LogGroupDetail;
