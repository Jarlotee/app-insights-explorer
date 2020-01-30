import { getConnections } from '../../gateways/settings';
import { useState, useEffect } from 'react';

const useConnections = () => {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    setConnections(getConnections());
  }, []);

  return connections;
};

export default useConnections;
