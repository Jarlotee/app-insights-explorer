import { FunctionComponent } from 'react';

import { Toolbar, Button, Theme, makeStyles } from '@material-ui/core';

import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    marginRight: theme.spacing(1),
    minWidth: theme.spacing(12),
    '& .MuiSvgIcon-root': {
      fontSize: '15px',
      marginBottom: '2px',
    },
  },
  menuButtonEnd: {
    minWidth: theme.spacing(12),
    marginLeft: 'auto',
    '& .MuiSvgIcon-root': {
      fontSize: '15px',
      marginBottom: '2px',
    },
  },
}));

type ConnectionDashboardToolbarProps = {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
};

const ConnectionDashboardToolbar: FunctionComponent<ConnectionDashboardToolbarProps> = ({
  isEditing,
  onEdit,
  onSave,
}) => {
  const classes = useStyles();

  const disgardChanges = () => {
    window.location.reload();
  };

  if (isEditing) {
    return (
      <Toolbar variant="dense" disableGutters={true}>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          className={classes.menuButton}
          startIcon={<SaveIcon />}
          onClick={onSave}
        >
          Save Changes
        </Button>
        <Button
          size="small"
          variant="outlined"
          className={classes.menuButton}
          startIcon={<DeleteIcon />}
          onClick={disgardChanges}
        >
          Disgard Changes
        </Button>
      </Toolbar>
    );
  }

  return (
    <Toolbar variant="dense" disableGutters={true}>
      <Button
        size="small"
        variant="outlined"
        color="primary"
        className={classes.menuButton}
        startIcon={<EditIcon />}
        onClick={onEdit}
      >
        Edit
      </Button>
      {/* <Button
        size="small"
        variant="outlined"
        color="default"
        className={classes.menuButton}
        startIcon={<PublishIcon />}
      >
        Upload
      </Button>
      <Button
        size="small"
        variant="outlined"
        color="default"
        className={classes.menuButton}
        startIcon={<GetAppIcon />}
      >
        Download
      </Button> */}
      <Button
        size="small"
        variant="outlined"
        color="default"
        className={classes.menuButton}
        startIcon={<RefreshIcon />}
        onClick={disgardChanges}
      >
        Refresh
      </Button>
    </Toolbar>
  );
};

export default ConnectionDashboardToolbar;
