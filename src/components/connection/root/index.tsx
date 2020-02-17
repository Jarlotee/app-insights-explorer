import { FunctionComponent, useState } from 'react';

import dynamic from 'next/dynamic';

import { Tab, Tabs } from '@material-ui/core';

import BreadcrumbNav from '../../breadcrumb-nav';

const ConnectionRoot: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (_event, value) => setActiveTab(value);

  const ConnectionQuery = dynamic(() => import('../query'));
  const ConnectionDashboard = dynamic(() => import('../dashboard'));

  const handleOnPin = () => setActiveTab('dashboard');

  const body = activeTab === 'query' ? <ConnectionQuery onPin={handleOnPin} /> : <ConnectionDashboard />;

  return (
    <>
      <BreadcrumbNav />
      <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary">
        <Tab value="query" label="Query" />
        <Tab value="dashboard" label="Dashboard" />
      </Tabs>
      {body}
    </>
  );
};

export default ConnectionRoot;
