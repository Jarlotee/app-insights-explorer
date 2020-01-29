import { Connection } from '../../models';
import { getQueryHistory } from '../../gateways/settings';

const useQuery = (connection: Connection) => {
  if (!connection) {
    return [];
  }

  return getQueryHistory(connection.name);
};

export default useQuery;
