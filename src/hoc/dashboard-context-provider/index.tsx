import { useState, useEffect } from 'react';

import { v4 } from 'uuid';

import { DashboardItem, DashboardCoordinate, Dashboard } from '../../models';

import Context from '../../contexts/dashboard';

import {
  getDashboards,
  saveDashboard,
  getDashboard,
  deleteDashboard,
  updateDashboards,
} from '../../gateways/settings';
import { validateDashboard } from './_validator';

const calculatePositions = (item: DashboardItem) => {
  const positions: DashboardCoordinate[] = [];

  for (let i = item.anchor.row; i <= item.anchor.row + item.height - 1; i++) {
    for (let j = item.anchor.column; j <= item.anchor.column + item.width - 1; j++) {
      positions.push({ column: i, row: j });
    }
  }

  return positions;
};

const getDefaultDashboard = () => {
  const dashboards = getDashboards();

  if (dashboards.length === 0) {
    return null;
  }

  return (dashboards.filter(c => c.default)[0] || dashboards[0]).name;
};

const DashboardContextProvider = ({ children }) => {
  const [dashboard, setDashboard] = useState<Dashboard>();
  const [dashboards, setDashboards] = useState<string[]>();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onDropItem = (_item: DashboardItem, anchor: DashboardCoordinate) => {
    const item = JSON.parse(JSON.stringify(_item)) as DashboardItem;

    item.anchor = anchor;
    item.positions = calculatePositions(item);

    const collisions = dashboard.items
      .filter(existing => existing.id !== item.id)
      .filter(existing => {
        for (const existing_position of existing.positions) {
          for (const item_position of item.positions) {
            if (
              existing_position.row == item_position.row &&
              existing_position.column == item_position.column
            ) {
              return true;
            }
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

  const onEditItem = (_item: DashboardItem) => {
    const item = JSON.parse(JSON.stringify(_item));

    item.positions = calculatePositions(item);

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

  const onDeleteItem = (item: DashboardItem) => {
    const updatedDashboard = JSON.parse(JSON.stringify(dashboard)) as Dashboard;
    const index = updatedDashboard.items.findIndex(i => i.id === item.id);

    if (index > -1) {
      updatedDashboard.items.splice(index, 1);

      setDashboard(updatedDashboard);
    }
  };

  const onPushItem = (_item: DashboardItem) => {
    const item = JSON.parse(JSON.stringify(_item)) as DashboardItem;

    const itemRows = dashboard.items
      .filter(i => i.anchor.column <= _item.width)
      .map(i => i.anchor.row + i.height - 1);

    if (itemRows.length === 0) {
      itemRows.push(0);
    }

    item.anchor = { column: 1, row: Math.max(...itemRows) + 1 };
    item.positions = calculatePositions(item);

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
    saveDashboard(updatedDashboard);
  };

  const onCreate = (name: string) => {
    if (dashboards.indexOf(name) > -1) {
      return `A dashboard named ${name} already exists`;
    } else {
      const newDashboard = { name, items: [], default: true };
      saveDashboard(newDashboard);
      setDashboards(getDashboards().map(d => d.name));
      onChange(name);
    }
  };

  const onSave = () => {
    saveDashboard(dashboard);
  };

  const onUpload = (encodedJson: string) => {
    const error = validateDashboard(encodedJson);

    if (error) {
      return error;
    }

    const uploadedDashboard = JSON.parse(encodedJson);

    setDashboard(uploadedDashboard);
    setDashboards([...[uploadedDashboard.name], ...dashboards]);
  };

  const onChange = (name: string) => {
    const foundDashboard = getDashboard(name);

    if (!!foundDashboard) {
      updateDashboards(name);
      setDashboard(foundDashboard);
    } else {
      setDashboard(undefined);
    }
  };

  const onDelete = (name: string) => {
    const foundDashboard = getDashboard(name);

    if (!!foundDashboard) {
      deleteDashboard(name);
      setDashboards(getDashboards().map(d => d.name));
      onChange(getDefaultDashboard());
    }
  };

  useEffect(() => {
    onChange(getDefaultDashboard());
    setDashboards(getDashboards().map(d => d.name));
  }, []);

  return (
    <Context.Provider
      value={{
        dashboard,
        dashboards,
        isEditing,
        setIsEditing,
        onChange,
        onUpload,
        onSave,
        onCreate,
        onDelete,
        onDropItem,
        onEditItem,
        onDeleteItem,
        onPushItem,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default DashboardContextProvider;
