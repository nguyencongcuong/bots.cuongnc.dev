import { Avatar, Button, Card, CardContent, CardHeader, Link, Typography } from '@mui/material';
import avatar from '../public/avatar.webp';

export function CTA() {
  const upworkUrl = 'https://upwork.com/freelancers/cuongnc';

  return (
    <Card>
      <CardHeader
        title={'Cuong Nguyen'}
        avatar={<Avatar src={avatar.src}>C</Avatar>}
        subheader={'Full-Stack Software Engineer'}
      />
      <CardContent>
        <Typography variant="body1">A Chatbot demo - RAG, tools, streaming</Typography>
      </CardContent>
      <Link href={upworkUrl} target="_blank">
        <Button disableElevation variant="contained" fullWidth={true} color="primary">
          Available for hire on Upwork
        </Button>
      </Link>
    </Card>
  );
}
