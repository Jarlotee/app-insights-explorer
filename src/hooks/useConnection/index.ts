import { useContext } from 'react';

import context from '../../contexts/connection';

const useConnection = () => {
  const { connection, connections, onChange, onSave } = useContext(context);

  return { connection, connections, onChange, onSave };
};

export default useConnection;
