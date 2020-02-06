import { FunctionComponent } from 'react';

import { Drawer, ListSubheader, List } from '@material-ui/core';

import ConnectionDashboardTileLabel from './_tile-label';

type ConnectionDashboardTileDrawerProps = {
  isOpen: boolean;
  handleToggle: () => void;
};

const ConnectionDashboardTileDrawer: FunctionComponent<ConnectionDashboardTileDrawerProps> = ({
  isOpen,
  handleToggle,
}) => {
  const header = <ListSubheader>Tiles</ListSubheader>;

  return (
    <Drawer anchor="right" variant="permanent" open={isOpen} onClose={handleToggle}>
      <List component="ul" subheader={header}>
        {<ConnectionDashboardTileLabel key={0} />}
      </List>
    </Drawer>
  );
};

export default ConnectionDashboardTileDrawer;
