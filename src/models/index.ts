export interface Connection {
  name: string;
  id: string;
  key: string;
  default?: boolean;
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
  name: string;
  default?: boolean;
}

export interface DashboardCoordinate {
  row: number;
  column: number;
}

export interface DashboardItem {
  id?: string;
  anchor?: DashboardCoordinate;
  positions?: DashboardCoordinate[];
  type: string;
  width: number;
  height: number;
}

export interface DashboardLabelItem extends DashboardItem {
  title: string;
  subTitle?: string;
}

export interface DashboardQueryItem extends DashboardItem {
  title: string;
  query: string;
  connection?: string;
  lastRefresh?: string;
}
