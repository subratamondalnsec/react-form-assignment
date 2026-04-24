# React Design Form

A modern multi-page React form project built with Material UI, Formik, Yup, Redux Toolkit, and React Router.

This project includes:
- A validated form page
- Redux-based submitted data storage
- A submitted-data display page
- A public API page using createAsyncThunk and extraReducers

## Features

- Blue-themed responsive UI using Material UI theming
- Form built with Material UI components
- Formik for form state and submission handling
- Yup schema validation with field-level error messages
- Redux Toolkit slice for submitted form data
- API integration with createAsyncThunk
- Pending, fulfilled, and rejected API state handling via extraReducers
- Route-based navigation across pages
- User feedback states: loading indicators, alerts, and submission snackbar

## Tech Stack

- React 19
- Vite
- Material UI
- Formik
- Yup
- Redux Toolkit
- React Redux
- React Router DOM

## Project Structure

```text
src/
	App.jsx
	main.jsx
	theme.js
	pages/
		FormPage.jsx
		SubmittedDataPage.jsx
		ApiDataPage.jsx
	store/
		index.js
		slices/
			formSlice.js
			apiSlice.js
```

## Routes

- /form - Form page
- /submitted-data - Displays submitted Redux form data
- /api-data - Displays fetched public API data

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/subratamondalnsec/React-Design-Form.git
cd React-Design-Form
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## API Used

- JSONPlaceholder Users Endpoint:
	https://jsonplaceholder.typicode.com/users

## Notes

- Form data is stored in Redux on submit.
- Submitted-data page safely handles empty state.
- API page handles loading, error, and success states.
