import React from "react";
import { useNavigate } from "react-router-dom";
import CompanyManagement from "./CompanyManagement";
import CommunicationMethodManagement from "./CommunicationManagement";
import { Button, Box, Typography, Divider } from "@mui/material";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: 4,
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Logout Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 3,
        }}
      >
        <Button
          variant="contained"
          color="error"
          size="medium"
          onClick={handleLogout}
          sx={{
            fontWeight: "bold",
            padding: "10px 20px",
            fontSize: "14px",
            textTransform: "uppercase",
            "&:hover": { backgroundColor: "#b71c1c" },
          }}
        >
          Logout
        </Button>
      </Box>

      {/* Dashboard Title */}
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        sx={{
          textTransform: "uppercase",
          color: "#424242",
          marginBottom: 4,
        }}
      >
        Admin Dashboard
      </Typography>
      <Divider sx={{ marginBottom: 4 }} />

      {/* Components Section */}
      <Box
        sx={{
          display: "grid",
          gap: 4,
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        <Box
          sx={{
            padding: 3,
            backgroundColor: "#ffffff",
            borderRadius: 2,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CompanyManagement />
        </Box>
        <Box
          sx={{
            padding: 3,
            backgroundColor: "#ffffff",
            borderRadius: 2,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CommunicationMethodManagement />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
