import { FunctionComponent } from 'react';

import {
  makeStyles,
  Theme,
  Card,
  Typography,
  CardActionArea,
  Button,
  CardActions,
  CardContent,
  CardMedia,
} from '@material-ui/core';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(1),
  },
  card: {
    maxWidth: 345,
    margin: theme.spacing(1),
  },
  dashboard: {
    height: 140,
    backgroundSize: '90% auto',
  },
  query: {
    height: 140,
    backgroundPosition: 'left 10px',
    backgroundColor: '#3E464F',
  },
}));

const Home: FunctionComponent = () => {
  const classes = useStyles();
  const router = useRouter();

  const handleNavigateQuery = () => router.push('/query');
  const handleNavigateDashboard = () => router.push('/dashboard');

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardActionArea onClick={handleNavigateDashboard}>
          <CardMedia
            className={classes.dashboard}
            image="/images/dashboard.png"
            title="dashboard illustration"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Dashboards
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Create, view and share dashboards with tables, graphs and more.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleNavigateDashboard}>
            View Dashboards
          </Button>
        </CardActions>
      </Card>
      <Card className={classes.card}>
        <CardActionArea onClick={handleNavigateQuery}>
          <CardMedia
            className={classes.query}
            image="/images/code.png"
            title="query illustration"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Query
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Write ad-hoc queries and visualize data, save them for later.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleNavigateQuery}>
            Write Queries
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Home;
