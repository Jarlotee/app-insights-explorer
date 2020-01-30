import { FunctionComponent } from 'react';
import { List, ListItem, ListItemText, ListSubheader, ListItemIcon } from '@material-ui/core';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { useRouter } from 'next/router';
import useConnections from '../../../hooks/useConnections';

const ConnectionHistory: FunctionComponent = () => {
  const connections =  useConnections();
  const router = useRouter();

  const handleItemClick = (name: string) => {
    router.push('/[connection-name]', `/${name}`);
  };

  const header = <ListSubheader>Connection History</ListSubheader>;

  const connectionList = connections.map((c, i) => (
    <ListItem
      key={i}
      dense={true}
      button={true}
      component="li"
      onClick={handleItemClick.bind(null, c.name)}
    >
      <ListItemText primary={c.name} />
      <ListItemIcon>
        <DoubleArrowIcon />
      </ListItemIcon>
    </ListItem>
  ));

  if (connectionList.length === 0) {
    connectionList.push(
      <ListItem key={0} dense={true}>
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
