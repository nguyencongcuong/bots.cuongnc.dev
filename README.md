# bots.cuongnc.dev

A chatbot app: a Next.js frontend with a LangGraph.js agent backend.

- **`frontend/`** — Next.js (App Router) UI with MUI, using Supabase to persist chat threads and streaming responses from the agent.
- **`backend/`** — LangGraph.js agent (Claude via `@langchain/anthropic`) with an internet search tool, served via LangGraph Server.

## Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project (for thread storage)
- An [Anthropic API key](https://console.anthropic.com) (for the agent)
- Optionally, a [Tavily API key](https://tavily.com) (for internet search)

## Getting started

Install dependencies for both workspaces:

```bash
npm install
```

### Backend

```bash
cd backend
cp .env.example .env   # add ANTHROPIC_API_KEY, TAVILY_API_KEY, etc.
npm run dev
```

This starts the LangGraph Server (and Studio) on `http://localhost:2024`.

### Frontend

```bash
cd frontend
cp .env.example .env   # add Supabase and API URL variables, see below
npm run dev
```

The app runs on `http://localhost:3005`.

Required frontend environment variables:

| Variable                               | Description                            |
| -------------------------------------- | -------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`             | Supabase project URL                   |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable/anon key          |
| `NEXT_PUBLIC_API_URL`                  | URL of the running backend (LangGraph) |

## Project structure

```
.
├── backend/    LangGraph.js agent (see backend/README.md)
├── frontend/   Next.js chat UI (see frontend/README.md)
├── backend.railway.toml
└── frontend.railway.toml
```

## Deployment

Both apps are configured for independent deployment on [Railway](https://railway.com) via `backend.railway.toml` and `frontend.railway.toml`.

## License

ISC
