import { DashboardItem, DashboardLabelItem } from '../../../models';

import { ItemTypes } from './_constants';

import DashboardLabelTile from './tiles/label';

const mapItemToTile = (item: DashboardItem, key: number, onEdit: (item: DashboardItem) => void = null, onDelete: (item: DashboardItem) => void = null) => {
  switch (item.type) {
    case ItemTypes.label:
      return (
        <DashboardLabelTile
          key={key}
          item={item as DashboardLabelItem}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );
    default:
      return <div>Unmapped Item [{item.type}]</div>;
  }
};

export default mapItemToTile;
