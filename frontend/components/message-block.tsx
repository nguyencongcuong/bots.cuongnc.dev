'use client';

import { BaseMessage, HumanMessage } from '@langchain/core/messages';
import { Box } from '@mui/material';

interface MessageBlockProps {
  message: BaseMessage;
}

export function MessageBlock({ message }: MessageBlockProps) {
  const isHuman = message instanceof HumanMessage;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: isHuman ? 'flex-end' : 'flex-start',
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
            backgroundColor: isHuman ? 'secondary.light' : 'primary.main',
            color: isHuman ? 'secondary.dark' : 'primary.contrastText',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: isHuman ? 20 : 0,
            borderBottomRightRadius: isHuman ? 0 : 20,
            padding: 1,
          }}
        >
          {message.text}
        </Box>
      </Box>
    </Box>
  );
}
