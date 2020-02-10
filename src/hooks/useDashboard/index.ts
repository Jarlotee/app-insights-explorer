import { useState, useEffect } from 'react';

import { v4 } from 'uuid';

import { getDashboard, saveDashboard } from '../../gateways/settings';

import { Dashboard, DashboardItem } from '../../models';

const calculatePositions = (item: DashboardItem, anchor: number) => {
  const positions = [];

  positions.push(anchor);

  for (let i = 2; i <= item.width; i++) {
    positions.push(anchor + i - 1);
  }

  for (let i = 2; i <= item.height; i++) {
    const rowBonus = anchor - 1 + (i - 1) * 59;
    for (let i = 1; i <= item.width; i++) {
      positions.push(rowBonus + i);
    }
  }

  return positions;
};

const useDashboard = (connectionName: string) => {
  const [dashboard, setDashboard] = useState<Dashboard>();

  const onDrop = (_item: DashboardItem, anchor: number) => {
    const item = JSON.parse(JSON.stringify(_item));

    item.anchor = anchor;
    item.positions = calculatePositions(item, anchor);

    const collision = dashboard.items
      .filter(i => i.id !== item.id)
      .filter(i => !!item.positions?.filter(i2 => i.positions.includes(i2)).length);

    if (!collision.length) {
      const updatedDashboard = JSON.parse(JSON.stringify(dashboard)) as Dashboard;
      if (!item.id) {
        item.id = v4();
        updatedDashboard.items.push(item);
      } else {
        let index = updatedDashboard.items.findIndex(i => i.id === item.id);
        if (index === -1) {
          updatedDashboard.items.push(item);
        } else {
          updatedDashboard.items.splice(index, 1, item);
        }
      }

      setDashboard(updatedDashboard);
    }
  };

  const onEdit = (_item: DashboardItem) => {
    const item = JSON.parse(JSON.stringify(_item));

    item.positions = calculatePositions(item, item.anchor);

    const collision = dashboard.items
      .filter(i => i.id !== item.id)
      .filter(i => !!item.positions?.filter(i2 => i.positions.includes(i2)).length);

    if (!collision.length) {
      const updatedDashboard = JSON.parse(JSON.stringify(dashboard)) as Dashboard;
      if (!item.id) {
        item.id = v4();
        updatedDashboard.items.push(item);
      } else {
        let index = updatedDashboard.items.findIndex(i => i.id === item.id);
        if (index === -1) {
          updatedDashboard.items.push(item);
        } else {
          updatedDashboard.items.splice(index, 1, item);
        }
      }

      setDashboard(updatedDashboard);
    }
  }

  const onSave = () => {
    saveDashboard(connectionName, dashboard);
  };

  useEffect(() => {
    const dashboard = getDashboard(connectionName);
    setDashboard(dashboard);
  }, [connectionName]);

  return { dashboard, onDrop, onEdit, onSave };
};

export default useDashboard;
