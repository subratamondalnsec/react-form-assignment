import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  InputAdornment,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { saveFormData } from '../store/slices/formSlice'

const countries = ['India', 'United States', 'Germany', 'France', 'Spain', 'Mexico']

const validationSchema = Yup.object({
  name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: Yup.string().email('Enter a valid email address').required('Email is required'),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone must contain exactly 10 digits')
    .required('Phone is required'),
  age: Yup.number()
    .typeError('Age must be a number')
    .min(18, 'Age must be at least 18')
    .max(100, 'Age must be 100 or less')
    .required('Age is required'),
  country: Yup.string().required('Country is required'),
  address: Yup.string().min(10, 'Address must be at least 10 characters').required('Address is required'),
})

function FormPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [successOpen, setSuccessOpen] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      age: '',
      country: '',
      address: '',
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      dispatch(saveFormData(values))
      setSuccessOpen(true)

      await new Promise((resolve) => {
        setTimeout(resolve, 650)
      })

      resetForm()
      setSubmitting(false)
      navigate('/submitted-data', { state: { justSubmitted: true } })
    },
  })

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
      <Card elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Box
          sx={{
            px: { xs: 2.5, md: 4 },
            py: { xs: 2.5, md: 3 },
            background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 55%, #93c5fd 100%)',
          }}
        >
          <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
            Registration Form
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Fill the fields below and submit to save data in Redux.
          </Typography>
        </Box>
        <Divider />
        <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
          <Alert severity="info" sx={{ mb: 3 }}>
            Fields are validated with Yup and Formik before submit.
          </Alert>

          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  id="name"
                  name="name"
                  label="Full Name"
                  placeholder="Subrata Mondal"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon fontSize="small" color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  id="email"
                  name="email"
                  label="Email"
                  placeholder="name@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon fontSize="small" color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  id="phone"
                  name="phone"
                  label="Phone"
                  placeholder="9876543210"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneOutlinedIcon fontSize="small" color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  id="age"
                  name="age"
                  label="Age"
                  type="number"
                  placeholder="18"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.age && Boolean(formik.errors.age)}
                  helperText={formik.touched.age && formik.errors.age}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CakeOutlinedIcon fontSize="small" color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  id="country"
                  name="country"
                  label="Country"
                  helperText={formik.touched.country && formik.errors.country ? formik.errors.country : 'Select your country'}
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.country && Boolean(formik.errors.country)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PublicOutlinedIcon fontSize="small" color="primary" />
                      </InputAdornment>
                    ),
                  }}
                >
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  size="small"
                  multiline
                  minRows={3}
                  id="address"
                  name="address"
                  label="Address"
                  placeholder="Street, city, state, zip"
                  helperText={formik.touched.address && formik.errors.address ? formik.errors.address : 'Write your full address'}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeOutlinedIcon fontSize="small" color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Stack direction="row" spacing={1.5} justifyContent="flex-end" sx={{ mt: 3, flexWrap: 'wrap' }}>
              <Button type="button" variant="outlined" color="secondary" onClick={formik.handleReset}>
                Reset
              </Button>

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={!formik.isValid || formik.isSubmitting}
                sx={{
                  px: 4,
                  backgroundColor: '#1565c0',
                  '&:hover': {
                    backgroundColor: '#0d47a1',
                  },
                  transition: 'all 180ms ease',
                }}
              >
                {formik.isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={successOpen}
        autoHideDuration={1400}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert icon={<CheckCircleOutlineIcon fontSize="inherit" />} severity="success" onClose={() => setSuccessOpen(false)}>
          Form submitted successfully.
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default FormPage
