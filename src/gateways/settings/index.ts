import { Connection, QueryHistoryItem, Dashboard } from '../../models';

export const saveConnections = (updatedConnections: Connection[]) => {
  const connections = JSON.parse(localStorage.getItem('connections') || '{}');

  for (const connection of updatedConnections) {
    connections[connection.name] = connection;
  }

  localStorage.setItem('connections', JSON.stringify(connections));
};

export const getConnections = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  const connections = JSON.parse(localStorage.getItem('connections') || '{}');

  const mapped = Object.keys(connections).map<Connection>(k => ({
    name: k,
    id: connections[k].id,
    key: connections[k].key,
  }));

  return mapped;
};

export const getConnection = (name: string) => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const connections = JSON.parse(localStorage.getItem('connections') || '{}');
  return connections[name] as Connection;
};

export const addQueryHistory = (connectionName: string, query: string) => {
  const item = JSON.parse(localStorage.getItem('history') || '{}');
  const history: QueryHistoryItem[] = item[connectionName] || [];

  const duplicates = history.filter(h => h.query === query);

  duplicates.forEach(item => {
    history.splice(history.indexOf(item), 1);
  });

  history.unshift({ timestamp: new Date().toISOString(), query });
  item[connectionName] = history.slice(0, 30);
  localStorage.setItem('history', JSON.stringify(item));
};

export const getQueryHistory = (connectionName: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  const item = JSON.parse(localStorage.getItem('history') || '{}');

  return item[connectionName] || [];
};

export const getDashboard = (dashBoardName: string) => {
  const item = JSON.parse(localStorage.getItem('dashboards') || '{}');

  return (item[dashBoardName] as Dashboard);
};

export const getDashboards = () => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const dashboards = JSON.parse(localStorage.getItem('dashboards') || '{}');

  return Object.keys(dashboards).map(k => ({
    name: k,
    default: dashboards[k].default,
  }));
};

export const saveDashboard = (dashboard: Dashboard) => {
  const dashboards = JSON.parse(localStorage.getItem('dashboards') || '{}');
  dashboards[dashboard.name] = dashboard;
  localStorage.setItem('dashboards', JSON.stringify(dashboards));
};

export const deleteDashboard = (dashBoardName: string) => {
  const dashboards = JSON.parse(localStorage.getItem('dashboards') || '{}');
  delete dashboards[dashBoardName];
  localStorage.setItem('dashboards', JSON.stringify(dashboards));
}

export const updateDashboards = (currentDashboardName : string) => {
  const dashboards = JSON.parse(localStorage.getItem('dashboards') || '{}');

  Object.keys(dashboards).forEach(key => {
    dashboards[key].default = dashboards[key].name === currentDashboardName;
  });

  localStorage.setItem('dashboards', JSON.stringify(dashboards));
}
