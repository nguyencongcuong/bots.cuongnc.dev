'use client';

import { BaseMessage, HumanMessage } from '@langchain/core/messages';
import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageBlockProps {
  message: BaseMessage;
  pinToTop: boolean;
}

export function MessageBlock({ message, pinToTop = false }: MessageBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHuman = message instanceof HumanMessage;

  useEffect(() => {
    if (!pinToTop || !isHuman || !ref.current) return;

    // Align the user bubble to the top of the nearest scrollport.
    // A trailing spacer in the parent makes this scroll position reachable.
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [isHuman, pinToTop, message.id]);

  if (!message.text.trim()) return null;
  if (message.type !== 'human' && message.type !== 'ai') return null;

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: isHuman ? 'flex-end' : 'flex-start',
        scrollMarginTop: 16,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: isHuman ? 'flex-end' : 'flex-start',
          width: '80%',
        }}
      >
        <Box
          sx={{
            backgroundColor: isHuman ? 'secondary.light' : undefined,
            color: isHuman ? 'secondary.dark' : undefined,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: isHuman ? 20 : 0,
            borderBottomRightRadius: isHuman ? 0 : 20,
            padding: 1,
          }}
        >
          <Markdown remarkPlugins={[remarkGfm]}>{message.text}</Markdown>
        </Box>
      </Box>
    </Box>
  );
}
