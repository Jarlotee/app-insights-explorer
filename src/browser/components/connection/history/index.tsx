import { FunctionComponent, useEffect, useState } from 'react';
import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import { getConnections } from '../../../gateways/settings';
import { useRouter } from 'next/router';

const ConnectionHistory: FunctionComponent = () => {
  const [connections, setConnections] = useState([]);
  const router = useRouter();

  const handleItemClick = (name: string) => {
    router.push(`/${name}`);
  }

  useEffect(() => {
    setConnections(getConnections());
  }, []);

  const header = <ListSubheader>Connection History</ListSubheader>;

  const connectionList = connections.map((c, i) => (
    <ListItem key={i} onClick={handleItemClick.bind(null, c.name)}>
      <ListItemText primary={c.name} />
    </ListItem>
  ));

  if (connectionList.length === 0) {
    connectionList.push(
      <ListItem key={0}>
        <ListItemText>No history found</ListItemText>
      </ListItem>
    );
  }

  return (
    <List component="ul" subheader={header}>
      {connectionList}
    </List>
  );
};

export default ConnectionHistory;
