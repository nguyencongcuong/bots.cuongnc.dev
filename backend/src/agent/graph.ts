import { ChatAnthropic } from '@langchain/anthropic';
import { createAgent, humanInTheLoopMiddleware } from 'langchain';
import { internetSearchTool } from './tools.js';

const agent = createAgent({
  model: new ChatAnthropic({
    model: 'claude-haiku-4-5-20251001',
  }),
  tools: [internetSearchTool],
  name: 'bots.cuongnc.dev',
  middleware: [
    humanInTheLoopMiddleware({
      interruptOn: {
        internet_search: {
          allowedDecisions: ['approve', 'reject'],
          description: (toolCall) => {
            const query = String(toolCall.args?.query ?? '');
            return `Allow web search with query: ${query}?`;
          },
        },
      },
    }),
  ],
});

// langgraph.json expects a compiled StateGraph
export const graph = agent.graph;
