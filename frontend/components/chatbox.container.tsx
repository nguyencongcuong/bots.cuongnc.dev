'use client';

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
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CTA } from './cta';
import { MessageBlock } from './message-block';
import { PromptSuggestions } from './prompt-suggestions';
import { Technologies } from './technologies';

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

export function ChatBoxContainer() {
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

  // TODO: Support multiple threads
  const threadId = '35d11de2-48c8-493f-b9a1-7d67c02ec1b0';
  const messageInputRef = useRef<HTMLInputElement>(null);
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

  const hitlActionRequests = stream.interrupt?.value
    ? (stream.interrupt.value as { action_requests: HitlActionRequest[] }).action_requests
    : [];
  return (
    <Grid container spacing={2}>
      <Grid
        component={Paper}
        size={{
          xs: 12,
          lg: 3,
        }}
        sx={{
          display: {
            xs: 'none',
            lg: 'flex',
          },
          flexDirection: 'column',
          height: '100vh',
          overflowY: 'auto',
          p: 2,
        }}
      >
        <Stack direction="column" spacing={2}>
          <CTA />
          <PromptSuggestions
            onTap={(suggestion) => {
              setValue('message', suggestion);
            }}
          />
          <Technologies />
        </Stack>
      </Grid>

      <Grid
        component={Paper}
        size={{
          xs: 12,
          lg: 6,
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
            minHeight: '100px',
            padding: 2,
          }}
        >
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="message"
              render={({ field }) => (
                <TextField
                  {...field}
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
      </Grid>

      <Grid
        component={Paper}
        size={{
          xs: 12,
          lg: 3,
        }}
        sx={{
          display: {
            xs: 'none',
            lg: 'block',
          },
          p: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          When the agent wants to search the web, approval appears above the message box.
        </Typography>
      </Grid>
    </Grid>
  );
}
