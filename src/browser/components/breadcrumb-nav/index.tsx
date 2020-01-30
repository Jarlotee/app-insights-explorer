import { FunctionComponent, MouseEvent } from 'react';

import { useRouter } from 'next/router';
import { makeStyles, Theme, Link } from '@material-ui/core';
import NextLink from 'next/link';

import { Breadcrumbs } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  breadcrumbs: {
    margin: theme.spacing(2, 0),
  },
}));

const BreadcrumbNav: FunctionComponent = () => {
  const router = useRouter();
  const classes = useStyles();

  const segments = router.asPath.split('/').map(s => decodeURI(s));
  const slugs = router.pathname.split('/').map(s => decodeURI(s));

  const crumbs = segments.map((s, i) => (
    <NextLink
      key={i}
      href={slugs.slice(0, i + 1).join('/') || '/'}
      as={segments.slice(0, i + 1).join('/') || '/'}
    >
      <Link color={i === segments.length - 1 ? 'primary' : 'inherit'}>{s || 'Home'}</Link>
    </NextLink>
  ));

  return <Breadcrumbs className={classes.breadcrumbs}>{crumbs}</Breadcrumbs>;
};

export default BreadcrumbNav;
