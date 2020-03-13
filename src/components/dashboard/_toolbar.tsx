import { FunctionComponent, useState } from 'react';

import { Toolbar, Button, Theme, makeStyles } from '@material-ui/core';

import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import RefreshIcon from '@material-ui/icons/Refresh';

import DashboardUploadDrawer from './_upload-drawer';

import useDashboardContext from '../../hooks/useDashboardContext';

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

type DashboardToolbarProps = {};

const DashboardToolbar: FunctionComponent<DashboardToolbarProps> = ({}) => {
  const classes = useStyles();
  const [isUploadDrawerOpen, setIsUploadDrawerOpen] = useState(false);

  const { dashboard, onSave, onUpload, isEditing, setIsEditing, onDelete } = useDashboardContext();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleOnSave = () => {
    onSave();
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    const confirmed = confirm(`Are you sure you want to delete ${dashboard.name}`);

    if (confirmed) {
      onDelete(dashboard.name);
    }
  };

  const handleUploadDrawerClose = () => setIsUploadDrawerOpen(false);
  const handleUploadClick = () => setIsUploadDrawerOpen(true);

  if(!dashboard){
    return (
      <Toolbar variant="dense" disableGutters={true}>
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
        <DashboardUploadDrawer
          isOpen={isUploadDrawerOpen}
          onClose={handleUploadDrawerClose}
        />
      </Toolbar>
    );
  }

  if (isEditing) {
    return (
      <Toolbar variant="dense" disableGutters={true}>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          className={classes.menuButton}
          startIcon={<SaveIcon />}
          onClick={handleOnSave}
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
        <DashboardUploadDrawer
          isOpen={isUploadDrawerOpen}
          onClose={handleUploadDrawerClose}
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
        onClick={handleEdit}
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
      <Button
        size="small"
        variant="outlined"
        className={classes.menuButton}
        startIcon={<DeleteIcon />}
        onClick={handleDelete}
      >
        Delete Dashboard
      </Button>
    </Toolbar>
  );
};

export default DashboardToolbar;
