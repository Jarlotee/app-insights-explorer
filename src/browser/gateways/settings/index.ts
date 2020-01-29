import { Connection, QueryHistoryItem } from '../../models';

export const saveConnection = (connection: Connection) => {
  const { name } = connection;

  const connections = JSON.parse(localStorage.getItem('connections') || '{}');
  connections[name] = connection;
  localStorage.setItem('connections', JSON.stringify(connections));
};

export const getConnections = () => {
  if (typeof window === 'undefined') {
    return;
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
    return;
  }

  const connections = JSON.parse(localStorage.getItem('connections') || '{}');
  return connections[name];
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
