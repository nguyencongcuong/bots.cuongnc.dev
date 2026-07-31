'use client';

import { useStream } from '@langchain/react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createAgent } from 'langchain';
import { useState } from 'react';

function getText(content: unknown): string {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === 'string') return part;
        if (part && typeof part === 'object' && 'text' in part) {
          return String((part as { text: unknown }).text ?? '');
        }
        return '';
      })
      .join('');
  }
  return '';
}

export function Chat() {
  const [input, setInput] = useState('');

  const stream = useStream<typeof createAgent>({
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    assistantId: 'agent',
    threadId: 'thread_1',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    stream.submit({
      messages: [
        {
          type: 'human' as const,
          content: input,
        },
      ],
    });
    setInput('');
  };

  return (
    <div>
      {stream.messages.map((msg) => (
        <div key={msg.id}>{msg.text}</div>
      ))}

      <form onSubmit={handleSubmit}>
        <TextField fullWidth placeholder="Ask me anything" value={input} onChange={(e) => setInput(e.target.value)} />
        <Button variant="contained" type={'submit'} disabled={stream.isLoading}>
          Send
        </Button>
      </form>
    </div>
  );
}
