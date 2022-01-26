import React from 'react';
import Link from 'next/link';
import { Buffer } from 'buffer';


import { LogGroup } from '@aws-sdk/client-cloudwatch-logs';

type Props = {
  data: LogGroup
};

const LogGroupListItem = ({ data }: Props) => (
  <Link href="/detail/[id]" as={`/detail/${Buffer.from(JSON.stringify({
    logGroupName: data.logGroupName,
    arn: data.arn,
  })).toString('base64')}`}>
    <a>
      {data.logGroupName}
    </a>
  </Link>
);

export default LogGroupListItem;
