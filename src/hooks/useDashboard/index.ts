import { useState, useEffect } from 'react';

import { v4 } from 'uuid';

import { getDashboard, saveDashboard } from '../../gateways/settings';

import { Dashboard, DashboardItem, DashboardCoordinate } from '../../models';

const calculatePositions = (item: DashboardItem, anchor: DashboardCoordinate) => {
  const positions: DashboardCoordinate[] = [];

  for (let i = anchor.row; i <= anchor.row + item.height - 1; i++) {
    for (let j = anchor.column; j <= anchor.column + item.width - 1; j++) {
      positions.push({ column: i, row: j });
    }
  }

  return positions;
};

const useDashboard = (connectionName: string) => {
  const [dashboard, setDashboard] = useState<Dashboard>();

  const onDrop = (_item: DashboardItem, anchor: DashboardCoordinate) => {
    const item = JSON.parse(JSON.stringify(_item)) as DashboardItem;

    item.anchor = anchor;
    item.positions = calculatePositions(item, anchor);

    const collisions = dashboard.items
      .filter(existing => existing.id !== item.id)
      .filter(existing => {
        for (const existing_position of existing.positions) {
          for (const item_position of item.positions) {
            return (
              existing_position.row == item_position.row &&
              existing_position.column == item_position.column
            );
          }
        }
      });

    if (!collisions.length) {
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
      const index = updatedDashboard.items.findIndex(i => i.id === item.id);
      if (index === -1) {
        updatedDashboard.items.push(item);
      } else {
        updatedDashboard.items.splice(index, 1, item);
      }

      setDashboard(updatedDashboard);
    }
  };

  const onDelete = (item: DashboardItem) => {
    const updatedDashboard = JSON.parse(JSON.stringify(dashboard)) as Dashboard;
    const index = updatedDashboard.items.findIndex(i => i.id === item.id);

    if (index > -1) {
      updatedDashboard.items.splice(index, 1);

      setDashboard(updatedDashboard);
    }
  };

  const onSave = () => {
    saveDashboard(connectionName, dashboard);
  };

  useEffect(() => {
    const dashboard = getDashboard(connectionName);
    setDashboard(dashboard);
  }, [connectionName]);

  return { dashboard, onDrop, onEdit, onSave, onDelete };
};

export default useDashboard;
