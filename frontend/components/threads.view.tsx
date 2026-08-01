'use client';

import { ThreadAddButton } from '@/components/thread.add.button';
import { Tables } from '@/types/database.types';
import { Card, CardContent, CardHeader, colors, MenuItem, MenuList, Stack } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  threads: Tables<'threads'>[];
}

export function ThreadsView({ threads }: Props) {
  const pathname = usePathname();
  const activeThreadId = pathname.split('/').pop() ?? '';

  return (
    <Card>
      <CardHeader title="Threads" />
      <CardContent>
        <Stack direction="column" spacing={2}>
          <ThreadAddButton />
          <MenuList dense disableListWrap disablePadding>
            {threads.map((thread) => (
              // identify active thread
              <Link href={`/threads/${thread.id}`} key={thread.id}>
                <MenuItem sx={{ backgroundColor: thread.id === activeThreadId ? colors.grey[200] : 'transparent' }}>
                  {thread.name ?? thread.id}
                </MenuItem>
              </Link>
            ))}
          </MenuList>
        </Stack>
      </CardContent>
    </Card>
  );
}
