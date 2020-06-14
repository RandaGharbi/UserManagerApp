import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import api from "../../shared/utils/api"
import { login } from '../../shared/utils/auth'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validate = (values) => {
  const errors = {};
  if (!values.password) {
    errors.password = 'Please enter a valid password';
  }
  if (!values.email) {
    errors.email = 'Please enter a valid email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter a valid email';
  }
  if (!values.name) {
    errors.name = 'Please enter a valid name';
  }
  if (!values.familyName) {
    errors.familyName = 'Please enter a valid family name';
  }
  return errors;
};

export default function SignUp() {
  const [error, setError] = useState('');
  const classes = useStyles();
  const history = useHistory();
  const handleRegister = async (registerData) => {
    try {
      const res = await api.post(`/signup`, registerData);
      if (res.data.accessToken) {
        login(res.data)
        history.push("/")
      } else {
        setError({
          message: 'faild to login: email or password not correct'
        })
      }
    } catch (error) {
      setError({
        message: error.response.data.message
      })
    }
  }

  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
      familyName: '',
      name: '',
    },
    validate,
    onSubmit: ({ email, password, familyName, name }) => {
      handleRegister({ email, password, familyName, name })
    },
  });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Name"
                autoFocus
                onChange={formik.handleChange}
                value={formik.values.name}
                helperText={formik.touched.name ? formik.errors.name : ''}
                error={formik.touched.name && Boolean(formik.errors.name)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="familyName"
                label="Family Name"
                name="familyName"
                autoComplete="lname"
                onChange={formik.handleChange}
                value={formik.values.familyName}
                helperText={formik.touched.familyName ? formik.errors.familyName : ''}
                error={formik.touched.familyName && Boolean(formik.errors.familyName)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                helperText={formik.touched.email ? formik.errors.email : ''}
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.password}
                helperText={formik.touched.password ? formik.errors.password : ''}
                error={formik.touched.password && Boolean(formik.errors.password)}
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          {
            error.message && (<Typography component="h4" variant="h5" color="error">
              {error.message}
            </Typography>)
          }
        </form>
      </div>
    </Container>
  );
}