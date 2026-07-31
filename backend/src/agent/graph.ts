import { ChatAnthropic } from '@langchain/anthropic';
import { createAgent } from 'langchain';

const agent = createAgent({
  model: new ChatAnthropic({
    model: 'claude-haiku-4-5-20251001',
  }),
  tools: [],
  name: 'bots.cuongnc.dev',
});

// langgraph.json expects a compiled StateGraph
export const graph = agent.graph;
