import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useFormik } from 'formik';

import api from "../../shared/utils/api"

export const UpdateContent = (props) => {
  const validate = (values) => {
    const errors = {};
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

  const handleAddUser = async (userData) => {
    try {
      await api.put(`/user/${props.data.id}`, userData);
      props.handleClose();

    } catch (error) {
      props.handleClose();
      alert(`please try again`)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: props.data.email,
      familyName: props.data.familyName,
      name: props.data.name,
    },
    validate,
    onSubmit: ({ email, familyName, name }) => {
      handleAddUser({ email, familyName, name })
    },
  });

  return (
    <>
      <DialogTitle id="alert-dialog-title">{"Update user"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label="Name"
          type="text"
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.name}
          helperText={formik.touched.name ? formik.errors.name : ''}
          error={formik.touched.name && Boolean(formik.errors.name)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="familyName"
          name="familyName"
          label="Family Name"
          type="text"
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.familyName}
          helperText={formik.touched.familyName ? formik.errors.familyName : ''}
          error={formik.touched.familyName && Boolean(formik.errors.familyName)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="email"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.email}
          helperText={formik.touched.email ? formik.errors.email : ''}
          error={formik.touched.email && Boolean(formik.errors.email)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Close
        </Button>
        <Button onClick={formik.handleSubmit} color="primary" autoFocus>
          Update
          </Button>
      </DialogActions>
    </>
  )
}

export const DeleteContent = (props) => {
  return (
    <>
      <DialogTitle id="alert-dialog-title">{'Delete user'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`${props.data.email} user account that you want to delete ?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Close
        </Button>
        <Button
          onClick={async () => {
            try {
              await api.delete(`/user/${props.data.id}`)
              await props.handleClose()
            } catch (error) {
              props.handleClose()
              alert(`can't delete ${props.data.email}, please try again`)
            }
          }}
          color="primary" autoFocus>
          Delete
          </Button>
      </DialogActions>
    </>
  )
}

export const CreateContent = (props) => {
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

  const handleAddUser = async (userData) => {
    try {
      const res = await api.post(`/signup`, userData);
      if (res.data.accessToken) {
        props.handleClose();
      } else {
        props.handleClose();
        alert(`please try again`);
      }
    } catch (error) {
      props.handleClose();
      alert(`please try again`)
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
      handleAddUser({ email, password, familyName, name })
    },
  });

  return (
    <>
      <DialogTitle id="alert-dialog-title">{"Add user"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label="Name"
          type="text"
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.name}
          helperText={formik.touched.name ? formik.errors.name : ''}
          error={formik.touched.name && Boolean(formik.errors.name)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="familyName"
          name="familyName"
          label="Family Name"
          type="text"
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.familyName}
          helperText={formik.touched.familyName ? formik.errors.familyName : ''}
          error={formik.touched.familyName && Boolean(formik.errors.familyName)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="email"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.email}
          helperText={formik.touched.email ? formik.errors.email : ''}
          error={formik.touched.email && Boolean(formik.errors.email)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="password"
          name="password"
          label="Password"
          type="password"
          fullWidth
          autoComplete="current-password"
          onChange={formik.handleChange}
          value={formik.values.password}
          helperText={formik.touched.password ? formik.errors.password : ''}
          error={formik.touched.password && Boolean(formik.errors.password)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Close
        </Button>
        <Button onClick={formik.handleSubmit} color="primary" autoFocus>
          Add
          </Button>
      </DialogActions>
    </>
  )
}
