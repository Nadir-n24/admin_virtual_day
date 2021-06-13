import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DropzoneArea } from 'material-ui-dropzone';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, ...rest }) => {
  const [values, setValues] = useState({
    avatar: '',
    first_name: '',
    last_name: '',
    timezone: 'GMT +6',
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api_console/profile/get_profile/', {
      headers: {
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }
    })
      .then((res) => {
        const profiledata = res.data.data.model;
        console.log(profiledata);
        setValues(profiledata);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={values.avatar}
            value={values.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {values.first_name + ' ' + values.last_name}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
          onClick={handleClickOpen}
        >
          Загрузить аватар
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Загрузить аватар</DialogTitle>
          <DialogContent>
            <DropzoneArea
              acceptedFiles={['image/*']}
              dropzoneText="Перетащите картинку сюда или кликните"
              onChange={(files) => console.log('Files:', files)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Отмена
            </Button>
            <Button onClick={handleClose} color="primary">
              Загрузить
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
