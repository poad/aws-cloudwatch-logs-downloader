import { CloudWatchLogsClient, DescribeLogGroupsCommand, DescribeLogStreamsCommand, LogGroup, LogStream } from '@aws-sdk/client-cloudwatch-logs';

export async function listLogGroups(client: CloudWatchLogsClient, nextToken?: string): Promise<LogGroup[]> {
  const response = await client.send(new DescribeLogGroupsCommand({ nextToken }));
  const groups = response.logGroups === undefined ? [] : response.logGroups;
  if (nextToken === undefined) {
    return groups;
  }
  return groups.concat(await listLogGroups(client, response.nextToken));
}

export async function getLogGroup(client: CloudWatchLogsClient, logGroupName: string, nextToken?: string): Promise<LogStream[]> {
  const response = await client.send(new DescribeLogStreamsCommand({ logGroupName, nextToken }));
  const streams = response.logStreams === undefined ? [] : response.logStreams;
  if (nextToken === undefined) {
    return streams;
  }
  return streams.concat(await getLogGroup(client, logGroupName, response.nextToken));
}
