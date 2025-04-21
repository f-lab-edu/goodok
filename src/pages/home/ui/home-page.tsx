import { Box, Button, Typography, Container } from '@mui/material';

export default function HomePage() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        bgcolor: '#fefefe',
      }}
    >
      <Container maxWidth="xs">
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          GoodOK
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          mb={4}
        >
          나에게 꼭 맞는 플랜을 찾아보세요
        </Typography>
        <Button
          variant="contained"
          size="large"
          fullWidth
        >
          구독하기
        </Button>
      </Container>
    </Box>
  );
}
