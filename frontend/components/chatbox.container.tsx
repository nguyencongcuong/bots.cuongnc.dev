'use client';

import { useStream } from '@langchain/react';
import { SendTwoTone } from '@mui/icons-material';
import { Box, Container, Grid, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export function ChatBoxContainer() {
  const [input, setInput] = useState('');
  const stream = useStream({
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    assistantId: 'agent',
    // omit threadId so the sdk creates a valid uuid thread
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput('');
    const text = input.trim();
    if (!text || stream.isLoading) return;

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
          {stream.messages.map((message) => (
            <div key={message.id}>
              <Typography>{message.text}</Typography>
            </div>
          ))}
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
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
