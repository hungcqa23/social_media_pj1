import { useState } from 'react';

type DialogId = string;

interface DialogManager {
  openDialog: (dialogId: DialogId) => void;
  closeDialog: (dialogId: DialogId) => void;
  isOpen: (dialogId: DialogId) => boolean;
}

export function useDialogManager(
  initialDialogs: DialogId[] = []
): DialogManager {
  const [dialogs, setDialogs] = useState<DialogId[]>(initialDialogs);

  const openDialog = (dialogId: DialogId) =>
    setDialogs(prevDialogs => [...prevDialogs, dialogId]);

  const closeDialog = (dialogId: DialogId) => {
    setDialogs(prevDialogs => prevDialogs.filter(id => id !== dialogId));
  };

  const isOpen = (dialogId: DialogId) => dialogs.includes(dialogId);

  return { openDialog, closeDialog, isOpen };
}
