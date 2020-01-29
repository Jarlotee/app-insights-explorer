import { FunctionComponent, useState } from 'react';
import { Tab, Tabs } from '@material-ui/core';

import BreadcrumbNav from '../../breadcrumb-nav';
import ConnectionQuery from '../query';

const ConnectionRoot: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState('query');

  const handleTabChange = (_event, value) => setActiveTab(value);

  const body = activeTab === 'query' ? <ConnectionQuery /> : null;

  return (
    <>
      <BreadcrumbNav />
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab value="query" label="Query" />
        <Tab value="dashboard" label="Dashboard" />
      </Tabs>
      {body}
    </>
  );
};

export default ConnectionRoot;
