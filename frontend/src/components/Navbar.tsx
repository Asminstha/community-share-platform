import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type Props = {
  onToggleTheme: () => void;
};

const Navbar: React.FC<Props> = ({ onToggleTheme }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Community Share
      </Typography>
      <IconButton color="inherit" onClick={onToggleTheme}>
        <Brightness4Icon />
      </IconButton>
      <IconButton color="inherit">
        <AccountCircleIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default Navbar;