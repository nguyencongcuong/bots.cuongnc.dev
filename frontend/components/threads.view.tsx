'use client';

import { ThreadAddButton } from '@/components/thread.add.button';
import { ThreadView } from '@/components/thread.view';
import { Tables } from '@/types/database.types';
import { Card, CardContent, CardHeader, List, Stack } from '@mui/material';

interface Props {
  threads: Tables<'threads'>[];
}

export function ThreadsView({ threads }: Props) {
  return (
    <Card>
      <CardHeader title="Threads" />
      <CardContent>
        <Stack direction="column" spacing={2}>
          <ThreadAddButton />
          <List>
            {threads.map((thread) => (
              <ThreadView key={thread.id} thread={thread} />
            ))}
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
}
