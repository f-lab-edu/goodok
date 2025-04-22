import { Container, Typography, TextField, Button, Box, Stack } from '@mui/material';
import { useState } from 'react';

interface ProfileStepProps {
  onNext?: (data: { name: string; email: string }) => void;
}

const ProfileStep = ({ onNext }: ProfileStepProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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
        프로필 입력
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="이름"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="이메일"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Stack>

      <Box mt={4}>
        <Button
          variant="contained"
          size="large"
          fullWidth
          disabled={!name || !email}
          onClick={() => onNext?.({ name, email })}
        >
          다음
        </Button>
      </Box>
    </Container>
  );
};

export default ProfileStep;
