'use client';

import { updateThread } from '@/actions/threads.action';
import { Tables } from '@/types/database.types';
import { Container, Drawer, TextField } from '@mui/material';
import { useRef } from 'react';
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

  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (data: { name: string }) => {
    onClose();
    await updateThread(thread.id, { name: data.name });
  };

  const handleClose = () => {
    onClose();
    const name = getValues('name');
    if (thread.name === name) return;
    void onSubmit({ name });
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor="bottom"
      slotProps={{
        transition: {
          onEntered: () => {
            inputRef.current?.focus();
            inputRef.current?.select();
          },
        },
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          padding: 2,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField
                {...field}
                label="Thread Name"
                fullWidth
                inputRef={(element) => {
                  field.ref(element);
                  inputRef.current = element;
                }}
              />
            )}
          />
        </form>
      </Container>
    </Drawer>
  );
}
