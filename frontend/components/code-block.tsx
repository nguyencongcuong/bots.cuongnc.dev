import { Box } from '@mui/material';
import { useEffect, useState, useTransition } from 'react';
import { codeToHtml } from 'shiki';

interface Props {
  className: string | undefined;
  content: string;
}

export function CodeBlock({ className, content }: Props) {
  const [out, setOut] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const lang = className?.replace('language-', '') ?? 'markdown';

  useEffect(() => {
    startTransition(async () => {
      const out = await codeToHtml(content, {
        lang,
        theme: 'material-theme-darker',
      });
      setOut(out);
    });
  }, [lang, content]);

  return (
    <Box
      component="code"
      sx={{
        '& pre': {
          p: 2,
          borderRadius: 2,
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
          fontSize: '12px',
        },
      }}
      dangerouslySetInnerHTML={{ __html: out ?? '' }}
    />
  );
}
