import { TavilySearch, TopicType } from '@langchain/tavily';
import { tool } from 'langchain';
import { z } from 'zod';

export const internetSearchTool = tool(
  async (params) => {
    const topics: TopicType[] = ['general', 'news', 'finance'];

    const {
      query,
      maxResults = 5,
      topic = topics[0],
      includeRawContent = false,
      searchDepth = 'basic',
      timeRange = 'year',
    } = params;

    const tavilySearch = new TavilySearch({
      maxResults,
      includeRawContent,
      topic,
      searchDepth,
      timeRange,
    });
    return await tavilySearch._call({ query });
  },
  {
    name: 'internet_search',
    description: 'Run a web search',
    schema: z.object({
      query: z.string().describe('The search query'),
      maxResults: z.number().optional().default(5).describe('Maximum number of results to return'),
      topic: z.enum(['general', 'news', 'finance']).optional().default('general').describe('Search topic category'),
      includeRawContent: z.boolean().optional().default(false).describe('Whether to include raw content'),
      searchDepth: z.enum(['basic', 'advanced']).optional().default('basic').describe('Search depth'),
      timeRange: z.enum(['day', 'week', 'month', 'year']).optional().default('year').describe('Time range'),
    }),
  },
);
