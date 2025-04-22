import { Suspense, SuspenseProps } from 'react';
import { ErrorBoundary, ErrorBoundaryPropsWithRender } from 'react-error-boundary';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

function Loading() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
}

interface RejectedProps {
  error: unknown;
  onReset: () => void;
}

function Rejected({ error, onReset }: RejectedProps) {
  const message = error instanceof Error ? error.message : '오류가 발생했습니다.';

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: 3,
        textAlign: 'center',
      }}
    >
      <Typography
        color="error"
        mb={2}
      >
        {message}
      </Typography>
      <Button
        variant="contained"
        onClick={onReset}
      >
        다시 시도
      </Button>
    </Box>
  );
}

export interface AsyncBoundaryProps extends Omit<ErrorBoundaryPropsWithRender, 'fallbackRender'> {
  pendingFallback?: SuspenseProps['fallback'];
  rejectedFallback?: ErrorBoundaryPropsWithRender['fallbackRender'];
}

export function AsyncBoundary({
  pendingFallback = <Loading />,
  rejectedFallback = ({ error, resetErrorBoundary }) => (
    <Rejected
      error={error}
      onReset={resetErrorBoundary}
    />
  ),
  children,
  ...errorBoundaryProps
}: AsyncBoundaryProps) {
  return (
    <ErrorBoundary
      fallbackRender={rejectedFallback}
      {...errorBoundaryProps}
    >
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
