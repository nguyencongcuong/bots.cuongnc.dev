'use client';

import { colors } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    secondary: {
      light: colors.grey[100],
      main: colors.grey[500],
      dark: colors.grey[700],
    },
    primary: {
      light: colors.brown[50],
      main: colors.brown[400],
      dark: colors.brown[600],
    },
  },
});

export default theme;
