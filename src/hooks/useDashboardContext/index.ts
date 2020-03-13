import { useContext } from 'react';

import context from '../../contexts/dashboard';

const useDashboardContext = () => {
  const {
    dashboard,
    dashboards,
    isEditing,
    setIsEditing,
    onCreate,
    onSave,
    onUpload,
    onChange,
    onDelete,
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
    onCreate,
    onSave,
    onUpload,
    onChange,
    onDelete,
    onPushItem,
    onDropItem,
    onEditItem,
    onDeleteItem,
  };
};

export default useDashboardContext;
