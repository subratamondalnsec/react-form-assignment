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
  Typography,
} from '@mui/material'
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" component="h1">
              Public API Data
            </Typography>
            <Button variant="outlined" onClick={() => dispatch(fetchUsers())}>
              Refresh
            </Button>
          </Box>

          {status === 'loading' && (
            <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          )}

          {status === 'failed' && <Alert severity="error">{error}</Alert>}

          {status === 'succeeded' && (
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
