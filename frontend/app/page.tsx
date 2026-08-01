import { readThreads } from '@/actions/threads.action';
import { ChatBoxContainer } from '@/components/chatbox.container';

export default async function Home() {
  const threads = await readThreads();
  return <ChatBoxContainer threads={threads} />;
}
