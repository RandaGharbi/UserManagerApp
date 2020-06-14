import React, { useEffect, useState, useMemo, useCallback } from 'react'
import clsx from 'clsx';
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Table from '../../components/Table'
import Modal from '../../components/Modal'
import { logout, USER_DATA_KEY } from '../../shared/utils/auth'
import api from "../../shared/utils/api"

import * as ROOT from '../../constants/routes'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

function UserListPage() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [compName, setCompName] = useState('CreateContent');

  const handleClose = async () => {
    await fetchData();
    setOpen(false);
  }
  const handleOpen = () => {
    setOpen(true);
  }

  const columns = useMemo(
    () => [
      {
        Header: 'All users',
        columns: [
          {
            Header: 'First Name',
            accessor: 'name',
          },
          {
            Header: 'Family Name',
            accessor: 'familyName',
          },
          {
            Header: 'Email',
            accessor: 'email',
          },
          {
            Header: 'Last Login Date',
            accessor: 'lastLoginDate',
          },
          {
            Header: 'Action',
            Cell: row => (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  endIcon={<EditIcon />}
                  onClick={() => {
                    handleOpen();
                    setSelectedUser(row.cell.row.original)
                    setCompName('UpdateContent')
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    handleOpen();
                    setSelectedUser(row.cell.row.original)
                    setCompName('DeleteContent')
                  }}
                >
                  Delete
                </Button>
              </div>
            )
          }
        ],
      },
    ],
    [classes.button]
  )
  const userData = JSON.parse(localStorage.getItem(USER_DATA_KEY) || "{}")

  const fetchData = useCallback(async function () {
    try {
      const result = await api.get('/users')
      const { data: { users = [] } = { users: [] } } = result;
      setData(users);
    } catch (error) {
    }
  }, [])

  useEffect(() => {
    fetchData()
    return () => fetchData()
  }, [fetchData]);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Container maxWidth="lg">
      <Paper className={fixedHeightPaper}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={10}>
            <Typography variant="h6" component="p">
              Name: {userData.name}
            </Typography>
            <Typography variant="h6" component="p">
              Family Name: {userData.familyName}
            </Typography>
            <Typography variant="h6" component="p">
              Email:  {userData.email}
            </Typography>
            <br />
            <Button color="default" variant="outlined"
              onClick={() => {
                handleOpen();
                setSelectedUser({})
                setCompName('CreateContent')
              }}
            >
              Create New User
            </Button>
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
            <Button href={ROOT.LOGIN} color="default" variant="outlined" onClick={logout}>
              déconnexion
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper>
        <Table columns={columns} data={data} />
      </Paper>
      <Modal open={open} data={selectedUser} handleClose={handleClose} compName={compName} />
    </Container>
  )
}

export default UserListPage;



