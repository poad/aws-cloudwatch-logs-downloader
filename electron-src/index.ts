// Native
import { join } from 'path';
import { URL } from 'url';

import * as fs from 'fs';

// Packages
import { BrowserWindow, app, ipcMain, dialog, IpcMainInvokeEvent } from 'electron';
import isDev from 'electron-is-dev';
import prepareNext from 'electron-next';
import { CloudWatchLogsClient, GetLogEventsCommand, OutputLogEvent } from '@aws-sdk/client-cloudwatch-logs';

const client = new CloudWatchLogsClient({});

async function downloadLog(logGroupName: string, logStreamName: string, nextForwardToken?: string): Promise<OutputLogEvent[]> {
  const response = await client.send(new GetLogEventsCommand({ logGroupName, logStreamName, nextToken: nextForwardToken }));
  const events = response.events === undefined ? [] : response.events;
  if (nextForwardToken === undefined) {
    return events;
  }
  return events.concat(await downloadLog(logGroupName, logStreamName, response.nextForwardToken));
}


// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer');

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: join(__dirname, 'preload.js'),
    },
  });

  const uri = isDev
    ? 'http://localhost:8000/'
    : new URL(`file://${join(__dirname, '../renderer/out/index.html')}`).toString();

  mainWindow.loadURL(uri);
});

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit);


ipcMain.handle('saveLogPath', async (_event: IpcMainInvokeEvent, title: string): Promise<string | undefined> => {
  console.log('start save process');
  return dialog.showSaveDialogSync({
    properties: ['createDirectory', 'showOverwriteConfirmation'], filters: [
      { extensions: ['json', 'log', 'txt'], name: '*' },
    ], title,
  });
});

ipcMain.handle('downloadLogs', async (_event: IpcMainInvokeEvent, logGroupName: string, logStreamName: string): Promise<OutputLogEvent[]> => {
  console.log('start download');
  return downloadLog(logGroupName, logStreamName);
});


ipcMain.handle('saveLog', async (_event: IpcMainInvokeEvent, path, value): Promise<{
  status: boolean,
  path?: string,
  error?: unknown
}> => {
  try {
    console.log('start save');

    fs.writeFileSync(path, value);

    console.log('saved!');


    return { status: true, path };
  } catch (error) {
    return { status: false, error };
  }
});
