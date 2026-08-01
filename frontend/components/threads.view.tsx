import { ThreadAddButton } from '@/components/thread.add.button';
import { Tables } from '@/types/database.types';
import { Card, CardContent, CardHeader, MenuItem, MenuList, Stack } from '@mui/material';

interface Props {
  threads: Tables<'threads'>[];
  onSelect: (thread: Tables<'threads'>) => void;
}

export function ThreadsView({ threads, onSelect }: Props) {
  return (
    <Card>
      <CardHeader title="Threads" />
      <CardContent>
        <Stack direction="column" spacing={2}>
          <ThreadAddButton />
          <MenuList dense disableListWrap disablePadding>
            {threads.map((thread) => (
              <MenuItem
                key={thread.id}
                onClick={() => {
                  onSelect(thread);
                }}
              >
                {thread.name ?? thread.id}
              </MenuItem>
            ))}
          </MenuList>
        </Stack>
      </CardContent>
    </Card>
  );
}
