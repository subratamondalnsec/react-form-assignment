import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { selectSubmittedFormData } from '../store/slices/formSlice'

function Row({ label, value }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value || '-'}</Typography>
    </Box>
  )
}

function SubmittedDataPage() {
  const submittedData = useSelector(selectSubmittedFormData)

  if (!submittedData) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          No form data found. Please submit the form first.
        </Alert>
        <Button component={RouterLink} to="/form" variant="contained">
          Go To Form
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Submitted Form Data
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            This data is read from the Redux store.
          </Typography>

          <Stack spacing={2}>
            <Row label="Full Name" value={submittedData.name} />
            <Divider />
            <Row label="Email" value={submittedData.email} />
            <Divider />
            <Row label="Phone" value={submittedData.phone} />
            <Divider />
            <Row label="Age" value={submittedData.age} />
            <Divider />
            <Row label="Country" value={submittedData.country} />
            <Divider />
            <Row label="Address" value={submittedData.address} />
          </Stack>
        </CardContent>
      </Card>
    </Container>
  )
}

export default SubmittedDataPage
