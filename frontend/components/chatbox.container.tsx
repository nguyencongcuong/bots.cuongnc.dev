'use client';

import { MessageBlock } from '@/components/message-block';
import { PromptSuggestions } from '@/components/prompt-suggestions';
import { Tables } from '@/types/database.types';
import { useStream } from '@langchain/react';
import { SendTwoTone } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface HitlActionRequest {
  name: string;
  action_name: string;
  description: string;
  args: {
    query: string;
    maxResults: number;
    topic: string;
    includeRawContent: boolean;
    searchDepth: string;
    timeRange: string;
  };
}

interface Props {
  thread: Tables<'threads'>;
}

export function ChatBoxContainer({ thread }: Props) {
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: '',
    },
  });

  const messageInputRef = useRef<HTMLInputElement>(null);
  const stream = useStream({
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    assistantId: 'agent',
    threadId: thread.id,
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

  const hitlActionRequests = stream.interrupt?.value
    ? (stream.interrupt.value as { action_requests: HitlActionRequest[] }).action_requests
    : [];

  return (
    <Box>
      <Container
        sx={{
          height: 'calc(100vh - 150px)',
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

          {stream.interrupt ? (
            <Card>
              <CardHeader
                title="Some actions require your approval"
                subheader={hitlActionRequests.map((a) => a.name).join(' • ')}
              />
              <CardContent>
                {hitlActionRequests.map((action) => {
                  return (
                    <Stack key={action.name}>
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                        {action.description}
                      </Typography>
                    </Stack>
                  );
                })}
              </CardContent>
              <ButtonGroup fullWidth>
                <Button
                  size={'small'}
                  variant="text"
                  color="primary"
                  onClick={() => {
                    void stream.respond({
                      decisions: [{ type: 'approve' }],
                    });
                  }}
                >
                  Approve
                </Button>
                <Button
                  size={'small'}
                  variant="text"
                  color="error"
                  onClick={() => {
                    void stream.respond({
                      decisions: [{ type: 'reject' }],
                    });
                  }}
                >
                  Reject
                </Button>
              </ButtonGroup>
            </Card>
          ) : null}

          {/*
              Spacer so the latest user message can scroll to the top
              (Gemini-style). Without this, block:"start" has nothing to scroll into.
            */}
          <Box
            aria-hidden
            sx={{
              flexShrink: 0,
              minHeight: 'calc(100vh - 150px - 90px)',
            }}
          />
        </Stack>
      </Container>

      <Stack direction="column" spacing={2} sx={{ px: 2 }}>
        <PromptSuggestions onTap={(suggestion) => setValue('message', suggestion)} />

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="message"
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus={true}
                ref={messageInputRef}
                fullWidth
                label="Message"
                placeholder={'Ask me anything...'}
                variant="outlined"
                error={!!errors.message}
                helperText={errors.message?.message}
                disabled={!!stream.interrupt}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton type="submit" disabled={!!stream.interrupt || stream.isLoading}>
                          <SendTwoTone />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
        </Box>
      </Stack>
    </Box>
  );
}
