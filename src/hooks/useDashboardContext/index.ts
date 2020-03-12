import { useContext } from 'react';

import context from '../../contexts/dashboard';

const useDashboardContext = () => {
  const {
    dashboard,
    dashboards,
    isEditing,
    setIsEditing,
    onSave,
    onUpload,
    onChange,
    onPushItem,
    onDropItem,
    onEditItem,
    onDeleteItem,
  } = useContext(context);

  return {
    dashboard,
    dashboards,
    isEditing,
    setIsEditing,
    onSave,
    onUpload,
    onChange,
    onPushItem,
    onDropItem,
    onEditItem,
    onDeleteItem,
  };
};

export default useDashboardContext;
