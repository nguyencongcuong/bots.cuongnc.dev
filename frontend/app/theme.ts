'use client';

import { colors } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-roboto)',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '0.875rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '0.75rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
    overline: {
      fontSize: '0.625rem',
      fontWeight: 400,
    },
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
  components: {
    MuiCardHeader: {
      styleOverrides: {
        title: {
          fontSize: '1rem',
          fontWeight: 700,
        },
        subheader: {
          fontSize: '0.875rem',
          fontWeight: 400,
        },
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiDivider: {
      defaultProps: {
        flexItem: true,
        sx: {
          my: 2,
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        gutterBottom: true,
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
        variant: 'outlined',
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
        variant: 'outlined',
      },
    },
  },
});

export default theme;
