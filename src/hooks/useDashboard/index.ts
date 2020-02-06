import { useState, useEffect } from 'react';

import { getDashboard } from '../../gateways/settings';

import { Dashboard, DashboardItem } from '../../models';

const useDashboard = (connectionName: string) => {
  const [dashboard, setDashboard] = useState<Dashboard>();

  const onDrop = (item: DashboardItem) => {
    console.log('you dropped it!', item);
  };

  const onSave = () => {
    console.log('your saving it!');
  };

  useEffect(() => {
    const dashboard = getDashboard(connectionName);
    setDashboard(dashboard);
  }, [connectionName]);

  return { dashboard, onDrop, onSave };
};

export default useDashboard;
