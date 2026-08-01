import { readThread } from '@/actions/threads.action';
import { ChatBoxContainer } from '@/components/chatbox.container';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ThreadsPage(props: Props) {
  const { id } = await props.params;
  const thread = await readThread(id);

  if (!thread) notFound();

  return <ChatBoxContainer thread={thread} />;
}
