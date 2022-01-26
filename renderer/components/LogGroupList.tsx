import React from 'react';
import LogGroupListItem from './LogGroupListItem';
import { LogGroup } from '@aws-sdk/client-cloudwatch-logs';
import { List, ListItem } from '@mui/material';

type Props = {
  items: LogGroup[]
};

const LogGroupList = ({ items }: Props) => (
  <List>
    {
      items.map((item) => (
        <ListItem key={item.logGroupName}>
          <LogGroupListItem data={item} key={item.logGroupName} />
        </ListItem>
      ))
    }
  </List>
);

export default LogGroupList;
