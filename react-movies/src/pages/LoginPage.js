import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { Button, TextField, Snackbar, Alert, Box, Typography, Paper, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { authenticate } = useContext(AuthContext); // Access authenticate function
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [notification, setNotification] = useState({ open: false, message: "", severity: "info" });
  const navigate = useNavigate(); // For navigation to Sign Up page

  const handleLogin = async () => {
    const result = await authenticate(username, password);
    if (result.success) {
      setNotification({ open: true, message: "Login successful!", severity: "success" });
    } else {
      setNotification({ open: true, message: result.message, severity: "error" }); // Show error
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#1c1c1c",
        color: "#FFF",
        padding: "20px",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: "30px",
          maxWidth: "400px",
          width: "100%",
          borderRadius: "12px",
          backgroundColor: "#2c2c2c",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: "20px",
            color: "#FFA500",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Welcome Back!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: "20px",
            color: "#DDD",
            textAlign: "center",
          }}
        >
          Please login to your account.
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            marginBottom: "30px",
            "& .MuiInputBase-input": {
              color: "#000", // Text color
            },
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#FFF", // Input background
              borderRadius: "4px",
            },
            "& .MuiInputLabel-root": {
              color: "#FFA500", // Label color (normal)
              transform: "translate(14px, 16px) scale(1)", // Label default position
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#FFA500", // Label color when focused
            },
            "& .MuiInputLabel-shrink": {
              transform: "translate(14px, -20px) scale(0.75)", // Move label higher when focused/shrink
            },
          }}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"} // Toggle password visibility
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            marginBottom: "30px",
            "& .MuiInputBase-input": {
              color: "#000", // Text color
            },
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#FFF", // Input background
              borderRadius: "4px",
            },
            "& .MuiInputLabel-root": {
              color: "#FFA500", // Label color (normal)
              transform: "translate(14px, 16px) scale(1)", // Label default position
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#FFA500", // Label color when focused
            },
            "& .MuiInputLabel-shrink": {
              transform: "translate(14px, -20px) scale(0.75)", // Move label higher when focused/shrink
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          sx={{
            padding: "10px",
            backgroundColor: "#FFA500",
            fontWeight: "bold",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#FF8C00",
            },
          }}
        >
          Login
        </Button>

        <Button
          variant="text"
          onClick={() => navigate("/signup")} // Navigate to Sign Up page
          fullWidth
          sx={{
            marginTop: "20px",
            color: "#FFA500",
            fontWeight: "bold",
            fontSize: "16px",
            textTransform: "none",
            "&:hover": {
              color: "#FF8C00",
            },
          }}
        >
          Don't have an account? Sign Up
        </Button>

        {/* Snackbar for Notifications */}
        <Snackbar
          open={notification.open}
          autoHideDuration={3000}
          onClose={() => setNotification({ ...notification, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity={notification.severity}
            onClose={() => setNotification({ ...notification, open: false })}
            sx={{ width: "100%" }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default LoginPage;
