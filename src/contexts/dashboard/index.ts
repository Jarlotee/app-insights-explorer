import { createContext } from 'react';

import { Dashboard, DashboardItem, DashboardCoordinate } from '../../models';

type DashboardContext = {
  dashboard: Dashboard;
  dashboards: string[];
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  onChange: (name: string) => void;
  onSave: () => void;
  onUpload: (encodedJson: string) => string;
  onCreate: (name: string) => void;
  onDropItem: (_item: DashboardItem, anchor: DashboardCoordinate) => void;
  onEditItem: (_item: DashboardItem) => void;
  onDeleteItem: (_item: DashboardItem) => void;
  onPushItem: (_item: DashboardItem) => void;
};

const dashboardContext = createContext<DashboardContext>(null);

export default dashboardContext;
