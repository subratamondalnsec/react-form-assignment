import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import { fetchUsers, selectApiData, selectApiError, selectApiStatus } from '../store/slices/apiSlice'

function ApiDataPage() {
  const dispatch = useDispatch()
  const status = useSelector(selectApiStatus)
  const data = useSelector(selectApiData)
  const error = useSelector(selectApiError)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers())
    }
  }, [dispatch, status])

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="h4" component="h1">
              Public API Data
            </Typography>

            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={() => dispatch(fetchUsers())}
              disabled={status === 'loading'}
            >
              Refresh
            </Button>
          </Box>

          {status === 'loading' && (
            <Stack sx={{ py: 4 }} alignItems="center" spacing={1.5}>
              <CircularProgress />
              <Typography variant="body2" color="text.secondary">
                Loading API data...
              </Typography>
            </Stack>
          )}

          {status === 'failed' && <Alert severity="error">{error}</Alert>}

          {status === 'succeeded' && data.length === 0 && (
            <Alert severity="info">No records returned by the API.</Alert>
          )}

          {status === 'succeeded' && data.length > 0 && (
            <List>
              {data.map((user) => (
                <ListItem key={user.id} divider>
                  <ListItemText
                    primary={user.name}
                    secondary={`${user.email} | ${user.phone} | ${user.company?.name || 'No company'}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Container>
  )
}

export default ApiDataPage
