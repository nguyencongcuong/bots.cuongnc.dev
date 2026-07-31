'use client';

import { useStream } from '@langchain/react';
import { SendTwoTone } from '@mui/icons-material';
import { Box, Container, Grid, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { MessageBlock } from './message-block';

export function ChatBoxContainer() {
  const {
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: '',
    },
  });

  // TODO: Support multiple threads
  const threadId = '27078180-8fd5-4402-a4d6-99c5e4a3498f';
  const stream = useStream({
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    assistantId: 'agent',
    threadId: threadId,
  });

  const onSubmit = async (data: { message: string }) => {
    const text = data.message.trim();
    if (!text || stream.isLoading) return;

    setValue('message', '');

    // anthropic requires content to be a string (or content-block array),
    // never a plain object — that throws "content is not iterable".
    await stream.submit({
      messages: [
        {
          type: 'human',
          content: text,
        },
      ],
    });
  };

  return (
    <Grid container>
      <Grid
        component={Paper}
        size={{
          xs: 12,
          lg: 2,
        }}
        sx={{
          display: {
            xs: 'none',
            lg: 'block',
          },
        }}
      >
        <Typography>Left Sidebar</Typography>
      </Grid>

      <Grid
        component={Paper}
        size={{
          xs: 12,
          lg: 8,
        }}
      >
        <Container
          sx={{
            height: 'calc(100vh - 100px)',
            overflow: 'auto',
            padding: 4,
          }}
          disableGutters={true}
        >
          <Stack direction="column" spacing={1}>
            {stream.messages.map((message, index) => {
              const isLatestHuman =
                message.type === 'human' && stream.messages.slice(index + 1).every((m) => m.type !== 'human');

              return (
                <MessageBlock
                  key={message.id}
                  message={message}
                  // Pin while a reply is in flight so history load doesn't jump.
                  pinToTop={isLatestHuman && stream.isLoading}
                />
              );
            })}
            {/*
              Spacer so the latest user message can scroll to the top
              (Gemini-style). Without this, block:"start" has nothing to scroll into.
            */}
            <Box
              aria-hidden
              sx={{
                flexShrink: 0,
                minHeight: 'calc(100vh - 100px - 96px)',
              }}
            />
          </Stack>
        </Container>

        <Stack
          direction="column"
          spacing={2}
          sx={{
            width: '100%',
            justifyContent: 'flex-end',
            height: '100px',
            padding: 2,
          }}
        >
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('message')}
              fullWidth
              label="Message"
              placeholder={'Ask me anything...'}
              variant="outlined"
              error={!!errors.message}
              helperText={errors.message?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit">
                        <SendTwoTone />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
        </Stack>
      </Grid>

      <Grid
        component={Paper}
        size={{
          xs: 12,
          lg: 2,
        }}
        sx={{
          display: {
            xs: 'none',
            lg: 'block',
          },
        }}
      >
        <Typography>Right Sidebar</Typography>
      </Grid>
    </Grid>
  );
}
