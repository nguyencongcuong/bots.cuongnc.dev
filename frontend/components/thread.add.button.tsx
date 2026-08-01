'use client';

import { insertThread } from '@/actions/threads.action';
import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export function ThreadAddButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      const thread = await insertThread({
        name: 'New Thread',
      });
      if (thread) router.push(`/threads/${thread.id}`);
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
