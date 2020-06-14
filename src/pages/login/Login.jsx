import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useFormik } from 'formik';
import { useHistory } from "react-router-dom";

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
    marginTop: theme.spacing(1),
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
  return errors;
};

export default function SignIn() {
  const [error, setError] = useState('');
  const classes = useStyles();
  const history = useHistory();

  const handleLogin = async (loginData) => {
    try {
      const res = await api.post(`/login`, loginData);
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
        message: 'faild to login'
      })
    }
  }

  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    validate,
    onSubmit: ({ email, password }) => {
      handleLogin({ email, password })
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Connexion
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            helperText={formik.touched.email ? formik.errors.email : ''}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
          <TextField
            variant="outlined"
            margin="normal"
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Connexion
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Register"}
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
