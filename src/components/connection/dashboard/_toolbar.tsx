import { FunctionComponent, useState } from 'react';

import { Toolbar, Button, Theme, makeStyles } from '@material-ui/core';

import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import RefreshIcon from '@material-ui/icons/Refresh';

import ConnectionDashboardUploadDrawer from './_upload-drawer';

import { Dashboard } from '../../../models';

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
  dashboard: Dashboard | undefined;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onUpload: (encodedJson: string) => string | undefined;
};

const ConnectionDashboardToolbar: FunctionComponent<ConnectionDashboardToolbarProps> = ({
  dashboard,
  isEditing,
  onEdit,
  onSave,
  onUpload
}) => {
  const classes = useStyles();
  const [isUploadDrawerOpen, setIsUploadDrawerOpen] = useState(false);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleUploadDrawerClose = () => setIsUploadDrawerOpen(false);
  const handleUploadClick = () => setIsUploadDrawerOpen(true);

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
          onClick={handleRefresh}
        >
          Disgard Changes
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="default"
          className={classes.menuButton}
          startIcon={<PublishIcon />}
          onClick={handleUploadClick}
        >
          Upload
        </Button>
        <ConnectionDashboardUploadDrawer
          isOpen={isUploadDrawerOpen}
          onClose={handleUploadDrawerClose}
          onUpload={onUpload}
        />
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
      <Button
        size="small"
        variant="outlined"
        color="default"
        className={classes.menuButton}
        startIcon={<RefreshIcon />}
        onClick={handleRefresh}
      >
        Refresh
      </Button>
      <Button
        size="small"
        variant="outlined"
        color="default"
        className={classes.menuButton}
        startIcon={<GetAppIcon />}
        href={`data:text/plain;charset=utf-8,${encodeURIComponent(
          JSON.stringify(dashboard || {})
        )}`}
        download="dashboard.json"
      >
        Download
      </Button>
    </Toolbar>
  );
};

export default ConnectionDashboardToolbar;
