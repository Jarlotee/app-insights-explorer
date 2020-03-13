import { FunctionComponent, useState } from 'react';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Theme,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import useDashboardContext from '../../hooks/useDashboardContext';

import DashboardCreationDialog from './_creation-dialog';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 300,
    margin: theme.spacing(1, 0),
  },
  icon: {
    minWidth: 0,
    marginRight: theme.spacing(1),
  },
}));

const DashboardPicker: FunctionComponent = ({}) => {
  const classes = useStyles();
  const { dashboard, dashboards, onChange } = useDashboardContext();
  const [creationDialogOpen, setCreationDialogOpen] = useState(false);
  const handleCreationDialogClose = () => setCreationDialogOpen(false);

  const handleChange = event => {
    if (event.target.value === 'new-dashboard') {
      setCreationDialogOpen(true);
    } else {
      onChange(event.target.value);
    }
  };

  let items = null;

  if (dashboards) {
    items = dashboards.map((dash, index) => (
      <MenuItem key={index} value={dash} dense={true}>
        <ListItemText primary={dash} />
      </MenuItem>
    ));
  }

  return (
    <>
      <FormControl variant="outlined" className={classes.root}>
        <InputLabel id="dashboard-picker-label" margin="dense">
          {items && items.length ? 'Dashboard' : 'Create New Dashboard'}
        </InputLabel>
        <Select
          value={dashboard ? dashboard.name : ''}
          onChange={handleChange}
          labelId="dashboard-picker-label"
          label={items && items.length ? 'Dashboard' : 'Create New Dashboard'}
          margin="dense"
          placeholder="Create New Dashboard"
        >
          {items}
          <MenuItem value="new-dashboard" dense={true}>
            <ListItemIcon className={classes.icon}>
              <AddIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Create New Dashboard" />
          </MenuItem>
        </Select>
      </FormControl>
      <DashboardCreationDialog isOpen={creationDialogOpen} onClose={handleCreationDialogClose} />
    </>
  );
};

export default DashboardPicker;
