import { FunctionComponent } from 'react';
import { Drawer, ListSubheader, ListItem, ListItemText, List } from '@material-ui/core';
import { formatDistanceToNow, parseISO } from 'date-fns';

import useConnectionContext from '../../hooks/useConnectionContext';
import useQueryHistory from '../../hooks/useQueryHistory';

type ConnectionQueryHistoryProps = {
  isOpen: boolean;
  handleToggle: () => void;
  handleSetQuery: (query: string) => void;
};

const ConnectionQueryHistory: FunctionComponent<ConnectionQueryHistoryProps> = ({
  isOpen,
  handleToggle,
  handleSetQuery,
}) => {
  const { connection } = useConnectionContext();
  const queryHistory = useQueryHistory(connection);

  const handleItemClick = (query: string) => {
    handleSetQuery(query);
    handleToggle();
  };

  const header = <ListSubheader>Query History</ListSubheader>;

  const queryHistoryItems = queryHistory.map((h, i) => (
    <ListItem key={i} dense={true} button={true} onClick={handleItemClick.bind(null, h.query)}>
      <ListItemText
        primary={h.query}
        secondary={formatDistanceToNow(parseISO(h.timestamp.toString()), { addSuffix: true })}
      />
    </ListItem>
  ));

  if (queryHistoryItems.length === 0) {
    queryHistoryItems.push(
      <ListItem key={0} dense={true}>
        <ListItemText>No query history found</ListItemText>
      </ListItem>
    );
  }

  return (
    <Drawer anchor="bottom" open={isOpen} onClose={handleToggle}>
      <List component="ul" subheader={header}>
        {queryHistoryItems}
      </List>
    </Drawer>
  );
};

export default ConnectionQueryHistory;
