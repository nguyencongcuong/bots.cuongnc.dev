import { readThread } from '@/actions/threads.action';
import { ChatBoxContainer } from '@/components/chatbox.container';
import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ThreadsPage(props: Props) {
  const { id } = await props.params;
  const thread = await readThread(id);

  if (!thread) redirect('/threads');

  return <ChatBoxContainer thread={thread} />;
}
