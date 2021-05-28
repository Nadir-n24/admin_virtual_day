import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  const handleOnClick = () => {
    axios({
      method: 'GET',
      url: '127.0.0.1:8000/ru/api_console/user/export_users_excel/',
      headers: {
        Authorization: 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFrcGF5ZXYubmFkaXJAZ21haWwuY29tIiwiZXhwIjoxNjIxNDU1NzE5LCJlbWFpbCI6ImFrcGF5ZXYubmFkaXJAZ21haWwuY29tIn0.5l0zDL6SweRB-ZZ4aO27bbp1ux_CAcDUn6nkiyYxhBs'
      }
    })
      .then(response => {
        console.log(JSON.stringify(response.data.download_link));
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          className={classes.exportButton}
          color="primary"
          variant="contained"
          onClick={handleOnClick}
        >
          Export
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Поиск пользователей"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
