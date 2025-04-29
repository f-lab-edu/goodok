import { ReactNode } from 'react';
import { Container, Typography } from '@mui/material';

interface FunnelStepProps {
  title: string;
  children?: ReactNode;
}

export function FunnelStep({ title, children }: FunnelStepProps) {
  return (
    <Container
      maxWidth="xs"
      sx={{ py: 4 }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
      >
        {title}
      </Typography>
      {children}
    </Container>
  );
}
