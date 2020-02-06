export interface Connection {
  name: string;
  id: string;
  key: string;
}

export interface QueryHistoryItem {
  timestamp: string;
  query: string;
}

export interface ApplicationInsightsResponse {
  tables: ApplicationInsightTable[];
}

export interface ApplicationInsightTable {
  columns: ApplicationInsightTableColumn[];
  rows: any[][];
}

export interface ApplicationInsightTableColumn {
  name: string;
  type: string;
}

export interface Dashboard {
  items: DashboardItem[];
}

export interface DashboardItem {
  id?: Symbol;
  anchor?: number;
  positions?: number[];
  type: string;
  width: number;
  height: number;
  config: Record<string, string>;
}
