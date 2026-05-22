import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Button } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../context/AuthContext';
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
type Props = {
  onToggleTheme: () => void;
};

const Navbar: React.FC<{ onToggleTheme: () => void }> = ({ onToggleTheme }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    await signOut(auth);
    handleClose();
    navigate("/auth");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/")}>
          Community Share
        </Typography>
        <IconButton color="inherit" onClick={onToggleTheme}>
          <Brightness4Icon />
        </IconButton>
        {user ? (
          <>
            <IconButton color="inherit" onClick={handleMenu} sx={{ ml: 1 }}>
              {user.photoURL ? (
                <Avatar src={user.photoURL} />
              ) : (
                <AccountCircleIcon />
              )}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem disabled>{user.displayName || user.email}</MenuItem>
              <MenuItem onClick={() => navigate("/profile/" + user.uid)}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate("/auth")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;