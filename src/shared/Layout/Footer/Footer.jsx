import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Users Manager API'}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default () => (
  <footer>
    <Box pt={4}>
      <Copyright />
    </Box>
  </footer>
);
