import { createContext } from 'react';

import { Connection } from '../../models';

type ConnnectionContext = {
  connection: Connection;
  connections: Connection[];
  onChange: (name: string) => void;
  onSave: (newConnection: Connection) => void;
};

const connectionContext = createContext<ConnnectionContext>(null);

export default connectionContext;
