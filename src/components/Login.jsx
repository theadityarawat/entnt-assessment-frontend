import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper, Divider } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://entnt-backend-i7my.onrender.com/api/login",
        formData
      );
      console.log(response);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      navigate("/user-dashboard");
    } catch (error) {
      alert("Error logging in: " + (error.response?.data?.error || "An error occurred"));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        padding: 3,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 420,
          padding: 5,
          borderRadius: 3,
          backgroundColor: "white",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{ color: "#1976d2" }}
        >
          Welcome Back
        </Typography>
        <Divider sx={{ marginBottom: 3, bgcolor: "#90caf9" }} />
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleInputChange}
          variant="outlined"
          sx={{ bgcolor: "#f1f8e9", borderRadius: 1 }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleInputChange}
          variant="outlined"
          sx={{ bgcolor: "#f1f8e9", borderRadius: 1 }}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            marginTop: 3,
            padding: "12px 0",
            fontSize: "1rem",
            fontWeight: "bold",
            background: "linear-gradient(90deg, #1976d2, #2196f3)",
            color: "white",
            borderRadius: 2,
            boxShadow: "0 4px 10px rgba(33, 150, 243, 0.3)",
            "&:hover": {
              background: "#1565c0",
              boxShadow: "0 6px 12px rgba(21, 101, 192, 0.4)",
            },
          }}
        >
          Login
        </Button>
        <Box sx={{ textAlign: "center", marginTop: 3 }}>
          <Typography variant="body1">
            Are you an admin?{" "}
            <Button
              color="secondary"
              size="small"
              onClick={() => navigate("/admin-login")}
              sx={{
                textTransform: "none",
                padding: "4px 12px",
                backgroundColor: "#f44336",
                color: "white",
                borderRadius: 1,
                "&:hover": { backgroundColor: "#d32f2f" },
              }}
            >
              Admin Login
            </Button>
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center", marginTop: 3 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#1976d2",
              cursor: "pointer",
              textDecoration: "underline",
              "&:hover": { color: "#1565c0" },
            }}
            onClick={() => navigate("/register")}
          >
            Don't have an account? <strong>Register now</strong>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
