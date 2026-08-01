'use client';

import { insertThread } from '@/actions/threads.action';
import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useTransition } from 'react';

export function ThreadAddButton() {
  const [isPending, startTransition] = useTransition();
  const handleClick = () => {
    startTransition(async () => {
      await insertThread({
        name: 'New Thread',
      });
    });
  };
  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      startIcon={<Add />}
      onClick={handleClick}
      disabled={isPending}
      loading={isPending}
    >
      New Thread
    </Button>
  );
}
