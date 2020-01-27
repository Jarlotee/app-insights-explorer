import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

export default () => {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    enqueueSnackbar('Mmmmm Snackbar', { variant: 'warning'})
  }, [])
  return <div>Hello World</div>;
};
