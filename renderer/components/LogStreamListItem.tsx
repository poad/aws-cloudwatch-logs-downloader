import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';

import { LogStream } from '@aws-sdk/client-cloudwatch-logs';
import { Grid } from '@mui/material';

type Props = {
  group: string,
  data: LogStream,
  onSaved?: () => void,
  onError?: (error: unknown) => void,
};

const LogStreamListItem = ({ group, data, onSaved, onError }: Props) => {
  const saveFile = async (path: string, value: string): Promise<{
    status: boolean,
    path?: string,
    error?: unknown
  }> => {
    return global.ipcRenderer.invoke('saveLog',
      path,
      value,
    );
  };

  const downloadLogs = async (groupName: string, stream: string) => {
    const path = await global.ipcRenderer.invoke('saveLogPath', 'Save to');
    if (path !== undefined) {
      const logs = await global.ipcRenderer.invoke('downloadLogs', groupName, stream);
      const result = await saveFile(path, JSON.stringify(logs, null, 2));
      if (result.status) {
        if (onSaved) {
          onSaved();
        }
      } else {
        if (onError) {
          onError(result.error);
        }
      }
    }
  };

  return (
    <div>
      <Grid container spacing={2} key={`${data.logStreamName}-container`}>
        <Grid item xs={10} key={data.logStreamName} sx={{ textAlign: 'left', marginLeft: '2rem' }}>{data.logStreamName}</Grid>
        <Grid item xs={1} key={`${data.logStreamName}-download`} sx={{ textAlign: 'left' }}>
          <DownloadIcon onClick={() => downloadLogs(group, data.logStreamName)} key={`${data.logStreamName}-icon`} sx={{
            color: '#0000ff',
            '&:hover': {
              cursor: 'pointer',
            },
          }} /></Grid>
      </Grid>
    </div>
  );
};

export default LogStreamListItem;
