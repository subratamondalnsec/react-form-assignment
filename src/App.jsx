import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import './App.css'
import FormPage from './pages/FormPage'
import SubmittedDataPage from './pages/SubmittedDataPage'
import ApiDataPage from './pages/ApiDataPage'

function App() {
  const location = useLocation()

  const navItems = [
    { label: 'Form', path: '/form' },
    { label: 'Submitted Data', path: '/submitted-data' },
    { label: 'API Data', path: '/api-data' },
  ]

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #eaf3ff 0%, #f4f8ff 40%, #ffffff 100%)' }}>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'rgba(13, 71, 161, 0.95)',
          backdropFilter: 'blur(6px)',
          borderBottom: '1px solid rgba(147, 197, 253, 0.35)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: { xs: 'wrap', md: 'nowrap' }, py: 1, gap: 1.5 }}>
          <Typography variant="h6" component="h1" sx={{ letterSpacing: 0.2 }}>
            React Form Assignment
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path

              return (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  variant={isActive ? 'contained' : 'outlined'}
                  color={isActive ? 'secondary' : 'inherit'}
                  sx={{
                    borderColor: isActive ? 'transparent' : 'rgba(255, 255, 255, 0.45)',
                    color: isActive ? '#0d47a1' : '#f8fbff',
                    backgroundColor: isActive ? '#e3f2fd' : 'transparent',
                    '&:hover': {
                      borderColor: isActive ? 'transparent' : '#ffffff',
                      backgroundColor: isActive ? '#bbdefb' : 'rgba(255, 255, 255, 0.12)',
                    },
                    transition: 'all 180ms ease',
                  }}
                >
                  {item.label}
                </Button>
              )
            })}
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
        <Box sx={{ animation: 'fadeSlide 240ms ease' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/form" replace />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/submitted-data" element={<SubmittedDataPage />} />
            <Route path="/api-data" element={<ApiDataPage />} />
            <Route path="*" element={<Navigate to="/form" replace />} />
          </Routes>
        </Box>
      </Container>
    </Box>
  )
}

export default App
