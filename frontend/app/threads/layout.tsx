import { readThreads } from '@/actions/threads.action';
import { CTA } from '@/components/cta';
import { Technologies } from '@/components/technologies';
import { ThreadsView } from '@/components/threads.view';
import { Grid, Paper, Stack, Typography } from '@mui/material';

export default async function ThreadsLayout({ children }: { children: React.ReactNode }) {
  const threads = await readThreads();

  return (
    <Grid container spacing={2}>
      <Grid
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
          height: '100dvh',
          overflowY: 'auto',
        }}
      >
        <Stack direction="column" spacing={2}>
          <CTA />
          <ThreadsView threads={threads} />
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
        {children}
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
