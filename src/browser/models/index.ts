export interface Connection {
  name: string;
  id: string;
  key: string;
}

export interface QueryHistoryItem {
  timestamp: string;
  query: string;
}
