'use client';

import { BaseMessage, HumanMessage } from '@langchain/core/messages';
import {
  Box,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './code-block';

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
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              table: ({ children }) => <Table>{children}</Table>,
              thead: ({ children }) => <TableHead>{children}</TableHead>,
              tbody: ({ children }) => <TableBody>{children}</TableBody>,
              tr: ({ children }) => <TableRow>{children}</TableRow>,
              th: ({ children }) => <TableCell>{children}</TableCell>,
              td: ({ children }) => <TableCell>{children}</TableCell>,
              p: ({ children }) => <Typography>{children}</Typography>,
              ul: ({ children }) => (
                <List component={'ul'} sx={{ listStyleType: 'disc', pl: 2 }}>
                  {children}
                </List>
              ),
              ol: ({ children }) => (
                <List component={'ol'} sx={{ listStyleType: 'decimal', pl: 2 }}>
                  {children}
                </List>
              ),
              li: ({ children }) => (
                <ListItem component={'li'} disablePadding={true} sx={{ display: 'list-item' }}>
                  <ListItemText>{children}</ListItemText>
                </ListItem>
              ),
              a: ({ children, href }) => <Link href={href}>{children}</Link>,
              hr: () => <Divider />,
              pre: ({ children }) => (
                <Box
                  component="pre"
                  sx={{
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {children}
                </Box>
              ),
              code: ({ children, className }) => (
                <CodeBlock className={className} content={children?.toString() ?? ''} />
              ),
              h1: ({ children }) => <Typography variant="h1">{children}</Typography>,
              h2: ({ children }) => <Typography variant="h2">{children}</Typography>,
              h3: ({ children }) => <Typography variant="h3">{children}</Typography>,
              h4: ({ children }) => <Typography variant="h4">{children}</Typography>,
              h5: ({ children }) => <Typography variant="h5">{children}</Typography>,
              h6: ({ children }) => <Typography variant="h6">{children}</Typography>,
            }}
          >
            {message.text}
          </Markdown>
        </Box>
      </Box>
    </Box>
  );
}
