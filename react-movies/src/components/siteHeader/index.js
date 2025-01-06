import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext"; // Use AuthContext

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const menuOptions = [
  { label: "Home", path: "/" },
  { label: "Favorites", path: "/movies/favorites" },
  { label: "Upcoming Movies", path: "/movies/upcoming" },
  { label: "Must Watch", path: "/movies/mustwatch" },
  { label: "Trending Movies", path: "/movies/trending" },
  { label: "Top Rated", path: "/movies/toprated" },
];

const SiteHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, userName, signout } = useContext(AuthContext); // Access AuthContext
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuSelect = (path) => {
    setAnchorEl(null);
    navigate(path);
  };

  const handleLogout = () => {
    signout(); // Call AuthContext's signout function
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#333333",
          color: "#FF8C00",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {menuOptions.map((option) => (
              <MenuItem
                key={option.label}
                onClick={() => handleMenuSelect(option.path)}
                sx={{
                  fontWeight: location.pathname === option.path ? "bold" : "normal",
                  color: location.pathname === option.path ? "#FF8C00" : "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#444444",
                    color: "#FF8C00",
                  },
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>

          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: "#FF8C00",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Reel World
          </Typography>

          <div style={{ flexGrow: 1, display: "flex", gap: "15px" }}>
            {menuOptions.map((option) => (
              <Button
                key={option.label}
                onClick={() => navigate(option.path)}
                sx={{
                  color: location.pathname === option.path ? "#FF8C00" : "#FFFFFF",
                  fontWeight: location.pathname === option.path ? "bold" : "normal",
                  textDecoration: location.pathname === option.path ? "underline" : "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {option.label}
              </Button>
            ))}
          </div>

          {isAuthenticated ? (
            <>
              <Button
                onClick={() => navigate("/dashboard")}
                sx={{
                  color: "#FF8C00",
                  textTransform: "none",
                  fontWeight: "bold",
                  marginRight: 2,
                }}
              >
                {userName}
              </Button>
              <Button
                onClick={handleLogout}
                sx={{
                  color: "#FFFFFF",
                  backgroundColor: "#FF8C00",
                  "&:hover": { backgroundColor: "#FF6F00" },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate("/login")}
                sx={{
                  color: "#FF8C00",
                  marginRight: 2,
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                sx={{
                  color: "#FFFFFF",
                  backgroundColor: "#FF8C00",
                  "&:hover": { backgroundColor: "#FF6F00" },
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
