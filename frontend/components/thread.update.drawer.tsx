'use client';
import { updateThread } from '@/actions/threads.action';
import { Tables } from '@/types/database.types';
import { Container, Drawer, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

interface Props {
  thread: Tables<'threads'>;
  open: boolean;
  onClose: () => void;
}

export function ThreadUpdateDrawer({ thread, open, onClose }: Props) {
  const { control, handleSubmit, getValues } = useForm<{ name: string }>({
    defaultValues: {
      name: thread.name ?? '',
    },
  });

  const onSubmit = async (data: { name: string }) => {
    onClose();
    await updateThread(thread.id, { name: data.name });
  };

  const handleClose = () => {
    onClose();
    const name = getValues('name');
    if (thread.name === name) return;
    onSubmit({ name });
  };

  return (
    <>
      <Drawer open={open} onClose={handleClose} anchor={'bottom'}>
        <Container
          maxWidth={'xs'}
          sx={{
            padding: 2,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="name"
              render={({ field }) => <TextField {...field} label="Thread Name" fullWidth />}
            />
          </form>
        </Container>
      </Drawer>
    </>
  );
}
