import { ChatAnthropic } from '@langchain/anthropic';
import { createAgent } from 'langchain';
import { internetSearchTool } from './tools.js';

const agent = createAgent({
  model: new ChatAnthropic({
    model: 'claude-haiku-4-5-20251001',
  }),
  tools: [internetSearchTool],
  name: 'bots.cuongnc.dev',
});

// langgraph.json expects a compiled StateGraph
export const graph = agent.graph;
