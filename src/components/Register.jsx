import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper, Divider } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("https://entnt-assessment-backend.onrender.com/api/register", formData);
      console.log(response);
      navigate("/");
    } catch (error) {
      alert("Error registering user: " + (error.response?.data?.error || "An unexpected error occurred."));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Main Content */}
      <Paper
        elevation={6}
        sx={{
          maxWidth: 450,
          padding: 5,
          borderRadius: 4,
          backgroundColor: "white",
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.15)",  // Deeper shadow
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{
            color: "#7b1fa2",
          }}
        >
          Create Account
        </Typography>
        <Divider sx={{ marginBottom: 3, bgcolor: "#d1c4e9" }} />

        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleInputChange}
          sx={{
            bgcolor: "#f3e5f5",
            borderRadius: 1.5,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#7b1fa2",  // Border color for input
              },
            },
            "&:hover .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ab47bc", // Hover border color
              },
            },
          }}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleInputChange}
          sx={{
            bgcolor: "#f3e5f5",
            borderRadius: 1.5,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#7b1fa2",  // Border color for password input
              },
            },
            "&:hover .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ab47bc", // Hover border color
              },
            },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleRegister}
          sx={{
            marginTop: 3,
            padding: "12px 0",
            background: "linear-gradient(90deg, #7b1fa2, #ab47bc)",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: 2.5,
            boxShadow: "0 6px 12px rgba(123, 31, 162, 0.3)",
            "&:hover": {
              background: "#6a1b9a",  // Darker on hover
              boxShadow: "0 8px 16px rgba(106, 27, 154, 0.4)",
            },
            transition: "all 0.3s ease",  // Smooth hover effect
          }}
        >
          Register
        </Button>

        <Box sx={{ textAlign: "center", marginTop: 3 }}>
          <Typography variant="body1">
            Already have an account?{" "}
          </Typography>

          {/* Login Button */}
          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate("/")}
            sx={{
              marginTop: 1,
              padding: "12px 0",
              borderColor: "#7b1fa2",
              color: "#7b1fa2",
              fontWeight: "bold",
              fontSize: "1rem",
              borderRadius: 2.5,
              boxShadow: "0 6px 12px rgba(123, 31, 162, 0.3)",
              "&:hover": {
                background: "#7b1fa2",
                color: "white",
                boxShadow: "0 8px 16px rgba(123, 31, 162, 0.4)",
              },
              transition: "all 0.3s ease",  // Smooth hover effect
            }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
