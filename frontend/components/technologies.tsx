import { Card, CardContent, CardHeader, Chip, Link, Stack } from '@mui/material';

export function Technologies() {
  const technologies = [
    { label: 'ReactJS', href: 'https://react.dev' },
    { label: 'Next.js', href: 'https://nextjs.org' },
    { label: 'MUI', href: 'https://mui.com' },
    { label: 'TypeScript', href: 'https://www.typescriptlang.org' },
    { label: 'LangChain', href: 'https://langchain.com' },
    { label: 'LangGraph', href: 'https://www.langchain.com/langgraph' },
  ];

  return (
    <Card>
      <CardHeader title={'Built with'} />
      <CardContent>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
          {technologies.map((technology) => (
            <Chip
              key={technology.label}
              label={technology.label}
              component={Link}
              href={technology.href}
              target="_blank"
              sx={{
                cursor: 'pointer',
              }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
