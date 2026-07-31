import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import theme from './theme';

export const metadata: Metadata = {
  title: 'AI Chatbot',
  description: 'My personal AI chatbot on cuongnc.dev',
};

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['vietnamese'],
  variable: '--font-roboto',
});

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
