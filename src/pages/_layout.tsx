import { FunctionComponent } from 'react';

import { SnackbarProvider } from 'notistack';

import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';

import Nav from '../components/nav';

const useStyles = makeStyles({
  shared: {
    color: 'white',
  },
  info: {
    backgroundColor: '#6D747A',
    color: 'white',
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
      <Container>{children}</Container>
    </SnackbarProvider>
  );
};

export default _Layout;
