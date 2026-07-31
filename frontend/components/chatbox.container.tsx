'use client';

import { useStream } from '@langchain/react';
import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export function ChatBoxContainer() {
  const [input, setInput] = useState('');
  const stream = useStream({
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    assistantId: 'agent',
    threadId: 'thread_1',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await stream.submit({
      messages: [
        {
          role: 'user',
          content: input,
        },
      ],
    });
    setInput('');
  };

  return (
    <Grid container spacing={2}>
      <Grid
        component={Paper}
        size={{
          xs: 12,
          lg: 2,
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
            height: '80vh',
            overflow: 'auto',
          }}
        >
          {stream.messages.map((message) => (
            <div key={message.id}>
              <Typography>{message.text}</Typography>
            </div>
          ))}
        </Container>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
        </form>
      </Grid>

      <Grid
        component={Paper}
        size={{
          xs: 12,
          lg: 2,
        }}
      >
        <Typography>Right Sidebar</Typography>
      </Grid>
    </Grid>
  );
}
