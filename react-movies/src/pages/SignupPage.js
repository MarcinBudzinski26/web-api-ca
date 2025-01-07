import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { Button, TextField, Snackbar, Alert, Box, Typography, Paper, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignUpPage = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "info" });
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for confirm password visibility

  const register = async () => {
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegEx.test(password);

    if (!validPassword) {
      setNotification({
        open: true,
        message: "Password must be at least 8 characters long and contain one letter, one digit, and one special character.",
        severity: "error",
      });
      return;
    }

    if (password !== passwordAgain) {
      setNotification({ open: true, message: "Passwords do not match.", severity: "error" });
      return;
    }

    const success = await context.register(userName, password);
    if (success) {
      setRegistered(true);
      setNotification({ open: true, message: "Registration successful! Redirecting to login...", severity: "success" });
    } else {
      setNotification({ open: true, message: "Registration failed. Try a different username.", severity: "error" });
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword); // Toggle password visibility
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword); // Toggle confirm password visibility

  if (registered === true) {
    return <Navigate to="/login" />;
  }

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
          Create an Account
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: "20px",
            color: "#DDD",
            textAlign: "center",
          }}
        >
          Sign up to get started!
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{
            marginBottom: "20px",
            "& .MuiInputBase-input": {
              color: "#000", // Text color
            },
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#FFF", // Input background
              borderRadius: "4px",
            },
            "& .MuiInputLabel-root": {
              color: "#FFA500", // Label color (normal)
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#FFA500", // Label color when focused
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
            marginBottom: "20px",
            "& .MuiInputBase-input": {
              color: "#000", // Text color
            },
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#FFF", // Input background
              borderRadius: "4px",
            },
            "& .MuiInputLabel-root": {
              color: "#FFA500", // Label color (normal)
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#FFA500", // Label color when focused
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
        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
          variant="outlined"
          fullWidth
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
          sx={{
            marginBottom: "20px",
            "& .MuiInputBase-input": {
              color: "#000", // Text color
            },
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#FFF", // Input background
              borderRadius: "4px",
            },
            "& .MuiInputLabel-root": {
              color: "#FFA500", // Label color (normal)
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#FFA500", // Label color when focused
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={register}
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
          Sign Up
        </Button>

        <Button
          variant="text"
          onClick={() => navigate("/login")} // Navigate to Login page
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
          Already have an account? Login
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

export default SignUpPage;
