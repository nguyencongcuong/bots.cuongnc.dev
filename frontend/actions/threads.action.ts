'use server';

import { TablesInsert, TablesUpdate } from '@/types/database.types';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function readThreads() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: threads } = await supabase.from('threads').select('*');
  return threads ?? [];
}

export async function insertThread(thread: TablesInsert<'threads'>) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from('threads').insert(thread).select().single().throwOnError();
  revalidatePath('/', 'page');
  return data;
}

export async function updateThread(thread: TablesUpdate<'threads'>) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from('threads').update(thread).select().single().throwOnError();
  revalidatePath('/', 'page');
  return data;
}

export async function deleteThread(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  await supabase.from('threads').delete().eq('id', id).throwOnError();
  revalidatePath('/', 'page');
}
