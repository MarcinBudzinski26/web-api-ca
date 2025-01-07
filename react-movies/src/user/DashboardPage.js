import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, Snackbar, Alert } from "@mui/material";
import { AuthContext } from "../contexts/authContext";
import { deleteUser } from "../api/movies-api"; // API call for deletion

const DashboardPage = () => {
  const navigate = useNavigate();
  const { userId, userName, signout } = useContext(AuthContext); // Access userId from AuthContext
  const [notification, setNotification] = useState({ open: false, message: "", severity: "info" });

  // Handle Account Deletion
  const handleDeleteAccount = async () => {
    try {
      await deleteUser(userId); // Pass userId to the delete API function
      setNotification({ open: true, message: "Account deleted successfully.", severity: "success" });
      signout(); // Log out the user after account deletion
      navigate("/signup"); // Redirect to signup page
    } catch (error) {
      setNotification({ open: true, message: error.message || "Failed to delete account.", severity: "error" });
    }
  };

  return (
    <Box sx={{ padding: "20px", color: "#FFF", backgroundColor: "#1c1c1c", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px", color: "#FFA500" }}>
        Welcome, {userName || "User"}
      </Typography>

      <Typography variant="h5" sx={{ marginBottom: "10px", color: "#FFFFFF" }}>
        Account Settings
      </Typography>

      {/* Delete Account Section */}
      <Box>
        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          Danger Zone
        </Typography>
        <Button variant="contained" color="error" onClick={handleDeleteAccount}>
          Delete Account
        </Button>
      </Box>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={notification.severity} onClose={() => setNotification({ ...notification, open: false })}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DashboardPage;
