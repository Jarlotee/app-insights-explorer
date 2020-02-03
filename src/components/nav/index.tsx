import { makeStyles, Theme } from '@material-ui/core/styles';
import { FunctionComponent } from 'react';
import { AppBar, Toolbar, Link, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      padding: theme.spacing(1, 2, 1, 1),
      cursor: 'pointer',
    },
  },
}));

const Nav: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <Link href="/">
          <Typography variant="h6" className={classes.title}>
            App Insights Explorer
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
