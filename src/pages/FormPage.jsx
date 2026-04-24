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
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
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
    onSubmit: (values, { resetForm }) => {
      dispatch(saveFormData(values))
      resetForm()
      navigate('/submitted-data')
    },
  })

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card elevation={4} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Box
          sx={{
            px: 4,
            py: 3,
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
        <CardContent sx={{ p: 4 }}>
          <Alert severity="info" sx={{ mb: 3 }}>
            Fields are validated with Yup and Formik before submit.
          </Alert>

          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Full Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  id="age"
                  name="age"
                  label="Age"
                  type="number"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.age && Boolean(formik.errors.age)}
                  helperText={formik.touched.age && formik.errors.age}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  id="country"
                  name="country"
                  label="Country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.country && Boolean(formik.errors.country)}
                  helperText={formik.touched.country && formik.errors.country}
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
                  multiline
                  minRows={3}
                  id="address"
                  name="address"
                  label="Address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  fontWeight: 600,
                  backgroundColor: '#1565c0',
                  '&:hover': {
                    backgroundColor: '#0d47a1',
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

export default FormPage
