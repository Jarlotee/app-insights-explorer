import { FunctionComponent } from 'react';

import { Toolbar, Button, Theme, makeStyles } from '@material-ui/core';

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

const ConnectionDashboardToolbar: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Toolbar variant="dense" disableGutters={true}>
      <Button
        size="small"
        variant="outlined"
        color="primary"
        className={classes.menuButton}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>
      <Button
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
      </Button>
      <Button
        size="small"
        variant="outlined"
        color="default"
        className={classes.menuButton}
        startIcon={<RefreshIcon />}
      >
        Refresh
      </Button>
    </Toolbar>
  );
};

export default ConnectionDashboardToolbar;
