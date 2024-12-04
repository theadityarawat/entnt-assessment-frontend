import React from "react";
import { useNavigate } from "react-router-dom";
import CompanyManagement from "./CompanyManagement";
import CommunicationMethodManagement from "./CommunicationManagement";
import { Button, Box, Typography, Divider } from "@mui/material";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear all stored data for security
    navigate("/"); // Redirect to the login page
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: 4,
        backgroundColor: "#eaeaea",
      }}
    >
      {/* Logout Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <Button
          onClick={handleLogout}
          variant="contained"
          color="error"
          sx={{
            fontWeight: "bold",
            px: 3,
            py: 1.5,
            fontSize: "14px",
            textTransform: "uppercase",
            "&:hover": { backgroundColor: "#d32f2f" },
          }}
        >
          Logout
        </Button>
      </Box>

      {/* Dashboard Header */}
      <Typography
        variant="h4"
        fontWeight="600"
        align="center"
        gutterBottom
        sx={{
          textTransform: "uppercase",
          color: "#333",
          marginBottom: 3,
        }}
      >
        Admin Dashboard
      </Typography>
      <Divider sx={{ marginBottom: 3 }} />

      {/* Dashboard Content */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 3,
        }}
      >
        <Box
          sx={{
            p: 3,
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CompanyManagement />
        </Box>
        <Box
          sx={{
            p: 3,
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CommunicationMethodManagement />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
