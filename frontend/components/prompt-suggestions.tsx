import { Chip, Stack } from '@mui/material';

interface Props {
  onTap: (suggestion: string) => void;
}

export function PromptSuggestions({ onTap }: Props) {
  const suggestions = [
    { message: 'What is the capital of France?' },
    { message: 'Write a polite email to follow up with a client' },
    { message: 'Suggest 5 names for a small online shop' },
    { message: 'Plan a simple weekly content calendar' },
    { message: 'Explain AI chatbots in plain English' },
  ];

  return (
    <Stack direction="row" spacing={1} sx={{ overflowX: 'auto' }}>
      {suggestions.map((suggestion) => (
        <Chip
          key={suggestion.message}
          label={suggestion.message}
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => onTap(suggestion.message)}
          sx={{ cursor: 'pointer' }}
        />
      ))}
    </Stack>
  );
}
