import React from 'react';
import { LogStream } from '@aws-sdk/client-cloudwatch-logs';
import { Box } from '@mui/material';
import LogStreamListItem from './LogStreamListItem';

type Props = {
  group: string,
  items: LogStream[],
  onSaved?: () => void,
  onError?: (error: unknown) => void,
};

const LogStreamList = ({ group, items, onSaved, onError }: Props) => (
  <Box sx={{ width: '100vw', textAlign: 'center' }} key={group}>
    {
      items.map(
        stream => (<LogStreamListItem key={group} group={group} data={stream} onSaved={onSaved} onError={onError} />))
    }
  </Box>
);

export default LogStreamList;
