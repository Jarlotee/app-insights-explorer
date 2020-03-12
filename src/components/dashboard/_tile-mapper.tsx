import { DashboardItem, DashboardLabelItem, DashboardQueryItem } from '../../models';

import { ItemTypes } from './_constants';

import DashboardLabelTile from './tiles/label';
import DashboardQueryTile from './tiles/query';

const mapItemToTile = (
  item: DashboardItem,
  key: number,
) => {
  switch (item.type) {
    case ItemTypes.label:
      return (
        <DashboardLabelTile
          key={key}
          item={item as DashboardLabelItem}
        />
      );
    case ItemTypes.query:
      return (
        <DashboardQueryTile
          key={key}
          item={item as DashboardQueryItem}
        />
      );
    default:
      return <div>Unmapped Item [{item.type}]</div>;
  }
};

export default mapItemToTile;
