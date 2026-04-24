import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import './App.css'
import FormPage from './pages/FormPage'
import SubmittedDataPage from './pages/SubmittedDataPage'
import ApiDataPage from './pages/ApiDataPage'

function App() {
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #eaf3ff 0%, #f4f8ff 40%, #ffffff 100%)' }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#0d47a1',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="h1">
            React Form Assignment
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button component={NavLink} to="/form" color="inherit">
              Form
            </Button>
            <Button component={NavLink} to="/submitted-data" color="inherit">
              Submitted Data
            </Button>
            <Button component={NavLink} to="/api-data" color="inherit">
              API Data
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/form" replace />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/submitted-data" element={<SubmittedDataPage />} />
          <Route path="/api-data" element={<ApiDataPage />} />
          <Route path="*" element={<Navigate to="/form" replace />} />
        </Routes>
      </Container>
    </Box>
  )
}

export default App
