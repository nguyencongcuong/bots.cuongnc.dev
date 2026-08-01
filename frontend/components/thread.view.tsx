'use client';

import { Tables } from '@/types/database.types';
import { MoreVert } from '@mui/icons-material';
import { colors, IconButton, ListItem, Menu, MenuItem, Stack } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThreadDeleteMenuItem } from './thread.delete.menu.item';
import { ThreadUpdateDrawer } from './thread.update.drawer';

interface Props {
  thread: Tables<'threads'>;
}

export function ThreadView({ thread }: Props) {
  const pathname = usePathname();
  const activeThreadId = pathname.split('/').pop() ?? '';

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Update drawer
  const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false);
  const handleUpdateDrawerOpen = () => {
    setAnchorEl(null);
    setUpdateDrawerOpen(true);
  };
  const handleUpdateDrawerClose = () => setUpdateDrawerOpen(false);

  return (
    <ListItem
      dense
      key={thread.id}
      sx={{
        backgroundColor: thread.id === activeThreadId ? colors.grey[200] : 'transparent',
        cursor: 'pointer',
        width: '100%',
      }}
    >
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Link href={`/threads/${thread.id}`} style={{ width: '100%' }}>
          {thread.name ?? thread.id}
        </Link>
        <IconButton onClick={handleClick}>
          <MoreVert />
        </IconButton>
      </Stack>

      <Menu
        id={thread.id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': thread.id,
          },
        }}
      >
        <MenuItem onClick={handleUpdateDrawerOpen}>Rename Thread</MenuItem>
        <ThreadDeleteMenuItem threadId={thread.id} onDelete={handleClose} />
      </Menu>

      <ThreadUpdateDrawer thread={thread} open={updateDrawerOpen} onClose={handleUpdateDrawerClose} />
    </ListItem>
  );
}
