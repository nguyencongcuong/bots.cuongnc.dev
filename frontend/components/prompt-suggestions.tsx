import { Card, CardContent, CardHeader, List, ListItem, ListItemText } from '@mui/material';

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
    <Card>
      <CardHeader title="Prompt Suggestions" />
      <CardContent>
        <List dense disablePadding>
          {suggestions.map((suggestion) => (
            <ListItem key={suggestion.message} onClick={() => onTap(suggestion.message)} sx={{ cursor: 'pointer' }}>
              <ListItemText primary={suggestion.message} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
