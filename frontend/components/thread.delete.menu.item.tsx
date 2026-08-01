'use client';

import { deleteThread } from '@/actions/threads.action';
import { MenuItem } from '@mui/material';
import { useTransition } from 'react';

interface Props {
  threadId: string;
}

export function ThreadDeleteMenuItem({ threadId }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
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
