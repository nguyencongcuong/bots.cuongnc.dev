'use client';

import { deleteThread } from '@/actions/threads.action';
import { MenuItem } from '@mui/material';
import { useTransition } from 'react';

interface Props {
  threadId: string;
  onDelete: () => void;
}

export function ThreadDeleteMenuItem({ threadId, onDelete }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    onDelete();
    startTransition(async () => {
      await deleteThread(threadId);
    });
  };
  return (
    <MenuItem onClick={handleClick} disabled={isPending}>
      Delete Thread
    </MenuItem>
  );
}
