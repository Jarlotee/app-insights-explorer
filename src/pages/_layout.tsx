import { FunctionComponent } from 'react';

import { SnackbarProvider } from 'notistack';

import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';

import Nav from '../components/nav';

const useStyles = makeStyles({
  '@global': {
    'html, body': {
      height: '100%',
    },
    '#__next': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  shared: {
    color: 'white',
  },
  info: {
    backgroundColor: '#6D747A',
    color: 'white',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
});

const _Layout: FunctionComponent = ({ children }) => {
  const classes = useStyles();

  return (
    <SnackbarProvider
      classes={{
        variantError: classes.shared,
        variantSuccess: classes.shared,
        variantWarning: classes.shared,
        variantInfo: classes.info,
      }}
    >
      <Nav />
      <Container maxWidth={false} className={classes.container}>
        {children}
      </Container>
    </SnackbarProvider>
  );
};

export default _Layout;
